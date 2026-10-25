import React, { useState, useEffect } from "react";
import { Sparkles, Key, Play, ShieldAlert, Cpu, BookOpen } from "lucide-react";
import { FALLBACK_STORY_SEEDS } from "../../data/fallbackSeeds";
import { testOllamaAvailability, getGeminiApiKey } from "../../services/aiService";

export default function StartScreen({
  onStartWithAI,
  onStartWithSeed,
  onStartOfflineDemo,
  isGenerating = false,
  errorMsg = ""
}) {
  const [apiKey, setApiKey] = useState(() => getGeminiApiKey());
  const [ollamaReady, setOllamaReady] = useState(false);
  const [selectedSeedIndex, setSelectedSeedIndex] = useState(0);

  useEffect(() => {
    testOllamaAvailability().then(setOllamaReady);
  }, []);

  const handleKeyChange = (val) => {
    setApiKey(val);
    localStorage.setItem("whodunit_api_key", val.trim());
  };

  const currentSeed = FALLBACK_STORY_SEEDS[selectedSeedIndex];

  return (
    <div className="start-screen-container">
      <div className="start-screen-card">
        {/* Title & Badge */}
        <div className="start-title-badge">
          <span className="badge-flair">NOIR DETECTIVE SIMULATOR</span>
        </div>
        <h1 className="start-main-title">
          WHODUNIT <span className="title-gradient">AI</span>
        </h1>
        <p className="start-tagline">
          Step into a living noir mystery. Procedurally generated cases, animated suspect lineups, and deep AI-driven interrogations. Interrogate, deduce, and convict.
        </p>

        {/* Fallback Seeds Feature Box */}
        <div className="start-seeds-box">
          <div className="seeds-box-header">
            <BookOpen size={16} className="text-gold" />
            <span className="seeds-header-title">MYSTERY STORY SEED INSPIRATION ({selectedSeedIndex + 1}/{FALLBACK_STORY_SEEDS.length})</span>
          </div>
          <div className="seed-display-body">
            <h3 className="seed-name">{currentSeed.title}</h3>
            <p className="seed-premise">{currentSeed.premise}</p>
            <div className="seed-meta-pills">
              <span className="seed-pill">📍 {currentSeed.setting}</span>
              <span className="seed-pill">👤 Victim: {currentSeed.victim}</span>
            </div>
          </div>
          <div className="seeds-nav-row">
            <button
              type="button"
              className="seed-nav-arrow"
              onClick={() => setSelectedSeedIndex((prev) => (prev > 0 ? prev - 1 : FALLBACK_STORY_SEEDS.length - 1))}
            >
              ◀ Previous Seed
            </button>
            <button
              type="button"
              className="seed-nav-arrow"
              onClick={() => setSelectedSeedIndex((prev) => (prev < FALLBACK_STORY_SEEDS.length - 1 ? prev + 1 : 0))}
            >
              Next Seed ▶
            </button>
          </div>
        </div>

        {/* AI Key Config Form */}
        <div className="start-config-form">
          <div className="input-label-row">
            <div className="label-with-icon">
              <Key size={15} />
              <span>Google Gemini API Key (Free Tier)</span>
            </div>
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noreferrer"
              className="get-key-link"
            >
              Get Free Key ↗
            </a>
          </div>

          <input
            type="password"
            className="api-key-input"
            value={apiKey}
            onChange={(e) => handleKeyChange(e.target.value)}
            placeholder="Paste your Gemini API key (AIzaSy...) or leave blank for Ollama/Offline"
          />

          <div className="provider-status-row">
            <div className={`status-pill ${ollamaReady ? "status-ready" : "status-idle"}`}>
              <Cpu size={14} />
              <span>{ollamaReady ? "Local Ollama AI: Connected (llama3.2)" : "Local Ollama: Not detected (optional)"}</span>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="start-error-banner">
            <ShieldAlert size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="start-actions-grid">
          <button
            className="btn-start-primary"
            onClick={() => onStartWithAI(apiKey)}
            disabled={isGenerating}
          >
            <Sparkles size={18} />
            <span>{isGenerating ? "Investigating & Generating..." : "Generate AI Case From Seed"}</span>
          </button>

          <button
            className="btn-start-secondary"
            onClick={() => onStartWithSeed(currentSeed)}
            disabled={isGenerating}
          >
            <Play size={18} />
            <span>Play Selected Seed Now</span>
          </button>

          <button
            className="btn-start-offline"
            onClick={onStartOfflineDemo}
            disabled={isGenerating}
          >
            <span>Play Instant Offline Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
