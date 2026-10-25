import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle, AlertTriangle, RotateCcw } from "lucide-react";
import Avatar from "../stage/Avatar";
import { playWinChime, playLoseTone } from "../../services/soundService";

export default function EpilogueModal({
  isOpen,
  caseData,
  accusedId,
  epilogueText,
  onPlayAgain
}) {
  if (!isOpen || !caseData) return null;

  const accused = caseData.suspects.find(x => x.id === accusedId);
  const culprit = caseData.suspects.find(x => x.id === caseData.culpritId);
  const isCorrect = accusedId === caseData.culpritId;

  useEffect(() => {
    if (isCorrect) {
      playWinChime();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    } else {
      playLoseTone();
    }
  }, [isCorrect]);

  return (
    <div className="modal-backdrop epilogue-backdrop">
      <div className={`modal-card epilogue-card-modal ${isCorrect ? "verdict-win" : "verdict-lose"}`}>
        {/* Verdict Badge */}
        <div className="epilogue-verdict-banner">
          {isCorrect ? (
            <>
              <CheckCircle size={28} className="text-success" />
              <div className="verdict-text-wrap">
                <span className="verdict-title text-success">CASE SOLVED — JUSTICE SERVED!</span>
                <span className="verdict-sub">You correctly identified {accused?.name} as the murderer.</span>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle size={28} className="text-danger" />
              <div className="verdict-text-wrap">
                <span className="verdict-title text-danger">WRONGFUL CONVICTION — KILLER ESCAPED!</span>
                <span className="verdict-sub">You accused {accused?.name}, but the true killer was {culprit?.name}.</span>
              </div>
            </>
          )}
        </div>

        {/* Culprit Portrait & Bio */}
        <div className="epilogue-culprit-spotlight">
          <div className="culprit-avatar-box">
            <svg viewBox="0 0 160 220" width="100%" height="100%">
              <Avatar look={culprit?.look} mood={isCorrect ? "sad" : "smug"} isTalking={false} />
            </svg>
          </div>
          <div className="culprit-details">
            <span className="culprit-label">TRUE PERPETRATOR:</span>
            <h3 className="culprit-name">{culprit?.name}</h3>
            <span className="culprit-role">{culprit?.role}</span>
            <p className="culprit-motive"><strong>True Motive:</strong> {culprit?.motive}</p>
          </div>
        </div>

        {/* The Truth Explained */}
        <div className="epilogue-truth-box">
          <h4 className="truth-heading">The Full Solution:</h4>
          <p className="truth-paragraph">{caseData.truth}</p>
        </div>

        {/* Epilogue Narration */}
        <div className="epilogue-narrative-box">
          <h4 className="narrative-heading">Epilogue:</h4>
          <div className="narrative-content">
            {epilogueText ? (
              epilogueText.split("\n\n").map((para, i) => (
                <p key={i} className="epilogue-para">{para}</p>
              ))
            ) : (
              <p className="epilogue-loading">Generating epilogue narrative...</p>
            )}
          </div>
        </div>

        <button className="btn-modal-restart" onClick={onPlayAgain}>
          <RotateCcw size={18} />
          <span>Investigate Another Mystery</span>
        </button>
      </div>
    </div>
  );
}
