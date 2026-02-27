import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Activity, 
  ShieldAlert,
  Info
} from 'lucide-react';
import { DriftAnalysisResult } from '../types';
import { MOCK_HISTORICAL_TRENDS } from '../mockData';
import { cn, formatScore, getRiskColor } from '../utils';
import { motion } from 'motion/react';

interface DashboardProps {
  result: DriftAnalysisResult | null;
  loading: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Synthesizing Governance Signals...</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Clinical Governance Dashboard</h2>
          <p className="text-slate-500 mt-1">Real-time decision behavior intelligence & drift monitoring.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-slate-600">Live Monitoring</span>
          </div>
        </div>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          label="Guideline Alignment" 
          value={formatScore(result.guideline_alignment_score)} 
          trend={result.alignment_trend}
          icon={ShieldAlert}
          color="emerald"
        />
        <StatCard 
          label="Decision Entropy" 
          value={result.decision_entropy_score.toFixed(2)} 
          trend={result.entropy_trend}
          icon={Activity}
          color="indigo"
        />
        <StatCard 
          label="Drift Magnitude" 
          value={result.drift_magnitude} 
          subValue={result.drift_type}
          icon={TrendingUp}
          color="amber"
        />
        <StatCard 
          label="Obsolescence Risk" 
          value={result.guideline_obsolescence_risk.risk_detected ? "Detected" : "Low"} 
          subValue={result.guideline_obsolescence_risk.confidence_level}
          icon={AlertTriangle}
          color={result.guideline_obsolescence_risk.risk_detected ? "red" : "slate"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Alignment vs Entropy Trend</h3>
              <div className="flex gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-slate-500">Alignment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                  <span className="text-slate-500">Entropy</span>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_HISTORICAL_TRENDS}>
                  <defs>
                    <linearGradient id="colorAlign" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEntropy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="alignment" stroke="#10b981" fillOpacity={1} fill="url(#colorAlign)" strokeWidth={2} />
                  <Area type="monotone" dataKey="entropy" stroke="#6366f1" fillOpacity={1} fill="url(#colorEntropy)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Dominant Pathways</h3>
              <div className="space-y-3">
                {result.dominant_pathways.map((path, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-lg font-bold text-xs">{i+1}</span>
                    {path}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Alternative Sequences</h3>
              <div className="space-y-3">
                {result.alternative_pathways.map((path, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-lg font-bold text-xs">{i+1}</span>
                    {path}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className={cn(
            "p-6 rounded-2xl border shadow-sm",
            getRiskColor(result.practice_drift_signal.risk_level)
          )}>
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="text-lg font-bold">Governance Signal</h3>
            </div>
            <p className="text-sm font-medium leading-relaxed mb-4">
              {result.practice_drift_signal.summary}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {result.practice_drift_signal.affected_departments.map(dept => (
                <span key={dept} className="px-2 py-1 bg-white/20 rounded-md text-xs font-bold uppercase tracking-wider">
                  {dept}
                </span>
              ))}
            </div>
            <div className="pt-4 border-t border-current/10">
              <span className="text-xs font-bold uppercase tracking-widest opacity-60 block mb-1">Recommendation</span>
              <span className="text-sm font-bold">{result.practice_drift_signal.recommendation_type.replace(/_/g, ' ')}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-slate-400" />
              Explainability Trace
            </h3>
            <div className="space-y-4">
              {result.explainability_trace.map((trace, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1 h-auto bg-slate-100 rounded-full" />
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    {trace}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  trend?: string;
  icon: any;
  color: 'emerald' | 'indigo' | 'amber' | 'red' | 'slate';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, trend, icon: Icon, color }) => {
  const colorClasses = {
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    amber: 'text-amber-600 bg-amber-50 border-amber-100',
    red: 'text-red-600 bg-red-50 border-red-100',
    slate: 'text-slate-600 bg-slate-50 border-slate-100',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl border", colorClasses[color])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
            trend.toLowerCase().includes('increase') || trend.toLowerCase().includes('up') 
              ? 'text-emerald-600 bg-emerald-50' 
              : 'text-red-600 bg-red-50'
          )}>
            {trend.toLowerCase().includes('increase') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
        {subValue && <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{subValue}</p>}
      </div>
    </motion.div>
  );
};
