import React from 'react';
import { ShieldCheck, Info, FileText, Search, Lock } from 'lucide-react';
import { DriftAnalysisResult } from '../types';
import { cn, getRiskColor } from '../utils';

export const GovernanceView: React.FC<{ result: DriftAnalysisResult | null }> = ({ result }) => {
  if (!result) return null;

  const signal = result.practice_drift_signal;

  return (
    <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-900/10 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-slate-900" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Stage 7: Explainability & Governance Trace</h2>
          </div>
          <p className="text-slate-500">Synthesizing all AI signals into an audit-safe governance trace for clinical review.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-400" />
                Audit Log: Explainability Trace
              </h3>
              <div className="space-y-4">
                {result.explainability_trace.map((trace, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                    <span className="text-xs font-bold text-slate-300 mt-1">[{i+1}]</span>
                    <p className="text-sm text-slate-600 leading-relaxed italic">"{trace}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={cn(
              "p-6 rounded-3xl border shadow-lg",
              getRiskColor(signal.risk_level)
            )}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-60">Final Governance Signal</h4>
              <p className="text-lg font-bold leading-tight mb-4">{signal.summary}</p>
              <div className="pt-4 border-t border-current/10 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 block">Risk Level</span>
                  <span className="text-sm font-bold uppercase">{signal.risk_level}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 block">Recommendation</span>
                  <span className="text-sm font-bold">{signal.recommendation_type.replace(/_/g, ' ')}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg">
              <Lock className="w-6 h-6 text-emerald-400 mb-2" />
              <h4 className="font-bold mb-2">Immutable Trace</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                This trace is cryptographically hashed and stored in the governance ledger, ensuring a permanent record of the AI's reasoning process.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-slate-400" />
            AI Pipeline Logic: Signal Synthesis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">01</span>
              <h4 className="font-bold text-slate-400">Feature Aggregation</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Collecting outputs from all 6 previous stages of the pipeline.</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">02</span>
              <h4 className="font-bold text-slate-400">Conflict Resolution</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Resolving contradictory signals using a weighted governance heuristic.</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">03</span>
              <h4 className="font-bold text-slate-400">Natural Language Gen</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Translating mathematical drift into observational governance language.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
