# 🔍 Whodunit AI — Modern Noir Detective Simulator

[![React](https://img.shields.io/badge/React-19.3-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash%20%2F%20Pro-4285F4?style=flat-square&logo=google&logoColor=white)](https://aistudio.google.com/)
[![Ollama](https://img.shields.io/badge/Ollama-llama3.2%20Local-black?style=flat-square&logo=ollama&logoColor=white)](https://ollama.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

> Step into a living noir mystery. Procedurally generated cases, animated vector suspect lineups, and deep AI-driven interrogations. Interrogate, deduce, and convict.

**Whodunit AI** is an atmospheric, generative-AI murder mystery detective simulator built with **React 19**, **Vite**, **HTML5 Canvas**, and **procedural inline SVG**. Every game generates a brand-new, high-stakes case with a unique setting, victim, four suspects with distinct personalities, verifiable alibis, hidden secrets, and exactly one culprit.

Players interrogate suspects by typing free-text questions or choosing tactical inquiry chips. The suspect responds in character with mood-dependent expressions and mouth flaps synced to typewriter audio. Clues are automatically pinned to a physical Case Evidence Docket. When ready, the detective formally accuses a suspect and watches a dramatic, AI-authored noir epilogue unfold.

---

## ✨ Key Features

- 🧠 **Triple-Tier AI Resilience**:
  1. **Google Gemini API**: Automatic model rotation (`gemini-2.5-flash` ➔ `gemini-2.5-pro` ➔ `gemini-2.0-flash-lite`) with 30s rate-limit cooldown management.
  2. **Local Ollama Inference**: Seamless fallback to local `llama3.2` at `http://localhost:11434` for 100% private, offline AI.
  3. **Offline Seed Cases**: 10 handcrafted playable mystery cases that guarantee instant, zero-latency gameplay without any internet or API keys.
- 🎭 **Living Procedural Suspect Lineup**:
  - Pure SVG vector avatars with zero raster dependencies.
  - 5 real-time emotional states: `neutral`, `nervous`, `angry`, `sad`, and `smug`.
  - Dynamic mouth flap animations synchronized with dialogue typing speed.
  - Cinematic spotlight beams and subtle noir breathing animations.
- 💬 **Interactive Visual Novel Dialogue Console**:
  - Procedural typewriter blips and responsive audio.
  - Quick-inquiry suggestion chips tailored to suspect alibis and secrets.
  - Free-form natural language questioning powered by LLM system prompts.
- 📌 **Physical Case Docket & Clue Board**:
  - Real-time corkboard pinning with suspect-color-coded tabs.
  - Filter evidence by suspect or review the full chronological investigation transcript.
- 🌧️ **Ambient Weather Canvas**:
  - Full-screen procedural particle canvas rendering rain, mist, lightning storm flashes, and drifting dust motes.
- 🔊 **Zero-Asset WebAudio Synthesizer**:
  - 100% procedural sound design (typewriter clicks, docket pin thuds, victory fanfares, and defeat tones) generated in real time using WebAudio API oscillators. Zero external audio downloads.
- ⚖️ **Fair-Play Mystery Rules**:
  - Guaranteed fair deduction: at least three solid clues and one verifiable contradiction are woven into statements so the culprit can always be deduced through intellect rather than random chance.

---

## 🎮 How to Play

1. **Examine the Case Dossier**: Read the victim's profile, crime scene background, and initial police briefing.
2. **Select a Suspect**: Click any suspect on the lineup stage or bottom roster to focus the interrogation spotlight.
3. **Conduct Interrogations**: You have **8 questions** to crack the case. Ask targeted questions using free-form text or quick-inquiry chips.
4. **Inspect the Evidence Docket**: Watch clues automatically pin to your corkboard. Look for contradictions between suspect alibis and timeline statements.
5. **Issue Accusation**: Once confident, click **Accuse Culprit**, select your prime suspect, and deliver your verdict.
6. **Reveal the Truth**: Read the custom noir epilogue revealing the true sequence of events, motives, and consequence.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- *(Optional)* [Google Gemini API Key](https://aistudio.google.com/apikey) for live cloud AI generation (free tier works great).
- *(Optional)* [Ollama](https://ollama.com/) with `llama3.2` for local offline AI.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/whodunit-ai.git
cd whodunit-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the example environment template:
```bash
cp .env.example .env
```

Open `.env` in your text editor and add your Gemini API key:
```env
# Google Gemini API Key (Get a free key at https://aistudio.google.com/apikey)
VITE_GEMINI_API_KEY=AIzaSyYourActualKeyHere
```

> **Note:** If you don't have an API key, you can still play immediately! Whodunit AI will automatically connect to local Ollama if running, or launch one of the rich built-in offline mystery cases. You can also paste an API key directly on the in-game start screen at any time.

### 4. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 5. Build for Production
```bash
npm run build
```
Generates a minified, production-ready bundle in `dist/`. Preview the production build with:
```bash
npm run preview
```

---

## ⚙️ Environment Variables

| Variable | Required | Description |
| :--- | :---: | :--- |
| `VITE_GEMINI_API_KEY` | Optional | Google Gemini API key. Enables dynamic case generation and open-ended interrogation. Get a free key at [Google AI Studio](https://aistudio.google.com/apikey). |

---

## 🦙 Running Local AI with Ollama (Optional)

If you prefer 100% offline local AI generation without sending requests to external APIs:

1. Install [Ollama](https://ollama.com/).
2. Pull the recommended lightweight model:
   ```bash
   ollama run llama3.2
   ```
3. Whodunit AI will automatically detect the active Ollama instance at `http://localhost:11434` and use it if no Gemini API key is configured or if quotas are reached.

---

## 📁 Project Architecture & Folder Structure

```
genai-project/
├── .env.example                 # Environment template with VITE_GEMINI_API_KEY
├── .gitignore                   # Ignores .env, node_modules, dist, and OS files
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies, scripts, and metadata
├── vite.config.js               # Vite bundler configuration
├── legacy_standalone.html       # Legacy standalone single-file version (archived backup)
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Master state machine, HUD/Stage orchestration & modals
│   │
│   ├── components/
│   │   ├── hud/
│   │   │   └── TopHUD.jsx       # Case title, victim info, 8 question badges, provider pill & sound toggle
│   │   ├── stage/
│   │   │   ├── GameStage.jsx    # Responsive SVG stage, spotlights & thought bubbles
│   │   │   ├── StageScene.jsx   # Procedural SVG backdrops (mansion, train, hotel, theater, ship)
│   │   │   ├── Avatar.jsx       # Procedural SVG avatars with 5 emotional expressions & mouth flaps
│   │   │   └── ParticleCanvas.jsx # Ambient weather canvas (rain, storm lightning, dust)
│   │   ├── dialogue/
│   │   │   ├── DialogueBox.jsx  # Noir visual novel dialogue console with typewriter audio
│   │   │   └── QuestionInput.jsx # Question input, quick suggestion chips, Ask & Accuse triggers
│   │   ├── evidence/
│   │   │   ├── EvidenceDocket.jsx # Real-time evidence board, suspect filter & testimony counter
│   │   │   ├── ClueCard.jsx     # Pinned index card with testimony quotes & mood tags
│   │   │   └── SuspectRoster.jsx # Bottom suspect selection roster with live avatar heads
│   │   ├── modals/
│   │   │   ├── CaseDossierModal.jsx # Confidential case dossier popup with rules
│   │   │   ├── AccusationModal.jsx  # High-stakes accusation modal with portraits & motives
│   │   │   └── EpilogueModal.jsx    # Verdict reveal, culprit spotlight, truth breakdown & confetti
│   │   └── screens/
│   │       └── StartScreen.jsx  # Start screen with Mystery Seeds Carousel & AI key setup
│   │
│   ├── data/
│   │   ├── fallbackSeeds.js     # 10 rich Fallback Mystery Story Seeds & random seed selector
│   │   └── offlineCases.js      # Complete pre-built playable offline mystery cases
│   │
│   ├── services/
│   │   ├── aiService.js         # Gemini model rotation -> Local Ollama -> Offline Fallback chain
│   │   ├── soundService.js      # Procedural WebAudio synthesizer (blips, pins, win chimes, defeat tones)
│   │   └── promptBuilder.js     # Structured prompts enforcing Mystery Quality Rules
│   │
│   └── styles/
│       ├── variables.css        # Palette tokens, glassmorphism, typography, and dark mode colors
│       ├── animations.css       # Noir bobbing, spotlight beams, mouth flapping, cursor blink
│       └── main.css             # Full-screen grid layout, responsive breakpoints, cards & modals
```

---

## 📖 Fallback Mystery Story Seeds

Whodunit AI includes 10 handcrafted mystery story seeds that serve as rich system prompt baselines or instant offline play:

1. **The Last Train to Blackwood** — A railway tycoon is found dead in a locked compartment minutes before reaching the final station.
2. **Murder at the Midnight Broadcast** — A radio host collapses live on air while announcing a name never meant to be heard.
3. **The Hotel with No Room 13** — A guest is murdered in a room absent from every hotel blueprint.
4. **Death Beneath the Red Curtain** — During a sold-out theatre performance, the lead actor dies onstage while someone alters the cue script.
5. **A Toast to the Dead** — At an isolated estate, a wealthy collector dies during a dinner celebrating his own funeral arrangements.
6. **The Photograph from Tomorrow** — A private eye is found dead beside a photograph showing all four suspects at the crime scene—dated tomorrow.
7. **Fog Over Pier Nine** — A shipping magnate is discovered dead aboard a vessel that never left harbour.
8. **The Clockmaker's Last Hour** — An elderly clockmaker is murdered moments before midnight; every clock stopped at a different time.
9. **The Snowbound Confession** — During a blizzard, a judge is found dead beside a wet-ink confession to an unsolved cold case.
10. **The Funeral Guest** — A notorious crime boss is buried in a sealed coffin; that night, someone begins texting from his phone revealing mourners' secrets.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visual Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Linter**: [Oxlint](https://oxc.rs/)
- **Styling**: Vanilla CSS with Design System Tokens & Glassmorphism
- **Audio**: WebAudio API (Zero static audio files)

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
