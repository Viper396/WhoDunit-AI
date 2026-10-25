import React from "react";
import { Folder, Volume2, VolumeX, Search } from "lucide-react";

export default function TopHUD({
  caseTitle,
  setting,
  victim,
  questionsLeft = 8,
  maxQuestions = 8,
  providerStatus = { name: "gemini", model: "gemini-2.5-flash" },
  onToggleSound,
  soundOn = true
}) {
  return (
    <header className="top-hud-bar">
      <div className="hud-left">
        <div className="hud-case-header">
          <Folder className="hud-folder-icon" size={20} />
          <h1 className="hud-title">{caseTitle || "Active Investigation"}</h1>
        </div>
        <div className="hud-subtitle">
          {setting ? `${setting} · Victim: ${victim}` : "Awaiting mystery case dossier…"}
        </div>
      </div>

      <div className="hud-right">
        {/* Questions Remaining Indicator */}
        <div className="hud-questions-box">
          <span className="hud-questions-label">QUESTIONS:</span>
          <div className="hud-badges-track">
            {Array.from({ length: maxQuestions }).map((_, i) => {
              const isUsed = i >= questionsLeft;
              return (
                <span
                  key={i}
                  className={`hud-q-badge ${isUsed ? "used" : "active"}`}
                  title={isUsed ? "Question spent" : "Question available"}
                >
                  <Search size={14} />
                </span>
              );
            })}
          </div>
        </div>

        {/* AI Provider Status Pill */}
        <div className="hud-provider-pill" title={`Active AI Model: ${providerStatus.model}`}>
          <span className={`provider-dot ${providerStatus.name === "gemini" ? "green" : providerStatus.name === "ollama" ? "purple" : "amber"}`} />
          <span className="provider-text">{providerStatus.model}</span>
        </div>

        {/* Sound Toggle */}
        <button
          className="hud-sound-btn"
          onClick={onToggleSound}
          title={soundOn ? "Mute procedural sound" : "Enable procedural sound"}
        >
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>{soundOn ? "Sound" : "Muted"}</span>
        </button>
      </div>
    </header>
  );
}
