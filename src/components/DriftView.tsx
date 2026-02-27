import React from 'react';
import { AlertTriangle, Info, Clock, BarChart3 } from 'lucide-react';
import { DriftAnalysisResult } from '../types';
import { cn } from '../utils';

export const DriftView: React.FC<{ result: DriftAnalysisResult | null }> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Stage 4: Temporal Drift Detection</h2>
          </div>
          <p className="text-slate-500">Comparing 30/60/90-day pathway distributions to detect sustained behavioral evolution.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DriftMetricCard 
            label="Drift Detected" 
            value={result.drift_detected ? "YES" : "NO"} 
            sub={result.drift_type}
            active={result.drift_detected}
          />
          <DriftMetricCard 
            label="Magnitude" 
            value={result.drift_magnitude} 
            sub="Deviation Intensity"
            active={result.drift_magnitude !== 'low'}
          />
          <DriftMetricCard 
            label="Time Horizon" 
            value={result.time_horizon} 
            sub="Observation Window"
            active={true}
          />
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-slate-400" />
            Distribution Shift Visualization
          </h3>
          <div className="space-y-8">
            <DistributionRow label="Baseline (90 Days Ago)" percentage={95} color="bg-slate-200" />
            <DistributionRow label="Mid-Term (45 Days Ago)" percentage={88} color="bg-slate-300" />
            <DistributionRow label="Current Window" percentage={result.guideline_alignment_score * 100} color="bg-amber-500" />
          </div>
          <p className="mt-8 text-sm text-slate-500 italic">
            * The widening gap between Baseline and Current Window indicates a sustained protocol drift.
          </p>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-amber-400" />
            AI Pipeline Logic: Temporal Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">01</span>
              <h4 className="font-bold text-amber-400">Windowing</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Segmenting clinical events into overlapping temporal windows.</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">02</span>
              <h4 className="font-bold text-amber-400">Distribution Comparison</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Using Kullback-Leibler divergence to measure distribution shifts.</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">03</span>
              <h4 className="font-bold text-amber-400">Persistence Check</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Filtering out transient outliers to identify sustained behavioral drift.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DriftMetricCard = ({ label, value, sub, active }: { label: string, value: string, sub: string, active: boolean }) => (
  <div className={cn(
    "p-6 rounded-3xl border shadow-sm transition-all",
    active ? "bg-white border-amber-200" : "bg-slate-50 border-slate-100 opacity-60"
  )}>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h4 className={cn("text-3xl font-black mb-1", active ? "text-amber-600" : "text-slate-400")}>{value}</h4>
    <p className="text-xs font-medium text-slate-500">{sub}</p>
  </div>
);

const DistributionRow = ({ label, percentage, color }: { label: string, percentage: number, color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-bold">
      <span className="text-slate-600">{label}</span>
      <span className="text-slate-900">{percentage.toFixed(0)}% Alignment</span>
    </div>
    <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
      <div className={cn("h-full transition-all duration-1000", color)} style={{ width: `${percentage}%` }} />
    </div>
  </div>
);
