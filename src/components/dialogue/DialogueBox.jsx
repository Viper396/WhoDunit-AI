import React, { useState, useEffect, useRef } from "react";
import { User } from "lucide-react";
import { playTypewriterBlip } from "../../services/soundService";

export default function DialogueBox({
  speakerName = "Suspect",
  speakerColor = "#d4a030",
  mood = "neutral",
  fullText = "",
  onTypingStateChange,
  isThinking = false
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textRef = useRef(fullText);

  useEffect(() => {
    textRef.current = fullText;
    if (!fullText) {
      setDisplayedText("");
      setIsTyping(false);
      onTypingStateChange?.(false);
      return;
    }

    let currentIndex = 0;
    setIsTyping(true);
    onTypingStateChange?.(true);

    const interval = setInterval(() => {
      currentIndex += 2;
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        playTypewriterBlip();
      } else {
        setDisplayedText(fullText);
        setIsTyping(false);
        onTypingStateChange?.(false);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleSkip = () => {
    if (isTyping) {
      setDisplayedText(fullText);
      setIsTyping(false);
      onTypingStateChange?.(false);
    }
  };

  return (
    <div className="dialogue-box-container" onClick={handleSkip} title="Click to skip typewriter">
      <div className="dialogue-meta-header">
        <div className="dialogue-speaker-pill" style={{ borderColor: speakerColor, color: speakerColor }}>
          <User size={14} />
          <span>{speakerName}</span>
        </div>
        <div className={`dialogue-mood-tag mood-${mood.toLowerCase()}`}>
          MOOD: {mood.toUpperCase()}
        </div>
        <div className="dialogue-skip-hint">Click box to skip ▶</div>
      </div>

      <div className="dialogue-text-body">
        {isThinking ? (
          <span className="thinking-dots">
            {speakerName} is pausing, contemplating an answer<span className="dots-anim">...</span>
          </span>
        ) : (
          <>
            {displayedText}
            {isTyping && <span className="typewriter-cursor">▍</span>}
          </>
        )}
      </div>
    </div>
  );
}
