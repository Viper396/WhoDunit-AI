import React from "react";

export default function StageScene({ visual = {} }) {
  const env = visual.environment || "mansion";
  const time = visual.timeOfDay || "night";
  const palette = visual.palette || {
    sky: "#0c0d18",
    building: "#1c1e2e",
    accent: "#d4a030"
  };

  const isNight = time === "night";
  const isDusk = time === "dusk";

  const skyColor = palette.sky || (isNight ? "#080912" : isDusk ? "#2a1525" : "#4a6d8c");
  const bldgColor = palette.building || (isNight ? "#141724" : isDusk ? "#1f1828" : "#2f3848");
  const bldgDark = "#0a0c16";
  const windowGlow = isNight || isDusk ? (palette.accent || "#e8b84b") : "#89b6db";

  return (
    <g className="stage-scene-layer">
      {/* Sky Background */}
      <rect x="0" y="0" width="1280" height="720" fill={skyColor} />

      {/* Celestial Body: Moon or Sun */}
      {isNight ? (
        <g transform="translate(1080, 70)">
          <circle cx="35" cy="35" r="32" fill="#f4ebd0" opacity="0.9" filter="drop-shadow(0 0 16px rgba(244,235,208,0.4))" />
          <circle cx="22" cy="27" r="28" fill={skyColor} />
        </g>
      ) : isDusk ? (
        <circle cx="1060" cy="95" r="38" fill="#d95d39" opacity="0.8" filter="drop-shadow(0 0 20px rgba(217,93,57,0.5))" />
      ) : (
        <circle cx="1060" cy="85" r="32" fill="#fff4c2" opacity="0.95" />
      )}

      {/* Stars for night scenes */}
      {isNight && (
        <g opacity="0.65">
          <circle cx="120" cy="60" r="1.5" fill="#fff" />
          <circle cx="260" cy="110" r="1" fill="#fff" />
          <circle cx="410" cy="45" r="1.8" fill="#fff" />
          <circle cx="580" cy="90" r="1.2" fill="#fff" />
          <circle cx="730" cy="50" r="1.5" fill="#fff" />
          <circle cx="890" cy="85" r="1.2" fill="#fff" />
          <circle cx="1010" cy="140" r="1.6" fill="#fff" />
          <circle cx="1180" cy="65" r="1.2" fill="#fff" />
        </g>
      )}

      {/* Architecture Environment */}
      {env === "train" ? (
        <g>
          {/* Railway carriage interior */}
          <rect x="180" y="140" width="920" height="380" rx="20" fill={bldgColor} stroke="#2a3348" strokeWidth="4" />
          <rect x="220" y="180" width="160" height="120" rx="10" fill={windowGlow} opacity="0.75" />
          <rect x="560" y="180" width="160" height="120" rx="10" fill={windowGlow} opacity="0.75" />
          <rect x="900" y="180" width="160" height="120" rx="10" fill={windowGlow} opacity="0.75" />
          <line x1="180" y1="360" x2="1100" y2="360" stroke="#3e4a63" strokeWidth="3" />
        </g>
      ) : env === "theater" ? (
        <g>
          {/* Theater stage proscenium */}
          <rect x="160" y="120" width="960" height="400" fill={bldgColor} />
          {/* Red velvet curtains on sides */}
          <path d="M 160 120 C 260 220 220 380 200 520 L 160 520 Z" fill="#681822" />
          <path d="M 1120 120 C 1020 220 1060 380 1080 520 L 1120 520 Z" fill="#681822" />
          {/* Stage valance */}
          <path d="M 160 120 Q 320 160 480 130 Q 640 160 800 130 Q 960 160 1120 120 L 1120 140 Q 640 180 160 140 Z" fill="#882230" />
        </g>
      ) : env === "ship" ? (
        <g>
          {/* Ocean liner deck */}
          <polygon points="120,440 240,240 1040,240 1160,440" fill={bldgColor} />
          <rect x="340" y="160" width="600" height="100" rx="8" fill={bldgDark} />
          {/* Porch / Portholes */}
          <circle cx="440" cy="210" r="18" fill={windowGlow} opacity="0.85" />
          <circle cx="580" cy="210" r="18" fill={windowGlow} opacity="0.85" />
          <circle cx="720" cy="210" r="18" fill={windowGlow} opacity="0.85" />
          <circle cx="860" cy="210" r="18" fill={windowGlow} opacity="0.85" />
        </g>
      ) : (
        /* Default: Grand Victorian Mansion or Hotel */
        <g>
          {/* Pediment & Gable Roof */}
          <polygon points="640,110 320,250 960,250" fill={bldgDark} />
          {/* Main Mansion Facade */}
          <rect x="340" y="240" width="600" height="280" fill={bldgColor} />
          {/* Columns */}
          <rect x="420" y="240" width="22" height="280" fill={bldgDark} />
          <rect x="520" y="240" width="22" height="280" fill={bldgDark} />
          <rect x="740" y="240" width="22" height="280" fill={bldgDark} />
          <rect x="840" y="240" width="22" height="280" fill={bldgDark} />
          {/* Windows on Upper Levels (clear of suspects) */}
          <rect x="365" y="315" width="30" height="60" rx="3" fill={windowGlow} opacity="0.85" />
          <rect x="625" y="315" width="30" height="60" rx="3" fill={windowGlow} opacity="0.85" />
          <rect x="705" y="315" width="30" height="60" rx="3" fill={windowGlow} opacity="0.85" />
          <rect x="885" y="315" width="30" height="60" rx="3" fill={windowGlow} opacity="0.85" />
        </g>
      )}

      {/* Ground Mist / Fog Line */}
      <rect x="0" y="490" width="1280" height="230" fill="#07080f" />
      <rect x="0" y="480" width="1280" height="30" fill="url(#groundMistGrad)" opacity="0.65" />
    </g>
  );
}
