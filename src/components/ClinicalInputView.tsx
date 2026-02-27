import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  User, 
  Stethoscope, 
  TestTube, 
  Pill, 
  Activity, 
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Database,
  ClipboardList
} from 'lucide-react';
import { analyzeClinicalDrift } from '../services/geminiService';
import { ClinicalEvent, DriftAnalysisResult } from '../types';
import { cn } from '../utils';

interface ClinicalInputViewProps {
  onEventAdded?: (event: ClinicalEvent) => void;
}

export const ClinicalInputView: React.FC<ClinicalInputViewProps> = ({ onEventAdded }) => {
  const [formData, setFormData] = useState({
    patientId: "pat-drift-999",
    department: "Oncology",
    symptoms: "Persistent cough, Weight loss",
    tests: "CT Chest, PET Scan",
    medications: "NewGen-Inhibitor-X, Pembrolizumab",
    procedures: "Targeted Therapy Protocol",
    guidelineFollowed: "NSCLC-v2025"
  });

  const testCases = [
    {
      name: "Standard Protocol",
      data: {
        patientId: "pat-std-001",
        department: "Oncology",
        symptoms: "Persistent cough, Chest pain",
        tests: "CT Chest, Biopsy",
        medications: "Cisplatin, Pemetrexed",
        procedures: "Standard Infusion",
        guidelineFollowed: "NSCLC-v2025"
      }
    },
    {
      name: "Experimental Drift",
      data: {
        patientId: "pat-drift-999",
        department: "Oncology",
        symptoms: "Persistent cough, Weight loss",
        tests: "CT Chest, PET Scan",
        medications: "NewGen-Inhibitor-X, Pembrolizumab",
        procedures: "Targeted Therapy Protocol",
        guidelineFollowed: "NSCLC-v2025"
      }
    }
  ];

  const loadTestCase = (testCase: typeof testCases[0]) => {
    setFormData(testCase.data);
    setAnalysis(null);
    setError(null);
  };

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DriftAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError(null);

    const newEvent: ClinicalEvent = {
      id: `evt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      patientId: formData.patientId,
      department: formData.department,
      symptoms: formData.symptoms.split(',').map(s => s.trim()).filter(Boolean),
      tests: formData.tests.split(',').map(s => s.trim()).filter(Boolean),
      medications: formData.medications.split(',').map(s => s.trim()).filter(Boolean),
      procedures: formData.procedures.split(',').map(s => s.trim()).filter(Boolean),
      outcome: 'stable',
      guidelineFollowed: formData.guidelineFollowed
    };

    try {
      // Analyze this specific event
      const result = await analyzeClinicalDrift([newEvent]);
      setAnalysis(result);
      if (onEventAdded) onEventAdded(newEvent);
    } catch (err) {
      setError('Analysis failed. Please check your API key configuration.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            Simulation Lab
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Live Clinical Input</h1>
          <p className="text-slate-500">Manually inject clinical events into the CD³S pipeline to test drift detection logic.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <ClipboardList className="w-3 h-3" /> Preloaded Test Cases
              </h3>
              <div className="flex gap-2">
                {testCases.map((tc, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => loadTestCase(tc)}
                    className="flex-1 py-2 px-3 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 rounded-xl text-xs font-bold text-slate-600 hover:text-indigo-600 transition-all"
                  >
                    {tc.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData({
                    patientId: `pat-${Math.floor(Math.random() * 900) + 100}`,
                    department: 'Oncology',
                    symptoms: '',
                    tests: '',
                    medications: '',
                    procedures: '',
                    guidelineFollowed: 'NSCLC-v2025'
                  })}
                  className="py-2 px-3 bg-slate-50 hover:bg-red-50 border border-slate-100 hover:border-red-100 rounded-xl text-xs font-bold text-slate-400 hover:text-red-600 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3" /> Patient ID
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    value={formData.patientId}
                    onChange={e => setFormData({...formData, patientId: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Database className="w-3 h-3" /> Guideline
                  </label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none"
                    value={formData.guidelineFollowed}
                    onChange={e => setFormData({...formData, guidelineFollowed: e.target.value})}
                  >
                    <option>NSCLC-v2025</option>
                    <option>SCLC-v2024</option>
                    <option>Onco-Experimental</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Stethoscope className="w-3 h-3" /> Symptoms (comma separated)
                </label>
                <textarea 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 min-h-[80px]"
                  placeholder="e.g. Persistent cough, Shortness of breath"
                  value={formData.symptoms}
                  onChange={e => setFormData({...formData, symptoms: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <TestTube className="w-3 h-3" /> Tests (comma separated)
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="e.g. CT Chest, MRI Brain"
                  value={formData.tests}
                  onChange={e => setFormData({...formData, tests: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Pill className="w-3 h-3" /> Medications (comma separated)
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="e.g. Cisplatin, Pemetrexed"
                  value={formData.medications}
                  onChange={e => setFormData({...formData, medications: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Procedures (comma separated)
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="e.g. Biopsy, Radiation"
                  value={formData.procedures}
                  onChange={e => setFormData({...formData, procedures: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isAnalyzing}
                className={cn(
                  "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                  isAnalyzing ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20"
                )}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                    Analyzing Drift...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Inject into Pipeline
                  </>
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 leading-relaxed">{error}</p>
                </div>
              )}
            </form>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {analysis ? (
                <motion.div
                  key="analysis-result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Sparkles className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Analysis Complete</h3>
                          <p className="text-xs text-slate-400">Gemini 1.5 Pro Governance Signal</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6 mb-8">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Alignment</p>
                          <p className="text-2xl font-black text-emerald-400">{(analysis.guideline_alignment_score * 100).toFixed(0)}%</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Entropy</p>
                          <p className="text-2xl font-black text-indigo-400">{analysis.decision_entropy_score.toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Risk Level</p>
                          <p className={cn(
                            "text-2xl font-black uppercase tracking-tighter",
                            analysis.drift_detected ? "text-rose-400" : "text-emerald-400"
                          )}>
                            {analysis.drift_detected ? 'High' : 'Low'}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Reasoning</h4>
                        <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10 italic">
                          "{analysis.practice_drift_signal.summary}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Detected Drift Patterns</h4>
                      <div className="space-y-3">
                        {analysis.explainability_trace.map((pattern, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-medium text-slate-700">{pattern}</span>
                          </div>
                        ))}
                        {analysis.explainability_trace.length === 0 && (
                          <p className="text-xs text-slate-400 italic">No significant drift patterns detected.</p>
                        )}
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Governance Signal</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-medium text-emerald-700">Recommendation: {analysis.practice_drift_signal.recommendation_type.replace(/_/g, ' ')}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                          <Activity className="w-4 h-4 text-indigo-500" />
                          <span className="text-xs font-medium text-indigo-700">Magnitude: {analysis.drift_magnitude}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mb-6">
                    <Activity className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Awaiting Input</h3>
                  <p className="text-sm text-slate-500 max-w-xs">
                    Enter clinical event details on the left to trigger a real-time drift analysis using Gemini 1.5 Pro.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
