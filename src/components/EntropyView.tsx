import React from 'react';
import { TrendingUp, Info, Activity, Zap } from 'lucide-react';
import { DriftAnalysisResult } from '../types';
import { MOCK_HISTORICAL_TRENDS } from '../mockData';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

export const EntropyView: React.FC<{ result: DriftAnalysisResult | null }> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Stage 2: Decision Entropy Modeling</h2>
          </div>
          <p className="text-slate-500">Measuring behavioral stability and decision unpredictability across the clinical cohort.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Entropy Trend Analysis</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_HISTORICAL_TRENDS}>
                  <defs>
                    <linearGradient id="colorEntropyDetail" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} dy={10} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="entropy" stroke="#6366f1" strokeWidth={3} fill="url(#colorEntropyDetail)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-lg">
              <Zap className="w-8 h-8 mb-4 opacity-50" />
              <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Current Score</p>
              <h4 className="text-4xl font-black mb-2">{result.decision_entropy_score.toFixed(3)}</h4>
              <p className="text-sm leading-relaxed opacity-90">
                {result.entropy_trend.includes('increase') 
                  ? "Unpredictability is rising, suggesting a potential shift in clinical consensus." 
                  : "Behavioral stability remains within expected parameters."}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-3">What is Decision Entropy?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                In CD³S, entropy quantifies the diversity of clinical choices for similar patient profiles. High entropy indicates "noise" or "drift" from a unified protocol.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-indigo-400" />
            AI Pipeline Logic: Entropy Calculation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">01</span>
              <h4 className="font-bold text-indigo-400">State Mapping</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Mapping every clinical decision to a multi-dimensional state space.</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">02</span>
              <h4 className="font-bold text-indigo-400">Probability Dist.</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Calculating the probability distribution of transitions between states.</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black text-white/10 block leading-none">03</span>
              <h4 className="font-bold text-indigo-400">Shannon Entropy</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Applying H(X) = -Σ P(x) log P(x) to measure system uncertainty.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
