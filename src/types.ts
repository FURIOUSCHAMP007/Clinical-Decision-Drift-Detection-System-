import { Type } from "@google/genai";

export enum UserRole {
  ADMIN = "ADMIN",
  DEPT_HEAD = "DEPT_HEAD",
  AUDITOR = "AUDITOR",
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  organization: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  stage: string;
  status: 'Active' | 'Stable' | 'Critical';
  lastVisit: string;
  nextTreatment: string;
  vitals: {
    bp: string;
    heartRate: number;
    temp: string;
    weight: string;
  };
  labs: {
    wbc: string;
    hemoglobin: string;
    platelets: string;
    cea?: string; // Cancer marker
  };
  treatments: {
    type: string;
    date: string;
    notes: string;
  }[];
}

export interface GuidelineObsolescenceRisk {
  risk_detected: boolean;
  trend_duration: string;
  confidence_level: string;
  interpretation: string;
}

export interface PracticeDriftSignal {
  summary: string;
  affected_departments: string[];
  risk_level: "observational" | "low" | "medium" | "high";
  recommendation_type: "review_discussion_only" | "pathway_update_required" | "urgent_review";
}

export interface ClinicalEvent {
  id: string;
  timestamp: string;
  patientId: string;
  department: string;
  symptoms: string[];
  tests: string[];
  medications: string[];
  procedures: string[];
  outcome: "positive" | "negative" | "stable";
  guidelineFollowed: string;
}

export interface DriftAnalysisResult {
  dominant_pathways: string[];
  alternative_pathways: string[];
  guideline_alignment_score: number;
  alignment_trend: string;
  drift_detected: boolean;
  drift_type: string;
  drift_magnitude: string;
  time_horizon: string;
  outcome_shift_detected: boolean;
  guideline_obsolescence_risk: GuidelineObsolescenceRisk;
  decision_entropy_score: number;
  entropy_trend: string;
  explainability_trace: string[];
  practice_drift_signal: PracticeDriftSignal;
  ehr_summary?: {
    total_patients: number;
    active_treatments: number;
    critical_alerts: number;
  };
}

export const DRIFT_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    dominant_pathways: { type: Type.ARRAY, items: { type: Type.STRING } },
    alternative_pathways: { type: Type.ARRAY, items: { type: Type.STRING } },
    guideline_alignment_score: { type: Type.NUMBER },
    alignment_trend: { type: Type.STRING },
    drift_detected: { type: Type.BOOLEAN },
    drift_type: { type: Type.STRING },
    drift_magnitude: { type: Type.STRING },
    time_horizon: { type: Type.STRING },
    outcome_shift_detected: { type: Type.BOOLEAN },
    guideline_obsolescence_risk: {
      type: Type.OBJECT,
      properties: {
        risk_detected: { type: Type.BOOLEAN },
        trend_duration: { type: Type.STRING },
        confidence_level: { type: Type.STRING },
        interpretation: { type: Type.STRING }
      },
      required: ["risk_detected", "trend_duration", "confidence_level", "interpretation"]
    },
    decision_entropy_score: { type: Type.NUMBER },
    entropy_trend: { type: Type.STRING },
    explainability_trace: { type: Type.ARRAY, items: { type: Type.STRING } },
    practice_drift_signal: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        affected_departments: { type: Type.ARRAY, items: { type: Type.STRING } },
        risk_level: { type: Type.STRING },
        recommendation_type: { type: Type.STRING }
      },
      required: ["summary", "affected_departments", "risk_level", "recommendation_type"]
    }
  },
  required: [
    "dominant_pathways",
    "alternative_pathways",
    "guideline_alignment_score",
    "alignment_trend",
    "drift_detected",
    "drift_type",
    "drift_magnitude",
    "time_horizon",
    "outcome_shift_detected",
    "guideline_obsolescence_risk",
    "decision_entropy_score",
    "entropy_trend",
    "explainability_trace",
    "practice_drift_signal"
  ]
};
