import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ShieldCheck, TrendingDown, Zap, Info, ArrowLeft } from 'lucide-react';
import { cn } from '../utils';

interface WatsonFailureViewProps {
  onBack?: () => void;
}

export const WatsonFailureView: React.FC<WatsonFailureViewProps> = ({ onBack }) => {
  return (
    <div className="flex-1 bg-white overflow-y-auto custom-scrollbar">
      {/* Hero Section */}
      <section className="relative py-24 px-8 border-b border-slate-100 bg-slate-950 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 -skew-x-12 translate-x-1/4 z-0" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 hover:text-emerald-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Intelligence
            </button>
            <h1 className="text-7xl font-black leading-[0.85] tracking-tighter mb-8">
              THE <span className="text-emerald-500">WATSON</span> <br />
              ONCOLOGY <br />
              FAILURE.
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              A post-mortem on why the world's most famous medical AI failed, and how CD³S implements the "Drift-Aware" layer that was missing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            {/* Sidebar Meta */}
            <div className="md:col-span-4 space-y-12">
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Case Study</h4>
                <p className="text-sm font-bold text-slate-900">IBM Watson Health (2013-2021)</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Failure</h4>
                <p className="text-sm text-slate-600 leading-relaxed">Static training on "synthetic" cases rather than real-world clinical drift.</p>
              </div>
              <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
                <AlertTriangle className="w-6 h-6 text-red-500 mb-4" />
                <p className="text-xs font-bold text-red-900 uppercase tracking-widest mb-2">The Result</p>
                <p className="text-xs text-red-700 leading-relaxed">
                  Recommendations that were "unsafe and incorrect," leading to a $1B+ asset sale and loss of clinical trust.
                </p>
              </div>
            </div>

            {/* Main Narrative */}
            <div className="md:col-span-8 space-y-12">
              <div className="prose prose-slate max-w-none">
                <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">The Three Pillars of Failure</h2>
                
                <div className="space-y-12">
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">01</div>
                      <h3 className="text-xl font-bold text-slate-900">Static Historical Reasoning</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Watson was trained on a "golden set" of cases curated by a small group of experts. This created a frozen snapshot of medical knowledge. In reality, medicine is a living, breathing system where protocols evolve weekly.
                    </p>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-500 italic">
                      "Watson recommended treatments for patients with severe bleeding that could have worsened their condition, because it didn't 'know' the patient's current state had drifted from the training set."
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">02</div>
                      <h3 className="text-xl font-bold text-slate-900">The "Synthetic Case" Trap</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Instead of learning from real-world clinical outcomes, Watson was fed hypothetical scenarios. This meant the AI never encountered the "noise" and "drift" of actual hospital practice, making it fragile when deployed in real oncology wards.
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">03</div>
                      <h3 className="text-xl font-bold text-slate-900">Guideline Obsolescence</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      There was no mechanism to detect when the AI's underlying logic had become stale. As new immunotherapy drugs were approved, Watson continued to recommend older chemotherapy protocols because its "knowledge" was not drift-aware.
                    </p>
                  </section>
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full" />

              <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100">
                <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-500" />
                  How CD³S Solves This
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Continuous Pathway Monitoring</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">We don't use static training. We monitor real-time clinical events to detect shifts in behavior as they happen.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Entropy Alerts</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">When decision unpredictability rises, the system flags it immediately, signaling that guidelines may be failing.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Outcome Co-Movement</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">We correlate drift with patient outcomes. If drift leads to better outcomes, we flag the guideline for an update.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Governance Trace</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Every AI reasoning step is logged immutably, ensuring that "silent drift" is never silent.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-8 border-t border-slate-100 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          CD³S — Clinical Decision Drift Detection System © 2026
        </p>
      </footer>
    </div>
  );
};
