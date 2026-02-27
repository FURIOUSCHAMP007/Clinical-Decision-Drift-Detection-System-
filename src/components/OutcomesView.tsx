import React from 'react';
import { Activity, Info, HeartPulse, TrendingUp } from 'lucide-react';
import { DriftAnalysisResult } from '../types';
import { cn } from '../utils';

export const OutcomesView: React.FC<{ result: DriftAnalysisResult | null }> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-500/10 rounded-lg">
              <Activity className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Stage 5: Outcome Co-Movement Analysis</h2>
          </div>
          <p className="text-slate-500">Monitoring clinical outcome distribution shifts and correlating them with pathway drift.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-500" />
              Outcome Shift Detection
            </h3>
            <div className="flex items-center justify-center py-12">
              <div className="relative">
                <div className={cn(
                  "w-32 h-32 rounded-full flex items-center justify-center border-4",
                  result.outcome_shift_detected ? "border-rose-500 bg-rose-50" : "border-emerald-500 bg-emerald-50"
                )}>
                  <span className={cn(
                    "text-xl font-black",
                    result.outcome_shift_detected ? "text-rose-600" : "text-emerald-600"
                  )}>
                    {result.outcome_shift_detected ? "SHIFT" : "STABLE"}
                  </span>
                </div>
                {result.outcome_shift_detected && (
                  <div className="absolute -top-2 -right-2 bg-rose-500 text-white p-1.5 rounded-full animate-bounce">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-center text-slate-500 leading-relaxed">
              {result.outcome_shift_detected 
                ? "A statistically significant shift in patient outcomes has been detected alongside protocol drift." 
                : "Outcome distributions remain stable despite minor behavioral variations."}
            </p>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">Safety Constraint: Non-Causal Correlation</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              CD³S identifies "Co-Movement" — when drift and outcome shifts happen together. It explicitly avoids claiming that the drift *caused* the outcome shift, preventing the logic errors seen in legacy systems like IBM Watson.
            </p>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">Governance Note</p>
              <p className="text-xs text-slate-300 italic">
                "Observed co-movement may suggest a relationship but requires clinical review to establish causality."
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-rose-400" />
            AI Pipeline Logic: Co-Movement Correlation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">01</span>
              <h4 className="font-bold text-rose-400">Outcome Mapping</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Normalizing diverse outcome data into a unified performance vector.</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">02</span>
              <h4 className="font-bold text-rose-400">Cross-Correlation</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Computing time-lagged cross-correlation between drift and outcomes.</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">03</span>
              <h4 className="font-bold text-rose-400">Significance Testing</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Applying P-value thresholds to filter out random outcome fluctuations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
