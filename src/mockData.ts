import { ClinicalEvent } from "./types";

export const MOCK_CLINICAL_EVENTS: ClinicalEvent[] = [
  {
    id: "evt-001",
    timestamp: "2026-01-15T08:30:00Z",
    patientId: "pat-101",
    department: "Oncology",
    symptoms: ["Persistent cough", "Chest pain"],
    tests: ["Chest X-ray", "CT Scan"],
    medications: ["Cisplatin"],
    procedures: ["Biopsy"],
    outcome: "stable",
    guidelineFollowed: "NSCLC-v2025"
  },
  {
    id: "evt-002",
    timestamp: "2026-01-20T10:15:00Z",
    patientId: "pat-102",
    department: "Oncology",
    symptoms: ["Fatigue", "Weight loss"],
    tests: ["Blood work", "PET Scan"],
    medications: ["Pembrolizumab"],
    procedures: ["Immunotherapy induction"],
    outcome: "positive",
    guidelineFollowed: "NSCLC-v2025"
  },
  {
    id: "evt-003",
    timestamp: "2026-02-05T09:00:00Z",
    patientId: "pat-103",
    department: "Oncology",
    symptoms: ["Cough", "Shortness of breath"],
    tests: ["CT Scan"],
    medications: ["Gemcitabine"],
    procedures: ["Radiation therapy"],
    outcome: "negative",
    guidelineFollowed: "NSCLC-v2025"
  },
  {
    id: "evt-004",
    timestamp: "2026-02-10T14:30:00Z",
    patientId: "pat-104",
    department: "Oncology",
    symptoms: ["Persistent cough"],
    tests: ["CT Scan", "MRI"],
    medications: ["Pembrolizumab", "Carboplatin"],
    procedures: ["Targeted therapy"],
    outcome: "positive",
    guidelineFollowed: "NSCLC-v2025"
  },
  {
    id: "evt-005",
    timestamp: "2026-02-25T11:00:00Z",
    patientId: "pat-105",
    department: "Oncology",
    symptoms: ["Chest pain"],
    tests: ["CT Scan"],
    medications: ["NewGen-Inhibitor-X"], // Potential drift: using non-standard med
    procedures: ["Experimental protocol"],
    outcome: "positive",
    guidelineFollowed: "NSCLC-v2025"
  }
];

export const MOCK_HISTORICAL_TRENDS = [
  { date: "2025-10", alignment: 0.95, entropy: 0.12 },
  { date: "2025-11", alignment: 0.93, entropy: 0.15 },
  { date: "2025-12", alignment: 0.90, entropy: 0.18 },
  { date: "2026-01", alignment: 0.88, entropy: 0.22 },
  { date: "2026-02", alignment: 0.82, entropy: 0.31 },
];

export const MOCK_PATIENTS: any[] = [
  {
    id: "pat-101",
    name: "John Doe",
    age: 62,
    gender: "Male",
    diagnosis: "NSCLC - Adenocarcinoma",
    stage: "Stage IIIA",
    status: "Active",
    lastVisit: "2026-02-15",
    nextTreatment: "2026-03-05",
    vitals: { bp: "128/82", heartRate: 74, temp: "98.6°F", weight: "175 lbs" },
    vitalTrends: {
      heartRate: [
        { value: 72 }, { value: 75 }, { value: 78 }, { value: 74 }, { value: 76 }, { value: 74 }
      ],
      bpSystolic: [
        { value: 120 }, { value: 125 }, { value: 130 }, { value: 128 }, { value: 126 }, { value: 128 }
      ]
    },
    labs: { wbc: "4.2 K/uL", hemoglobin: "12.1 g/dL", platelets: "145 K/uL", cea: "4.5 ng/mL" },
    treatments: [
      { type: "Chemotherapy", date: "2026-02-15", notes: "Cycle 3 of Cisplatin/Pemetrexed" },
      { type: "Imaging", date: "2026-01-20", notes: "CT Chest: 15% reduction in primary mass" }
    ],
    medications: [
      { name: "Cisplatin", dosage: "75 mg/m2", frequency: "Every 21 days" },
      { name: "Pemetrexed", dosage: "500 mg/m2", frequency: "Every 21 days" },
      { name: "Ondansetron", dosage: "8 mg", frequency: "As needed for nausea" }
    ],
    imaging: [
      { study: "CT Chest/Abdomen", date: "2026-01-20", result: "Partial Response" },
      { study: "PET/CT Scan", date: "2025-12-15", result: "Hypermetabolic primary lesion" }
    ],
    notes: "Patient tolerating Cycle 3 well. Mild fatigue reported. Continue current protocol."
  },
  {
    id: "pat-102",
    name: "Jane Smith",
    age: 54,
    gender: "Female",
    diagnosis: "NSCLC - Squamous Cell",
    stage: "Stage IV",
    status: "Critical",
    lastVisit: "2026-02-20",
    nextTreatment: "2026-02-28",
    vitals: { bp: "110/70", heartRate: 88, temp: "99.1°F", weight: "132 lbs" },
    vitalTrends: {
      heartRate: [
        { value: 82 }, { value: 85 }, { value: 90 }, { value: 88 }, { value: 92 }, { value: 88 }
      ],
      bpSystolic: [
        { value: 115 }, { value: 112 }, { value: 108 }, { value: 110 }, { value: 105 }, { value: 110 }
      ]
    },
    labs: { wbc: "2.8 K/uL", hemoglobin: "10.5 g/dL", platelets: "98 K/uL", cea: "12.8 ng/mL" },
    treatments: [
      { type: "Immunotherapy", date: "2026-02-20", notes: "Pembrolizumab infusion" },
      { type: "Palliative Care", date: "2026-02-10", notes: "Pain management consult" }
    ],
    medications: [
      { name: "Pembrolizumab", dosage: "200 mg", frequency: "Every 3 weeks" },
      { name: "Dexamethasone", dosage: "4 mg", frequency: "Daily" }
    ],
    imaging: [
      { study: "MRI Brain", date: "2026-02-15", result: "New metastatic focus in right frontal lobe" }
    ],
    notes: "Disease progression noted on recent MRI. Discussing palliative options with family."
  },
  {
    id: "pat-103",
    name: "Robert Wilson",
    age: 71,
    gender: "Male",
    diagnosis: "SCLC - Limited Stage",
    stage: "T2N1M0",
    status: "Stable",
    lastVisit: "2026-02-10",
    nextTreatment: "2026-03-15",
    vitals: { bp: "135/85", heartRate: 68, temp: "98.4°F", weight: "190 lbs" },
    vitalTrends: {
      heartRate: [
        { value: 70 }, { value: 72 }, { value: 68 }, { value: 70 }, { value: 66 }, { value: 68 }
      ],
      bpSystolic: [
        { value: 130 }, { value: 132 }, { value: 138 }, { value: 135 }, { value: 132 }, { value: 135 }
      ]
    },
    labs: { wbc: "5.5 K/uL", hemoglobin: "13.8 g/dL", platelets: "210 K/uL" },
    treatments: [
      { type: "Radiation", date: "2026-02-10", notes: "Fraction 15 of 30 complete" }
    ],
    medications: [
      { name: "Etoposide", dosage: "100 mg/m2", frequency: "Days 1-3" },
      { name: "Carboplatin", dosage: "AUC 5", frequency: "Day 1" }
    ],
    imaging: [
      { study: "Chest X-Ray", date: "2026-02-10", result: "Stable findings" }
    ],
    notes: "Radiation therapy proceeding as planned. Skin irritation at site managed with topical cream."
  }
];
