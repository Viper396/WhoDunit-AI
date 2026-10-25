// AI Provider Service: Gemini (rotation) -> Local Ollama -> Offline Fallback Cases
import { getRandomSeed } from "../data/fallbackSeeds";
import { getOfflineCase } from "../data/offlineCases";
import { buildCasePrompt, buildInterrogationPrompt, buildEpiloguePrompt } from "./promptBuilder";

export const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-2.0-flash-lite"
];

export const OLLAMA_CONFIG = {
  url: "http://localhost:11434",
  model: "llama3.2"
};

const providerFailures = {
  gemini: { count: 0, cooldownUntil: 0 },
  ollama: { count: 0, cooldownUntil: 0 }
};

let activeProviderStatus = {
  name: "offline",
  model: "Demo Cases",
  healthy: true
};

export function getActiveProviderStatus() {
  return activeProviderStatus;
}

export function getGeminiApiKey() {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("whodunit_api_key");
    if (local && local.trim()) return local.trim();
  }
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey.trim() && envKey !== "your_gemini_api_key_here") {
    return envKey.trim();
  }
  return "";
}

function isCooldown(provider) {
  const info = providerFailures[provider];
  if (!info) return false;
  return Date.now() < info.cooldownUntil;
}

function recordSuccess(provider) {
  if (providerFailures[provider]) {
    providerFailures[provider].count = 0;
    providerFailures[provider].cooldownUntil = 0;
  }
}

function recordFailure(provider) {
  if (!providerFailures[provider]) return;
  providerFailures[provider].count += 1;
  if (providerFailures[provider].count >= 2) {
    providerFailures[provider].cooldownUntil = Date.now() + 30000; // 30s cooldown
  }
}

function cleanJsonText(raw) {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```[a-z]*\s*/i, "").replace(/\s*```$/, "");
  }
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return cleaned.substring(start, end + 1);
  }
  return cleaned;
}

async function callGemini(prompt, apiKey, expectJson = true) {
  if (!apiKey || isCooldown("gemini")) throw new Error("Gemini skipped");

  let lastError = null;
  for (const model of GEMINI_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.75,
        responseMimeType: expectJson ? "application/json" : "text/plain"
      }
    };

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 22000);

      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timer);

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }

      const data = await resp.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Empty candidate");

      recordSuccess("gemini");
      activeProviderStatus = { name: "gemini", model, healthy: true };
      return text;
    } catch (err) {
      lastError = err;
      // Try next model
    }
  }

  recordFailure("gemini");
  throw lastError || new Error("All Gemini models failed");
}

async function callOllama(prompt, expectJson = true) {
  if (isCooldown("ollama")) throw new Error("Ollama in cooldown");

  const url = `${OLLAMA_CONFIG.url}/api/generate`;
  const payload = {
    model: OLLAMA_CONFIG.model,
    prompt,
    stream: false,
    options: { temperature: 0.75 }
  };
  if (expectJson) {
    payload.format = "json";
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 45000);

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timer);

    if (!resp.ok) throw new Error(`Ollama HTTP ${resp.status}`);

    const data = await resp.json();
    if (!data.response) throw new Error("No response from Ollama");

    recordSuccess("ollama");
    activeProviderStatus = { name: "ollama", model: OLLAMA_CONFIG.model, healthy: true };
    return data.response;
  } catch (err) {
    recordFailure("ollama");
    throw err;
  }
}

export async function testOllamaAvailability() {
  try {
    const resp = await fetch(`${OLLAMA_CONFIG.url}/api/tags`, { method: "GET" });
    if (!resp.ok) return false;
    const data = await resp.json();
    return Array.isArray(data.models) && data.models.some(m => m.name.includes("llama3.2"));
  } catch {
    return false;
  }
}

