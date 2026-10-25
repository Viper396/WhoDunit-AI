import React from "react";

export function formatDisplayName(fullName) {
  if (!fullName) return "Suspect";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 1) return parts[0];
  const titles = ["Mr.", "Mrs.", "Ms.", "Miss", "Dr.", "Lady", "Lord", "Sir", "Prof.", "Madame", "Master", "Count", "Countess", "Baron", "Baroness", "Inspector", "Detective"];
  if (titles.includes(parts[0]) && parts.length >= 2) {
    return parts[0] + " " + parts[parts.length - 1];
  }
  if (parts.length === 2) return parts.join(" ");
  return parts.slice(0, 2).join(" ");
}

export default function Avatar({ look = {}, mood = "neutral", isDetective = false, isTalking = false }) {
  const skin = look.skin || (isDetective ? "#d8b08c" : "#deb896");
  const hairStyle = look.hairStyle || (isDetective ? "short" : "short");
  const hairColor = look.hairColor || (isDetective ? "#2b1c10" : "#3b2f2f");
  const outfitColor = look.outfitColor || (isDetective ? "#4a443a" : "#2a3d52");
  const accessory = look.accessory || (isDetective ? "hat" : "none");

  // Mouth path based on mood and talking state
  let mouth = <path d="M 72 138 Q 80 144 88 138" stroke="#5a2e1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  if (isTalking) {
    mouth = (
      <ellipse cx="80" cy="140" rx="6" ry="6" fill="#3a1e16" className="animate-mouth">
        <animate attributeName="ry" values="2;7;2" dur="0.22s" repeatCount="indefinite" />
      </ellipse>
    );
  } else if (mood === "nervous") {
    mouth = <path d="M 73 140 Q 77 137 81 141 T 88 139" stroke="#5a2e1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  } else if (mood === "angry") {
    mouth = <path d="M 73 142 Q 80 136 87 142" stroke="#5a2e1e" strokeWidth="2.8" fill="none" strokeLinecap="round" />;
  } else if (mood === "sad") {
    mouth = <path d="M 73 143 Q 80 137 87 143" stroke="#5a2e1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  } else if (mood === "smug") {
    mouth = <path d="M 74 139 Q 82 144 89 135" stroke="#5a2e1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  }

  // Eyebrows based on mood
  let brows = (
    <>
      <path d="M 64 107 Q 71 106 77 108" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 83 108 Q 89 106 96 107" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  );
  if (mood === "angry") {
    brows = (
      <>
        <path d="M 64 105 L 77 110" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 83 110 L 96 105" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    );
  } else if (mood === "sad" || mood === "nervous") {
    brows = (
      <>
        <path d="M 64 110 L 77 106" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 83 106 L 96 110" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </>
    );
  } else if (mood === "smug") {
    brows = (
      <>
        <path d="M 64 107 Q 71 105 77 108" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 83 104 Q 89 101 96 105" stroke="#333" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      </>
    );
  }

  // Hair styles
  let hair = null;
  if (hairStyle === "updo") {
    hair = (
      <>
        <circle cx="80" cy="62" r="24" fill={hairColor} />
        <path d="M 52 100 C 52 68 108 68 108 100 C 104 88 56 88 52 100 Z" fill={hairColor} />
      </>
    );
  } else if (hairStyle === "bob") {
    hair = (
      <path d="M 50 102 C 50 64 110 64 110 102 C 112 124 104 135 102 135 C 100 120 102 96 98 88 C 88 84 72 84 62 88 C 58 96 60 120 58 135 C 56 135 48 124 50 102 Z" fill={hairColor} />
    );
  } else if (hairStyle === "slick") {
    hair = (
      <path d="M 53 96 C 53 66 107 66 107 96 C 105 84 94 76 80 76 C 66 76 55 84 53 96 Z" fill={hairColor} />
    );
  } else if (hairStyle === "long") {
    hair = (
      <>
        <path d="M 48 104 C 48 64 112 64 112 104 C 114 145 106 170 104 175 C 98 160 104 115 98 90 C 88 84 72 84 62 90 C 56 115 62 160 56 175 C 54 170 46 145 48 104 Z" fill={hairColor} />
      </>
    );
  } else if (hairStyle === "bald") {
    hair = (
      <path d="M 53 105 C 53 95 56 90 60 88 C 58 98 56 108 55 116 Z M 107 105 C 107 95 104 90 100 88 C 102 98 104 108 105 116 Z" fill={hairColor} />
    );
  } else {
    // short
    hair = (
      <path d="M 52 98 C 52 68 108 68 108 98 C 103 85 92 78 80 78 C 68 78 57 85 52 98 Z" fill={hairColor} />
    );
  }

  // Accessories
  let acc = null;
  if (accessory === "hat" || isDetective) {
    acc = (
      <g>
        <ellipse cx="80" cy="74" rx="42" ry="10" fill="#2d261e" />
        <path d="M 54 74 C 54 52 106 52 106 74 Z" fill="#3b3228" />
        <rect x="54" y="68" width="52" height="6" fill="#c8a84b" />
      </g>
    );
  } else if (accessory === "glasses") {
    acc = (
      <g>
        <circle cx="69" cy="116" r="8" fill="none" stroke="#d4af37" strokeWidth="2" />
        <circle cx="91" cy="116" r="8" fill="none" stroke="#d4af37" strokeWidth="2" />
        <line x1="77" y1="116" x2="83" y2="116" stroke="#d4af37" strokeWidth="2" />
      </g>
    );
  } else if (accessory === "scarf") {
    acc = (
      <g>
        <ellipse cx="80" cy="158" rx="22" ry="7" fill="#b03a2e" />
        <rect x="74" y="158" width="10" height="24" rx="3" fill="#b03a2e" />
      </g>
    );
  } else if (accessory === "mustache") {
    acc = (
      <path d="M 72 134 Q 80 137 88 134 Q 84 139 80 136 Q 76 139 72 134 Z" fill={hairColor} />
    );
  } else if (accessory === "earrings") {
    acc = (
      <g>
        <circle cx="51" cy="122" r="3" fill="#d4af37" />
        <circle cx="109" cy="122" r="3" fill="#d4af37" />
      </g>
    );
  }

  return (
    <g>
      {/* Torso & Coat */}
      <path d="M 40 210 L 48 160 Q 80 152 112 160 L 120 210 Z" fill={outfitColor} />

      {/* Collar & Tie */}
      <polygon points="80,158 72,175 88,175" fill="#f4f4f4" />
      <polygon points="78,175 82,175 84,204 80,208 76,204" fill={isDetective ? "#a83232" : "#2a2d48"} />
      <polygon points="68,158 80,182 80,165" fill="#e0e0e0" opacity="0.75" />
      <polygon points="92,158 80,182 80,165" fill="#d0d0d0" opacity="0.75" />

      {/* Solid Neck (prevents gap between head & shirt) */}
      <rect x="73" y="85" width="14" height="68" fill={skin} rx="4" />

      {/* Head */}
      <ellipse cx="80" cy="116" rx="28" ry="32" fill={skin} />

      {/* Ears */}
      <ellipse cx="51" cy="118" rx="4" ry="7" fill={skin} />
      <ellipse cx="109" cy="118" rx="4" ry="7" fill={skin} />

      {/* Eyes */}
      <ellipse cx="69" cy="116" rx="3.5" ry="4" fill="#222" />
      <ellipse cx="91" cy="116" rx="3.5" ry="4" fill="#222" />
      <circle cx="70.5" cy="114.5" r="1.2" fill="#fff" />
      <circle cx="92.5" cy="114.5" r="1.2" fill="#fff" />

      {/* Nose */}
      <path d="M 80 120 L 78 128 L 82 128" stroke="#8c6448" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Eyebrows */}
      {brows}

      {/* Mouth */}
      {mouth}

      {/* Hair */}
      {hair}

      {/* Accessory */}
      {acc}
    </g>
  );
}
