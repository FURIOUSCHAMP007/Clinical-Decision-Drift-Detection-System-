# CD³S: Clinical Decision Drift Detection System

https://youtu.be/rsNtQXpIXng?si=is8J6IU-PpjqwtcS

**CD³S** (Clinical Decision Drift Detection System) is a next-generation clinical governance platform designed to detect "silent" protocol drift and identify when medical guidelines have become obsolete. Unlike legacy systems that rely on static historical reasoning, CD³S uses real-time behavioral intelligence to monitor how clinical practice evolves in the real world.

## 🚀 Core Value Proposition

In modern medicine, guidelines often lag behind clinical innovation. CD³S bridges this gap by:
1.  **Detecting Silent Drift**: Identifying when clinicians deviate from standard protocols before it becomes a risk.
2.  **Measuring Decision Entropy**: Quantifying the unpredictability of clinical decisions across departments.
3.  **Identifying Guideline Obsolescence**: Signaling when "drift" actually leads to better outcomes, suggesting that the guideline itself needs an update.
4.  **Governance-Safe AI**: Providing audit-traceable reasoning without making direct medical diagnoses.

## 🛠️ Key Features

### 1. Simulation Lab (Dynamic Input)
A live laboratory environment where users can inject clinical events (symptoms, tests, medications) into the pipeline.
*   **Preloaded Test Cases**: Includes "Standard Protocol" and "Experimental Drift" scenarios for immediate demonstration.
*   **Real-time Analysis**: Leverages Gemini 1.5 Pro to compute alignment scores, entropy, and risk levels.

### 2. EHR Dashboard
A high-fidelity Electronic Health Record view optimized for oncology.
*   **Vital Sparklines**: Real-time trend visualization for Heart Rate and Blood Pressure.
*   **Clinical History**: Integrated view of treatments, imaging studies, and lab results.
*   **CD³S Integration**: Every patient record shows a "Pathway Alignment" status monitored by the drift engine.

### 3. Intelligence Modules
*   **Pathway Construction**: Visualizes the sequence of clinical events from symptoms to outcomes.
*   **Entropy Modeling**: Tracks the "chaos" in clinical decision-making to spot emerging patterns.
*   **Obsolescence Detection**: A dedicated view for identifying stale protocols.
*   **Governance Trace**: Immutable logs of AI reasoning for clinical auditors.

### 4. IBM Watson Failure Case Study
A detailed post-mortem analysis of why legacy medical AI failed and how CD³S's "Drift-Aware" architecture solves those fundamental flaws.

## 🧠 Technical Architecture

*   **Frontend**: React 18+ with TypeScript.
*   **Styling**: Tailwind CSS for a "crafted" professional aesthetic.
*   **Animations**: Framer Motion for smooth transitions and interactive feedback.
*   **AI Engine**: Google Gemini 1.5 Pro (via `@google/genai`).
*   **Visualization**: Recharts for sparklines and data trends.
*   **Simulation Mode**: A high-fidelity fallback engine that provides realistic clinical reasoning even when an API key is not configured.

## 🧬 The 8-Stage Analysis Pipeline

CD³S processes clinical data through a rigorous 8-stage behavioral intelligence pipeline:

1.  **Clinical Pathway Construction**: Converts raw clinical events into structured sequences (Symptoms → Tests → Medications → Procedures → Outcome) to build pathway graphs and cluster behaviors.
2.  **Decision Entropy Modeling**: Computes the mathematical unpredictability (entropy) of clinical decisions, tracking how "chaos" or variety in practice shifts over time.
3.  **Guideline Alignment Trend Scoring**: Calculates a similarity index (0-1) comparing observed practice against established reference guidelines to detect subtle divergences.
4.  **Temporal Drift Detection**: Uses windowed analysis (30/60/90 days) to compare practice distributions and identify sustained shifts rather than transient outliers.
5.  **Outcome Co-Movement Analysis**: Correlates detected pathway drift with shifts in patient outcomes, identifying if "non-standard" practice is yielding better or worse results.
6.  **Guideline Obsolescence Risk Assessment**: A critical trigger that fires when guideline alignment decreases while patient outcomes remain stable or improve—signaling a stale protocol.
7.  **Explainability & Governance Trace**: Generates audit-safe, natural language explanations for every detected signal, ensuring clinical teams can trust the AI's reasoning.
8.  **Governance Signal Synthesis**: Summarizes complex findings into "Observational Risk" levels (Low, Medium, High) with specific recommendations for clinical review.

## 🛠️ Getting Started

### Prerequisites
*   Node.js & npm
*   Gemini API Key (Optional for simulation, required for live AI)

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your API key (optional):
    *   Add `GEMINI_API_KEY` to your environment variables or AI Studio Secrets.

### Development
Run the development server:
```bash
npm run dev
```

## 🛡️ Governance & Safety
CD³S is designed as **Behavioral Intelligence Infrastructure**. It does not diagnose patients or prescribe treatments. All outputs are presented as "Observational Signals" to support clinical governance teams and department heads in maintaining the highest standards of care.

---
*Created for the future of clinical governance.*