export async function generateNewCase(apiKey) {
  const seed = getRandomSeed();
  const prompt = buildCasePrompt(seed);

  // 1. Try Gemini
  if (apiKey && !isCooldown("gemini")) {
    try {
      const raw = await callGemini(prompt, apiKey, true);
      const parsed = JSON.parse(cleanJsonText(raw));
      if (validateCaseData(parsed)) {
        return parsed;
      }
    } catch {
      // Fall through to Ollama
    }
  }

  // 2. Try Ollama
  if (!isCooldown("ollama")) {
    try {
      const raw = await callOllama(prompt, true);
      const parsed = JSON.parse(cleanJsonText(raw));
      if (validateCaseData(parsed)) {
        return parsed;
      }
    } catch {
      // Fall through to offline seed case
    }
  }

  // 3. Fallback to rich pre-built offline case matching the seed or random
  activeProviderStatus = { name: "offline", model: "Fallback Seed Case", healthy: true };
  return getOfflineCase(seed.id);
}

function validateCaseData(cd) {
  return (
    cd &&
    typeof cd.title === "string" &&
    typeof cd.summary === "string" &&
    typeof cd.truth === "string" &&
    typeof cd.culpritId === "string" &&
    Array.isArray(cd.suspects) &&
    cd.suspects.length === 4
  );
}

export async function askSuspectQuestion(caseData, suspectId, question, conversationHistory, apiKey) {
  const prompt = buildInterrogationPrompt(caseData, suspectId, question, conversationHistory);
  const s = caseData.suspects.find(x => x.id === suspectId);

  // 1. Try Gemini
  if (apiKey && !isCooldown("gemini")) {
    try {
      const raw = await callGemini(prompt, apiKey, true);
      const parsed = JSON.parse(cleanJsonText(raw));
      if (parsed.reply) {
        return {
          reply: parsed.reply,
          mood: ["neutral", "nervous", "angry", "sad", "smug"].includes(parsed.mood) ? parsed.mood : "neutral"
        };
      }
    } catch {
      // Fall through
    }
  }

  // 2. Try Ollama
  if (!isCooldown("ollama")) {
    try {
      const raw = await callOllama(prompt, true);
      const parsed = JSON.parse(cleanJsonText(raw));
      if (parsed.reply) {
        return {
          reply: parsed.reply,
          mood: ["neutral", "nervous", "angry", "sad", "smug"].includes(parsed.mood) ? parsed.mood : "neutral"
        };
      }
    } catch {
      // Fall through
    }
  }

  // 3. Canned suspect fallback
  return {
    reply: s?.cannedReply || "I have answered honestly. My conscience is clear, detective.",
    mood: s?.cannedMood || "neutral"
  };
}

export async function generateEpilogue(caseData, accusedId, isCorrect, apiKey) {
  const prompt = buildEpiloguePrompt(caseData, accusedId, isCorrect);

  if (apiKey && !isCooldown("gemini")) {
    try {
      const text = await callGemini(prompt, apiKey, false);
      if (text && text.length > 50) return text;
    } catch {
      // Fall through
    }
  }

  if (!isCooldown("ollama")) {
    try {
      const text = await callOllama(prompt, false);
      if (text && text.length > 50) return text;
    } catch {
      // Fall through
    }
  }

  // Fallback epilogue
  const accused = caseData.suspects.find(x => x.id === accusedId);
  const culprit = caseData.suspects.find(x => x.id === caseData.culpritId);
  if (isCorrect) {
    return `The handcuffs snapped shut around ${accused.name}'s wrists with a resounding metallic finality. Under your piercing interrogation, their fabricated alibi collapsed into dust. \n\nLord Reginald's estate fell silent as the police wagon rattled down the rain-drenched gravel drive. Justice was served, and the truth of ${caseData.title} was etched into the annals of Scotland Yard.\n\nYou turned up your trench coat collar, leaving Dunmore Manor behind in the gathering night mist. Another case closed.`;
  } else {
    return `An unbearable silence descended over the room as ${accused.name} gasped in horror at your wrongful accusation. Before anyone realized the tragic error, shadows shifted in the doorway.\n\nTaking advantage of the chaos, ${culprit.name} quietly slipped out into the storm with the stolen fortune. By morning, all trails had vanished into the foggy highland hills.\n\nYou solved the case too late. An innocent lives with the stigma, and a killer walks free.`;
  }
}
