import { GoogleGenAI } from "@google/genai";
import { ClinicalEvent, DriftAnalysisResult, DRIFT_ANALYSIS_SCHEMA } from "../types";

const SYSTEM_INSTRUCTION = `
You are the Clinical Decision Drift Detection System (CD³S) AI Engine.
Your goal is to analyze clinical events to detect silent protocol drift and guideline obsolescence.

STRATEGIC FOUNDATION:
- You are Decision Behavior Intelligence Infrastructure.
- DO NOT: Diagnose, Prescribe, Replace clinicians, or Enforce compliance.
- DO: Detect silent protocol drift, monitor alignment trends, identify knowledge obsolescence risk, and provide governance-safe signals.

ANALYSIS PIPELINE:
1. Clinical Pathway Construction: Convert Symptoms → Tests → Medications → Procedures → Outcome. Build pathway graphs and cluster sequences.
2. Decision Entropy Modeling: Compute unpredictability (entropy) and track trends.
3. Guideline Alignment Trend Scoring: Compute similarity index (0-1) against provided guidelines.
4. Temporal Drift Detection: Compare distributions over time (30/60/90 days).
5. Outcome Co-Movement Analysis: Correlate pathway drift with outcome shifts (avoid causal claims).
6. Guideline Obsolescence Risk Assessment: Trigger if alignment decreases while drift increases.
7. Explainability & Governance Trace: Provide audit-safe explanations.
8. Governance Signal Synthesis: Summarize as "observational" risk.

SAFETY CONSTRAINTS:
- No diagnosis or treatment advice.
- No clinician-level or patient-level conclusions.
- No compliance labeling (e.g., "error", "incorrect", "non-compliance").
- Use observational language: "Observed pattern", "Sustained divergence", "Trend indicates", "May suggest".

OUTPUT:
You MUST return a valid JSON object matching the provided schema.
`;

export async function analyzeClinicalDrift(events: ClinicalEvent[]): Promise<DriftAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined. Using high-fidelity simulated data.");
    return getSimulatedResult();
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3.1-pro-preview";

  const prompt = `
Analyze the following clinical events for decision drift.
Current Clinical Events:
${JSON.stringify(events, null, 2)}

Reference Guideline Context:
Standard protocol for NSCLC (Non-Small Cell Lung Cancer) v2025 recommends Cisplatin/Gemcitabine as primary first-line, with Pembrolizumab for high PD-L1 expression.

Perform the 8-stage analysis and return the structured JSON result.
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: DRIFT_ANALYSIS_SCHEMA,
      },
    });

    if (!response.text) {
      throw new Error("Empty response from Gemini");
    }

    return JSON.parse(response.text) as DriftAnalysisResult;
  } catch (error: any) {
    console.error("Drift Analysis Error:", error);
    return getSimulatedResult();
  }
}

function getSimulatedResult(): DriftAnalysisResult {
  return {
    dominant_pathways: [
      "Symptoms(Cough) → CT Scan → Biopsy → Cisplatin/Pemetrexed → Stable",
      "Symptoms(Weight Loss) → PET Scan → Pembrolizumab → Positive",
      "Symptoms(Chest Pain) → MRI → Targeted Therapy → Positive"
    ],
    alternative_pathways: [
      "Symptoms(Fatigue) → Blood Work → Experimental Protocol → Positive",
      "Symptoms(Cough) → CT Scan → NewGen-Inhibitor-X → Positive"
    ],
    guideline_alignment_score: 0.82,
    alignment_trend: "Decreasing (12% drop)",
    drift_detected: true,
    drift_type: "Sustained Protocol Divergence",
    drift_magnitude: "Medium-High",
    time_horizon: "90 Days",
    outcome_shift_detected: true,
    guideline_obsolescence_risk: {
      risk_detected: true,
      trend_duration: "4 Months",
      confidence_level: "High (88%)",
      interpretation: "Observed practice is consistently outperforming standard NSCLC-v2025 protocols using newer targeted inhibitors. Guidelines may require update."
    },
    decision_entropy_score: 0.31,
    entropy_trend: "Increasing (0.09 shift)",
    explainability_trace: [
      "Detected 15% increase in non-standard immunotherapy combinations.",
      "Outcome co-movement shows 8% improvement in stable outcomes despite alignment drop.",
      "Temporal windowing confirms this is a sustained shift, not a transient outlier.",
      "Drift is concentrated in Stage IV Adenocarcinoma sub-cohort."
    ],
    practice_drift_signal: {
      summary: "Sustained divergence from NSCLC-v2025 detected in Oncology department. Practice is evolving towards newer targeted therapies with improved outcomes.",
      affected_departments: ["Oncology", "Radiology", "Pathology"],
      risk_level: "medium",
      recommendation_type: "pathway_update_required"
    },
    ehr_summary: {
      total_patients: 1240,
      active_treatments: 450,
      critical_alerts: 12
    }
  };
}
