import React from "react";
import Avatar, { formatDisplayName } from "../stage/Avatar";
import { CHAR_COLORS } from "../stage/GameStage";

export default function SuspectRoster({
  suspects = [],
  selectedSuspectId,
  onSelectSuspect,
  suspectMoods = {}
}) {
  return (
    <div className="suspect-roster-section">
      <div className="roster-header-label">SUSPECT LINEUP ROSTER</div>
      <div className="roster-cards-grid">
        {suspects.map((s, idx) => {
          const isSelected = s.id === selectedSuspectId;
          const color = CHAR_COLORS[idx] || "#d4a030";
          const mood = suspectMoods[s.id] || "neutral";

          return (
            <div
              key={s.id}
              className={`roster-suspect-card ${isSelected ? "active" : ""}`}
              onClick={() => onSelectSuspect(s.id)}
              style={{
                borderColor: isSelected ? color : "rgba(255,255,255,0.08)"
              }}
            >
              <div className="roster-avatar-thumb">
                <svg viewBox="0 0 160 220" width="100%" height="100%">
                  <Avatar look={s.look} mood={mood} isTalking={false} />
                </svg>
              </div>
              <div className="roster-name-label" style={{ color }}>
                {formatDisplayName(s.name)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
