import React from 'react';
import { AlertTriangle, Info, Zap, ShieldAlert } from 'lucide-react';
import { DriftAnalysisResult } from '../types';
import { cn } from '../utils';

export const ObsolescenceView: React.FC<{ result: DriftAnalysisResult | null }> = ({ result }) => {
  if (!result) return null;

  const risk = result.guideline_obsolescence_risk;

  return (
    <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Stage 6: Guideline Obsolescence Risk</h2>
          </div>
          <p className="text-slate-500">Detecting when guidelines no longer reflect the best observed clinical reality.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className={cn(
            "lg:col-span-2 p-8 rounded-3xl border shadow-xl flex flex-col justify-center transition-all",
            risk.risk_detected ? "bg-red-600 text-white border-red-500" : "bg-white text-slate-900 border-slate-200"
          )}>
            <div className="flex items-center gap-4 mb-6">
              <div className={cn("p-3 rounded-2xl", risk.risk_detected ? "bg-white/20" : "bg-slate-100")}>
                <ShieldAlert className={cn("w-8 h-8", risk.risk_detected ? "text-white" : "text-slate-400")} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">
                  {risk.risk_detected ? "Obsolescence Risk Detected" : "No Immediate Risk"}
                </h3>
                <p className={cn("text-sm opacity-80 font-medium", risk.risk_detected ? "text-white" : "text-slate-500")}>
                  Confidence Level: {risk.confidence_level}
                </p>
              </div>
            </div>
            <p className="text-lg font-medium leading-relaxed mb-8">
              {risk.interpretation}
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-black/20 rounded-xl text-sm font-bold">
                Trend Duration: {risk.trend_duration}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-4">Risk Triggers</h4>
              <div className="space-y-4">
                <TriggerItem label="Alignment Decay" active={true} />
                <TriggerItem label="Drift Acceleration" active={risk.risk_detected} />
                <TriggerItem label="Outcome Improvement" active={risk.risk_detected} />
              </div>
            </div>
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg">
              <Zap className="w-6 h-6 text-amber-400 mb-2" />
              <h4 className="font-bold mb-2">IBM Failure Prevention</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                IBM Watson failed because it couldn't detect when guidelines became "stale." Stage 6 flags this gap automatically.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-red-400" />
            AI Pipeline Logic: Obsolescence Detection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">01</span>
              <h4 className="font-bold text-red-400">Multi-Signal Fusion</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Combining alignment decay, drift magnitude, and outcome shifts.</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">02</span>
              <h4 className="font-bold text-red-400">Knowledge Aging</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Calculating the "age" of guidelines relative to current practice evolution.</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">03</span>
              <h4 className="font-bold text-red-400">Risk Synthesis</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Generating a governance signal for protocol review discussion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TriggerItem = ({ label, active }: { label: string, active: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-slate-600">{label}</span>
    <div className={cn(
      "w-2 h-2 rounded-full",
      active ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-slate-200"
    )} />
  </div>
);
