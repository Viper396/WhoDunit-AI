import React from "react";
import { FileText, ArrowRight } from "lucide-react";

export default function CaseDossierModal({ caseData, isOpen, onClose }) {
  if (!isOpen || !caseData) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card dossier-card-modal">
        <div className="modal-top-accent">
          <FileText size={20} className="modal-icon-gold" />
          <span className="modal-stamp">CONFIDENTIAL CASE DOSSIER</span>
        </div>

        <h2 className="modal-case-title">{caseData.title}</h2>
        <div className="modal-case-meta">
          {caseData.setting} · Victim: <strong className="text-gold">{caseData.victim}</strong>
        </div>

        <div className="modal-summary-box">
          <p className="modal-summary-text">{caseData.summary}</p>
        </div>

        <div className="modal-rules-grid">
          <div className="rule-item">
            <span className="rule-badge">8</span>
            <span>You have 8 questions total across all 4 suspects.</span>
          </div>
          <div className="rule-item">
            <span className="rule-badge">1</span>
            <span>Only one suspect is the true murderer. Three are innocent.</span>
          </div>
          <div className="rule-item">
            <span className="rule-badge">⚖</span>
            <span>Deduce the contradiction in their statements and accuse the culprit.</span>
          </div>
        </div>

        <button className="btn-modal-primary" onClick={onClose}>
          <span>Begin Interrogation</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
