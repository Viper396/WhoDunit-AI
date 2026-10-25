import React from "react";
import { Pin } from "lucide-react";

export default function ClueCard({ clue }) {
  if (!clue) return null;

  return (
    <div className="clue-index-card" style={{ borderLeftColor: clue.color || "#d4a030" }}>
      <div className="card-pin-header">
        <Pin size={13} className="card-pin-icon" style={{ color: clue.color || "#d4a030" }} />
        <span className="card-suspect-name" style={{ color: clue.color || "#d4a030" }}>
          {clue.name}
        </span>
        <span className="card-turn-pill">#{clue.turn}</span>
      </div>

      <div className="card-question-text">
        <span className="card-q-prefix">Q: </span>
        <em>{clue.q}</em>
      </div>

      <div className="card-answer-text">
        {clue.a}
      </div>

      <div className="card-footer-meta">
        <span className="card-mood-pill">Mood: {clue.mood || "neutral"}</span>
      </div>
    </div>
  );
}
