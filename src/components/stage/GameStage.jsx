import React from "react";
import Avatar, { formatDisplayName } from "./Avatar";
import StageScene from "./StageScene";
import ParticleCanvas from "./ParticleCanvas";

export const CHAR_COLORS = ["#b06ecf", "#3db9c0", "#d4a030", "#d04545"];

export default function GameStage({
  caseData,
  selectedSuspectId,
  onSelectSuspect,
  suspectMoods = {},
  isThinking = false,
  isTalking = false
}) {
  if (!caseData) return null;

  const suspects = caseData.suspects || [];

  return (
    <div className="game-stage-wrapper">
      <ParticleCanvas weather={caseData.visual?.weather || "rain"} />

      <svg
        id="stage-svg"
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
        className="stage-svg-element"
      >
        <defs>
          {/* Spotlight gradient */}
          <linearGradient id="spotlightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffea9f" stopOpacity="0.42" />
            <stop offset="85%" stopColor="#c8a84b" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#c8a84b" stopOpacity="0" />
          </linearGradient>

          {/* Ground Mist gradient */}
          <linearGradient id="groundMistGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#07080f" stopOpacity="1" />
            <stop offset="100%" stopColor="#07080f" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Procedural Backdrop */}
        <StageScene visual={caseData.visual} title={caseData.title} />

        {/* Detective (Left Foreground) */}
        <g id="slot-detective" transform="translate(110, 285) scale(1.22)">
          <g className="avatar-bob-wrap bob-det">
            <ellipse cx="80" cy="204" rx="48" ry="11" fill="#000" opacity="0.65" />
            <Avatar isDetective={true} mood="neutral" isTalking={false} />
            {/* Detective Nameplate */}
            <rect x="22" y="210" width="116" height="24" rx="5" fill="#121324" stroke="#c8a84b" strokeWidth="1.5" />
            <text x="80" y="226" fill="#c8a84b" fontSize="12" fontWeight="900" textAnchor="middle">
              Detective
            </text>
          </g>
        </g>

        {/* Suspect Lineup */}
        {suspects.map((s, idx) => {
          const isSelected = s.id === selectedSuspectId;
          const color = CHAR_COLORS[idx] || "#d4a030";
          const baseX = 420 + idx * 200;
          const baseY = 325;
          const curMood = suspectMoods[s.id] || "neutral";
          const isThisTalking = isTalking && isSelected;

          return (
            <g
              key={s.id}
              id={`slot-${s.id}`}
              className={`suspect-slot ${isSelected ? "selected" : "dimmed"}`}
              onClick={() => onSelectSuspect(s.id)}
              transform={`translate(${baseX}, ${isSelected ? baseY - 15 : baseY}) ${isSelected ? "scale(1.08)" : "scale(1)"}`}
              style={{ cursor: "pointer", transition: "all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)" }}
            >
              <g className={`avatar-bob-wrap bob-${idx}`}>
                {/* Spotlight Beam */}
                <polygon
                  points="80,-310 -15,220 175,220"
                  fill="url(#spotlightGrad)"
                  opacity={isSelected ? "1" : "0"}
                  style={{ transition: "opacity 0.35s ease" }}
                />

                {/* Pedestal Ring */}
                <ellipse
                  cx="80"
                  cy="204"
                  rx="52"
                  ry="12"
                  fill="none"
                  stroke={color}
                  strokeWidth="2.5"
                  opacity={isSelected ? "0.9" : "0"}
                  style={{ transition: "opacity 0.35s ease" }}
                />

                {/* Shadow */}
                <ellipse cx="80" cy="204" rx="46" ry="10" fill="#000" opacity="0.6" />

                {/* Avatar */}
                <Avatar look={s.look} mood={curMood} isTalking={isThisTalking} />

                {/* Suspect Nameplate */}
                <rect
                  x="10"
                  y="210"
                  width="140"
                  height="26"
                  rx="6"
                  fill="#0f111e"
                  stroke={isSelected ? color : "#2a2d48"}
                  strokeWidth={isSelected ? 2 : 1}
                />
                <text x="80" y="227" fill={color} fontSize="12" fontWeight="900" textAnchor="middle">
                  {formatDisplayName(s.name)}
                </text>

                {/* Thought Bubble for Thinking State */}
                {isThinking && isSelected && (
                  <g transform="translate(45, -45)" className="animate-pulse">
                    <ellipse cx="35" cy="20" rx="32" ry="18" fill="#fff" opacity="0.95" />
                    <circle cx="20" cy="40" r="5" fill="#fff" opacity="0.9" />
                    <circle cx="12" cy="48" r="3" fill="#fff" opacity="0.8" />
                    <circle cx="23" cy="20" r="3" fill="#333" />
                    <circle cx="35" cy="20" r="3" fill="#333" />
                    <circle cx="47" cy="20" r="3" fill="#333" />
                  </g>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
