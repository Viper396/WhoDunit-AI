import React, { useState } from "react";
import { Search, Scale } from "lucide-react";

const SUGGESTED_CHIPS = [
  "Where were you at the time of the crime?",
  "What is your true relation to the victim?",
  "Did you enter the crime scene room?",
  "Can anyone confirm your alibi?"
];

export default function QuestionInput({
  onAskQuestion,
  onOpenAccusation,
  disabled = false,
  placeholder = "Type your interrogation question...",
  questionsLeft = 8
}) {
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed || disabled || questionsLeft <= 0) return;
    onAskQuestion(trimmed);
    setInputVal("");
  };

  const handleChipClick = (chipText) => {
    if (disabled || questionsLeft <= 0) return;
    onAskQuestion(chipText);
  };

  return (
    <div className="question-input-wrapper">
      {/* Quick Prompt Chips */}
      <div className="prompt-chips-row">
        {SUGGESTED_CHIPS.map((chip, i) => (
          <button
            key={i}
            type="button"
            className="prompt-chip-btn"
            onClick={() => handleChipClick(chip)}
            disabled={disabled || questionsLeft <= 0}
          >
            "{chip}"
          </button>
        ))}
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="question-form-bar">
        <input
          type="text"
          className="interrogation-text-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={questionsLeft > 0 ? placeholder : "Questions exhausted — you must accuse a suspect!"}
          disabled={disabled || questionsLeft <= 0}
          maxLength={300}
        />

        <button
          type="submit"
          className="btn-ask-question"
          disabled={disabled || !inputVal.trim() || questionsLeft <= 0}
        >
          <Search size={16} />
          <span>Ask Question</span>
        </button>

        <button
          type="button"
          className="btn-accuse-trigger"
          onClick={onOpenAccusation}
        >
          <Scale size={16} />
          <span>Accuse Suspect</span>
        </button>
      </form>
    </div>
  );
}
