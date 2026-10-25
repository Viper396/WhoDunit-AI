import React, { useState } from "react";
import StartScreen from "./components/screens/StartScreen";
import TopHUD from "./components/hud/TopHUD";
import GameStage, { CHAR_COLORS } from "./components/stage/GameStage";
import DialogueBox from "./components/dialogue/DialogueBox";
import QuestionInput from "./components/dialogue/QuestionInput";
import EvidenceDocket from "./components/evidence/EvidenceDocket";
import CaseDossierModal from "./components/modals/CaseDossierModal";
import AccusationModal from "./components/modals/AccusationModal";
import EpilogueModal from "./components/modals/EpilogueModal";

import {
  generateNewCase,
  askSuspectQuestion,
  generateEpilogue,
  getActiveProviderStatus,
  getGeminiApiKey
} from "./services/aiService";
import { getOfflineCase } from "./data/offlineCases";
import {
  setSoundEnabled,
  isSoundEnabled,
  playSelectSound,
  playPinSound
} from "./services/soundService";
import { formatDisplayName } from "./components/stage/Avatar";

export default function App() {
  const [screen, setScreen] = useState("start"); // "start" | "game"
  const [isGenerating, setIsGenerating] = useState(false);
  const [startError, setStartError] = useState("");
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());

  // Game Case State
  const [caseData, setCaseData] = useState(null);
  const [selectedSuspectId, setSelectedSuspectId] = useState("s1");
  const [suspectMoods, setSuspectMoods] = useState({});
  const [questionsLeft, setQuestionsLeft] = useState(8);
  const [clues, setClues] = useState([]);
  const [chats, setChats] = useState({}); // { [suspectId]: [{ q, a, mood }] }

  // Dialogue & Talking State
  const [currentDialogueText, setCurrentDialogueText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  // Modals
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isAccusationOpen, setIsAccusationOpen] = useState(false);
  const [isEpilogueOpen, setIsEpilogueOpen] = useState(false);
  const [accusedId, setAccusedId] = useState(null);
  const [epilogueText, setEpilogueText] = useState("");

  const [providerStatus, setProviderStatus] = useState(() => getActiveProviderStatus());

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const initGameWithCase = (cd) => {
    setCaseData(cd);
    const initialSuspect = cd.suspects?.[0]?.id || "s1";
    setSelectedSuspectId(initialSuspect);

    // Initial moods
    const initMoods = {};
    cd.suspects?.forEach(s => {
      initMoods[s.id] = "neutral";
    });
    setSuspectMoods(initMoods);

    setQuestionsLeft(8);
    setClues([]);
    setChats({});
    setCurrentDialogueText(`Interrogating ${cd.suspects[0].name} — ${cd.suspects[0].role}. What would you like to ask?`);

    setScreen("game");
    setIsDossierOpen(true);
    setProviderStatus(getActiveProviderStatus());
  };

  const handleStartWithAI = async (key) => {
    setIsGenerating(true);
    setStartError("");
    try {
      const activeKey = key || getGeminiApiKey();
      const cd = await generateNewCase(activeKey);
      initGameWithCase(cd);
    } catch {
      setStartError("Failed to generate case with AI. Switching to offline seed.");
      const fallback = getOfflineCase();
      initGameWithCase(fallback);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartWithSeed = (seed) => {
    const cd = getOfflineCase(seed.id);
    initGameWithCase(cd);
  };

  const handleStartOfflineDemo = () => {
    const cd = getOfflineCase();
    initGameWithCase(cd);
  };

  const handleSelectSuspect = (id) => {
    if (id === selectedSuspectId) return;
    playSelectSound();
    setSelectedSuspectId(id);

    const s = caseData.suspects.find(x => x.id === id);
    const history = chats[id] || [];
    if (history.length === 0) {
      setCurrentDialogueText(`Interrogating ${s.name} — ${s.role}. What would you like to ask?`);
    } else {
      const last = history[history.length - 1];
      setCurrentDialogueText(last.a);
    }
  };

  const handleAskQuestion = async (question) => {
    if (!caseData || questionsLeft <= 0 || isThinking) return;

    setIsThinking(true);
    setQuestionsLeft(prev => prev - 1);

    const s = caseData.suspects.find(x => x.id === selectedSuspectId);
    const sIdx = caseData.suspects.findIndex(x => x.id === selectedSuspectId);
    const history = chats[selectedSuspectId] || [];
    const apiKey = getGeminiApiKey();

    try {
      const result = await askSuspectQuestion(caseData, selectedSuspectId, question, history, apiKey);

      // Update mood
      setSuspectMoods(prev => ({ ...prev, [selectedSuspectId]: result.mood }));

      // Record chat
      const newExchange = { q: question, a: result.reply, mood: result.mood };
      setChats(prev => ({
        ...prev,
        [selectedSuspectId]: [...(prev[selectedSuspectId] || []), newExchange]
      }));

      // Set dialogue text to trigger typewriter
      setCurrentDialogueText(result.reply);

      // Add to Evidence Clues Docket
      const newClue = {
        id: `clue-${clues.length + 1}`,
        suspectId: selectedSuspectId,
        name: formatDisplayName(s.name),
        role: s.role,
        color: CHAR_COLORS[sIdx] || "#d4a030",
        q: question,
        a: result.reply,
        mood: result.mood,
        turn: clues.length + 1
      };
      setClues(prev => [...prev, newClue]);
      playPinSound();
      setProviderStatus(getActiveProviderStatus());
    } catch {
      // Fallback response
      const fallbackReply = s.cannedReply || "I have told you all I know.";
      setCurrentDialogueText(fallbackReply);
    } finally {
      setIsThinking(false);
    }
  };

  const handleConfirmAccusation = async (suspectId) => {
    setAccusedId(suspectId);
    setIsAccusationOpen(false);
    setIsEpilogueOpen(true);

    const isCorrect = suspectId === caseData.culpritId;
    const apiKey = getGeminiApiKey();

    try {
      const narrative = await generateEpilogue(caseData, suspectId, isCorrect, apiKey);
      setEpilogueText(narrative);
    } catch {
      setEpilogueText(
        isCorrect
          ? `Your accusation was verified! The killer confessed under pressure.`
          : `Tragically, an innocent suspect was condemned while the true culprit slipped away into the night.`
      );
    }
  };

  const handlePlayAgain = () => {
    setIsEpilogueOpen(false);
    setScreen("start");
  };

  if (screen === "start") {
    return (
      <StartScreen
        onStartWithAI={handleStartWithAI}
        onStartWithSeed={handleStartWithSeed}
        onStartOfflineDemo={handleStartOfflineDemo}
        isGenerating={isGenerating}
        errorMsg={startError}
      />
    );
  }

  const selectedSuspect = caseData?.suspects.find(x => x.id === selectedSuspectId);
  const selectedSuspectIndex = caseData?.suspects.findIndex(x => x.id === selectedSuspectId) ?? 0;
  const currentMood = suspectMoods[selectedSuspectId] || "neutral";

  return (
    <div className="game-screen-layout">
      {/* Left Column: Stage, Top HUD, Dialogue Console */}
      <main className="game-main-column">
        <TopHUD
          caseTitle={caseData.title}
          setting={caseData.setting}
          victim={caseData.victim}
          questionsLeft={questionsLeft}
          maxQuestions={8}
          providerStatus={providerStatus}
          onToggleSound={toggleSound}
          soundOn={soundOn}
        />

        <GameStage
          caseData={caseData}
          selectedSuspectId={selectedSuspectId}
          onSelectSuspect={handleSelectSuspect}
          suspectMoods={suspectMoods}
          isThinking={isThinking}
          isTalking={isTalking}
        />

        <section className="dialogue-console-dock">
          <DialogueBox
            speakerName={selectedSuspect?.name || "Suspect"}
            speakerColor={CHAR_COLORS[selectedSuspectIndex] || "#d4a030"}
            mood={currentMood}
            fullText={currentDialogueText}
            onTypingStateChange={setIsTalking}
            isThinking={isThinking}
          />

          <QuestionInput
            onAskQuestion={handleAskQuestion}
            onOpenAccusation={() => setIsAccusationOpen(true)}
            disabled={isThinking}
            placeholder={`Interrogate ${selectedSuspect?.name} (${selectedSuspect?.role})...`}
            questionsLeft={questionsLeft}
          />
        </section>
      </main>

      {/* Right Column: Case Evidence Docket */}
      <EvidenceDocket
        clues={clues}
        suspects={caseData.suspects}
        selectedSuspectId={selectedSuspectId}
        onSelectSuspect={handleSelectSuspect}
        suspectMoods={suspectMoods}
      />

      {/* Modals */}
      <CaseDossierModal
        caseData={caseData}
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      <AccusationModal
        isOpen={isAccusationOpen}
        onClose={() => setIsAccusationOpen(false)}
        suspects={caseData.suspects}
        onConfirmAccusation={handleConfirmAccusation}
        preselectedId={selectedSuspectId}
      />

      <EpilogueModal
        isOpen={isEpilogueOpen}
        caseData={caseData}
        accusedId={accusedId}
        epilogueText={epilogueText}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );
}
