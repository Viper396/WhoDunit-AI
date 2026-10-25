import React, { useState } from "react";
import { Scale, X } from "lucide-react";
import Avatar, { formatDisplayName } from "../stage/Avatar";
import { CHAR_COLORS } from "../stage/GameStage";

export default function AccusationModal({
  isOpen,
  onClose,
  suspects = [],
  onConfirmAccusation,
  preselectedId
}) {
  const [chosenId, setChosenId] = useState(preselectedId || suspects[0]?.id);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!chosenId) return;
    onConfirmAccusation(chosenId);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card accusation-card-modal">
        <button className="modal-close-icon" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-top-accent">
          <Scale size={22} className="modal-icon-crimson" />
          <span className="modal-stamp crimson">FINAL ACCUSATION</span>
        </div>

        <h2 className="modal-accusation-title">Who Committed the Murder?</h2>
        <p className="modal-accusation-warning">
          Carefully weigh the alibis, contradictions, and physical evidence. Your accusation is final and will conclude the case!
        </p>

        {/* 4 Suspect Choice Cards */}
        <div className="accusation-suspects-grid">
          {suspects.map((s, idx) => {
            const isChosen = chosenId === s.id;
            const color = CHAR_COLORS[idx] || "#d4a030";

            return (
              <div
                key={s.id}
                className={`accuse-choice-card ${isChosen ? "selected" : ""}`}
                onClick={() => setChosenId(s.id)}
                style={{ borderColor: isChosen ? color : "rgba(255,255,255,0.12)" }}
              >
                <div className="accuse-avatar-wrap">
                  <svg viewBox="0 0 160 220" width="100%" height="100%">
                    <Avatar look={s.look} mood="neutral" isTalking={false} />
                  </svg>
                </div>
                <div className="accuse-name" style={{ color }}>{formatDisplayName(s.name)}</div>
                <div className="accuse-role">{s.role}</div>
                <div className="accuse-motive-snippet"><strong>Motive:</strong> {s.motive}</div>
              </div>
            );
          })}
        </div>

        <div className="accusation-modal-actions">
          <button className="btn-modal-cancel" onClick={onClose}>
            Return to Investigation
          </button>
          <button className="btn-modal-accuse" onClick={handleConfirm}>
            <Scale size={18} />
            <span>Formally Accuse {suspects.find(x => x.id === chosenId)?.name || "Suspect"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
