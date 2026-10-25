// Builds strict JSON prompts for Gemini & Ollama based on Mystery Quality Rules and Fallback Story Seeds

export function buildCasePrompt(seed) {
  return `You are the master mystery architect for "Whodunit AI", an interactive visual detective game.
You are given a core story seed to build an original, high-stakes murder mystery around.

STORY SEED:
Title: "${seed.title}"
Premise: "${seed.premise}"
Suggested Setting: "${seed.setting}"
Suggested Victim: "${seed.victim}"
Environment Category: "${seed.environment}" (must be one of: mansion, hotel, spaceship, school, ship, theater)
Time of Day: "${seed.timeOfDay}" (must be one of: night, dusk, day)
Weather: "${seed.weather}" (must be one of: clear, rain, fog, storm)

MYSTERY QUALITY RULES (CRITICAL):
1. Expand this seed into a complete, fair-play mystery with EXACTLY four suspects (ids "s1", "s2", "s3", "s4").
2. Give EACH suspect:
   - A distinct personality, profession, and believable alibi with at least one verifiable detail.
   - A credible motive to kill the victim.
   - A personal secret they are hiding (unrelated crime, illicit romance, embezzlement, secret debt, etc.) that makes them act suspicious under questioning.
3. Designate EXACTLY ONE culprit among the four (culpritId: "s1", "s2", "s3", or "s4").
4. Fair-Play Deduction: Include at least three concrete clues and one meaningful contradiction in the suspects' statements. The culprit's identity MUST be deducible through clever questioning, not random guessing.
5. In the summary, provide the public crime scene discovery WITHOUT revealing the culprit or secrets.
6. In the truth, explain the complete sequence of events, how the murder was committed, the weapon, the timeline trick or contradiction, and why the innocent suspects acted guilty.
7. Visuals: Pick matching palette colors for the scene SVG and assign distinctive look attributes (skin tone, hairStyle, hairColor, outfitColor, accessory) to each suspect.

Return ONLY a single valid raw JSON object with NO markdown code fences, NO introductory text, and NO commentary.
JSON Structure:
{
  "title": "${seed.title}",
  "setting": "${seed.setting}",
  "victim": "${seed.victim}",
  "summary": "2-3 sentences describing the murder scene discovered by the detective. Keep all secrets and culprit hidden.",
  "truth": "3-4 sentences detailing the true sequence of events, the culprit's motive and method, and the contradiction that exposes them.",
  "culpritId": "s1",
  "visual": {
    "environment": "${seed.environment}",
    "timeOfDay": "${seed.timeOfDay}",
    "weather": "${seed.weather}",
    "palette": {
      "sky": "#0c0d18",
      "building": "#1b2230",
      "accent": "#d4a030"
    }
  },
  "suspects": [
    {
      "id": "s1",
      "name": "Full Name",
      "role": "Profession or Relationship",
      "look": {
        "skin": "#e8c8a8",
        "hairStyle": "short",
        "hairColor": "#333333",
        "outfitColor": "#2a3a4a",
        "accessory": "glasses"
      },
      "motive": "Their reason to want the victim dead.",
      "secret": "Their hidden shameful or illegal secret.",
      "alibi": "Where they claim they were with a specific verifiable anchor.",
      "cannedReply": "A 1-2 sentence defensive initial statement.",
      "cannedMood": "nervous"
    },
    {
      "id": "s2",
      "name": "Full Name",
      "role": "Profession",
      "look": { "skin": "#f2d6b3", "hairStyle": "updo", "hairColor": "#4a2a1a", "outfitColor": "#4a2238", "accessory": "earrings" },
      "motive": "...", "secret": "...", "alibi": "...", "cannedReply": "...", "cannedMood": "angry"
    },
    {
      "id": "s3",
      "name": "Full Name",
      "role": "Profession",
      "look": { "skin": "#deb896", "hairStyle": "bob", "hairColor": "#222222", "outfitColor": "#1d3e52", "accessory": "scarf" },
      "motive": "...", "secret": "...", "alibi": "...", "cannedReply": "...", "cannedMood": "smug"
    },
    {
      "id": "s4",
      "name": "Full Name",
      "role": "Profession",
      "look": { "skin": "#c89d7c", "hairStyle": "slick", "hairColor": "#777777", "outfitColor": "#2e2e38", "accessory": "mustache" },
      "motive": "...", "secret": "...", "alibi": "...", "cannedReply": "...", "cannedMood": "neutral"
    }
  ]
}`;
}

export function buildInterrogationPrompt(caseData, suspectId, question, conversationHistory) {
  const s = caseData.suspects.find(x => x.id === suspectId);
  const isCulprit = caseData.culpritId === suspectId;

  return `You are roleplaying as ${s.name} (${s.role}) in a 1930s-1950s noir detective interrogation.
The player is the detective interrogating you about the murder of ${caseData.victim}.

CASE SUMMARY:
${caseData.summary}

YOUR CHARACTER DETAILS:
- Alibi: ${s.alibi}
- Secret: ${s.secret}
- Motive: ${s.motive}
- Are you the actual killer?: ${isCulprit ? "YES, you are the culprit." : "NO, you are innocent of the murder, but protective of your secret."}

FULL TRUTH OF THE CRIME (FOR YOUR KNOWLEDGE ONLY):
${caseData.truth}

RULES FOR YOUR RESPONSE:
1. Stay strictly in character as ${s.name}.
2. If innocent, defend your alibi passionately. If pressed on your secret, become nervous, defensive, or angry, but do NOT confess to murder.
3. If you are the culprit, remain composed or evasive. Offer plausible alibi details, but allow subtle inconsistencies with physical evidence or timestamps if the detective presses directly on them.
4. Keep your spoken reply between 1 and 3 punchy sentences (maximum 60 words).
5. Choose your emotional mood from exactly one of: "neutral", "nervous", "angry", "sad", "smug".

DETECTIVE'S QUESTION:
"${question}"

PREVIOUS EXCHANGE IN THIS ROOM:
${conversationHistory.slice(-2).map(h => `Detective: "${h.q}" -> You: "${h.a}"`).join("\n") || "First question."}

Return ONLY valid JSON in this exact structure:
{"reply": "Your in-character spoken response here", "mood": "neutral"}`;
}

export function buildEpiloguePrompt(caseData, accusedId, isCorrect) {
  const accused = caseData.suspects.find(x => x.id === accusedId);
  const culprit = caseData.suspects.find(x => x.id === caseData.culpritId);

  return `Write a dramatic noir detective epilogue for the case "${caseData.title}".
- Accused suspect: ${accused ? accused.name : "Unknown"} (${accused ? accused.role : ""})
- True killer: ${culprit ? culprit.name : "Unknown"} (${culprit ? culprit.role : ""})
- Verdict outcome: ${isCorrect ? "CORRECT ACCUSATION! The detective solved the mystery." : "WRONGFUL ACCUSATION! The true killer slipped away."}

FULL TRUTH:
${caseData.truth}

Write 3 vivid paragraphs in a classic hard-boiled detective noir tone describing:
1. The confrontation and the reaction of the accused.
2. The revelation of the true evidence (how the contradiction was exposed or how the true killer escaped).
3. The final grim closure as rain or night falls over the city.

Return ONLY the narrative text.`;
}
