import React from 'react';
import { ShieldCheck, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { DriftAnalysisResult } from '../types';
import { formatScore } from '../utils';

export const AlignmentView: React.FC<{ result: DriftAnalysisResult | null }> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Stage 3: Guideline Alignment Scoring</h2>
          </div>
          <p className="text-slate-500">Computing the similarity index between observed practice and reference clinical guidelines.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                <circle 
                  cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray={552.92}
                  strokeDashoffset={552.92 * (1 - result.guideline_alignment_score)}
                  strokeLinecap="round"
                  className="text-emerald-500 transition-all duration-1000" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900">{formatScore(result.guideline_alignment_score)}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alignment</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Protocol Adherence</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              The current alignment score indicates a {result.alignment_trend.toLowerCase()} compared to the previous assessment window.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Aligned Behaviors
              </h4>
              <ul className="space-y-3">
                <li className="text-sm text-slate-600 flex gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                  Consistent use of CT-guided biopsy for diagnostic confirmation.
                </li>
                <li className="text-sm text-slate-600 flex gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                  Standardized first-line chemotherapy dosing for Stage III NSCLC.
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Divergent Patterns
              </h4>
              <ul className="space-y-3">
                <li className="text-sm text-slate-600 flex gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                  Increasing utilization of non-standard immunotherapy combinations.
                </li>
                <li className="text-sm text-slate-600 flex gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                  Variation in follow-up imaging frequency for stable patients.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-emerald-400" />
            AI Pipeline Logic: Alignment Indexing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">01</span>
              <h4 className="font-bold text-emerald-400">Guideline Parsing</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Extracting logical constraints from PDF/Text guideline documents.</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">02</span>
              <h4 className="font-bold text-emerald-400">Semantic Matching</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Using LLM embeddings to match clinical events to guideline nodes.</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">03</span>
              <h4 className="font-bold text-emerald-400">Similarity Scoring</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Computing a weighted Jaccard similarity across the decision tree.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
