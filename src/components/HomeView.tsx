import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  Info, 
  ArrowRight,
  ChevronRight,
  Database,
  Search,
  Lock,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const modules = [
    { id: 'pathways', title: 'Pathway Construction', icon: Activity, desc: 'Symptoms → Tests → Meds mapping.', color: 'text-emerald-500' },
    { id: 'entropy', title: 'Entropy Modeling', icon: TrendingUp, desc: 'Measuring decision unpredictability.', color: 'text-indigo-500' },
    { id: 'alignment', title: 'Alignment Scoring', icon: ShieldCheck, desc: 'Similarity against guidelines.', color: 'text-blue-500' },
    { id: 'drift', title: 'Temporal Drift', icon: AlertTriangle, desc: '30/60/90-day distribution shifts.', color: 'text-amber-500' },
    { id: 'outcomes', title: 'Outcome Co-Movement', icon: Activity, desc: 'Correlating drift with results.', color: 'text-rose-500' },
    { id: 'obsolescence', title: 'Obsolescence Risk', icon: Zap, desc: 'Detecting stale protocol logic.', color: 'text-red-500' },
    { id: 'governance', title: 'Governance Trace', icon: Lock, desc: 'Immutable AI reasoning logs.', color: 'text-slate-700' },
    { id: 'ehr', title: 'EHR Dashboard', icon: Database, desc: 'Full Oncology Patient Records.', color: 'text-emerald-600' },
  ];

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      {/* Hero Section */}
      <section className="relative py-24 px-8 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-1/4 z-0" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck className="w-3 h-3" />
              Decision Behavior Intelligence
            </div>
            <h1 className="text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-6">
              CD³S — CLINICAL DECISION <br />
              <span className="text-emerald-500">DRIFT DETECTION</span> SYSTEM
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-8">
              A Drift-Aware Governance Intelligence Layer that continuously monitors decision behavior evolution — preventing knowledge aging failures similar to IBM Watson Oncology.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
              >
                Launch Dashboard <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onNavigate('input')}
                className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-indigo-500" /> Simulation Lab
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Why CD³S Exists?</h2>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-red-500 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    The IBM Watson Failure
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Legacy systems failed because they relied on static historical reasoning. They lacked real-time drift detection and had no way to detect when guidelines became obsolete.
                  </p>
                  <button 
                    onClick={() => onNavigate('watson')}
                    className="text-xs font-bold text-red-600 uppercase tracking-widest flex items-center gap-2 hover:text-red-700 transition-colors"
                  >
                    Read Full Case Study <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-emerald-500 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    The CD³S Solution
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    CD³S embeds continuous pathway monitoring and outcome co-movement detection. It creates a governance-safe signal that flags "silent drift" before it impacts patient safety.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-slate-200 rounded-[4rem] overflow-hidden rotate-3 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80" 
                  alt="Medical MRI Scan" 
                  className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 transition-opacity duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-emerald-500/10 mix-blend-multiply" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-slate-900 text-white p-8 rounded-3xl shadow-2xl max-w-xs -rotate-3">
                <p className="text-2xl font-black leading-none mb-2">92%</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confidence in Drift Detection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modules" className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The 8-Stage AI Pipeline</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Our end-to-end architecture processes clinical events through eight distinct governance stages to ensure protocol integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.id}
                whileHover={{ y: -5 }}
                onClick={() => onNavigate(mod.id)}
                className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all cursor-pointer"
              >
                <div className={cn("w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors", mod.color)}>
                  <mod.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-black uppercase tracking-[0.2em] mb-2 block">Stage 0{i+1}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{mod.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{mod.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-emerald-500 transition-colors">
                  View Module <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="py-24 px-8 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Zap className="w-12 h-12 text-emerald-400 mx-auto mb-8" />
          <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter">
            A DRIFT-AWARE GOVERNANCE <br />
            INTELLIGENCE LAYER.
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed mb-12">
            CD³S does not replace the clinician. It provides the infrastructure needed to ensure that clinical guidelines evolve at the same speed as clinical practice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-white/10 pt-12">
            <div>
              <h4 className="font-bold text-emerald-400 mb-2">No Diagnosis</h4>
              <p className="text-xs text-slate-500 leading-relaxed">System focuses purely on behavioral patterns, not individual patient diagnosis.</p>
            </div>
            <div>
              <h4 className="font-bold text-emerald-400 mb-2">No Compliance</h4>
              <p className="text-xs text-slate-500 leading-relaxed">We detect drift, not "errors." Governance is about insight, not enforcement.</p>
            </div>
            <div>
              <h4 className="font-bold text-emerald-400 mb-2">Real-Time</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Continuous monitoring prevents the "knowledge aging" that plagues static systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md">
              <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Modern Tech Stack</h2>
              <p className="text-slate-500 leading-relaxed">
                CD³S is built on a high-performance, resilient architecture designed for real-time clinical data processing and governance intelligence.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <TechCard name="React 19" icon={Activity} color="text-blue-500" />
              <TechCard name="Tailwind 4" icon={Zap} color="text-cyan-500" />
              <TechCard name="Gemini 1.5" icon={ShieldCheck} color="text-emerald-500" />
              <TechCard name="Recharts" icon={TrendingUp} color="text-indigo-500" />
              <TechCard name="Motion" icon={Activity} color="text-rose-500" />
              <TechCard name="TypeScript" icon={Lock} color="text-blue-600" />
              <TechCard name="Vite" icon={Zap} color="text-amber-500" />
              <TechCard name="Lucide" icon={Info} color="text-slate-600" />
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

const TechCard = ({ name, icon: Icon, color }: { name: string, icon: any, color: string }) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center group hover:bg-white hover:shadow-lg hover:border-emerald-100 transition-all">
    <Icon className={cn("w-6 h-6 mb-2", color)} />
    <span className="text-xs font-bold text-slate-900">{name}</span>
  </div>
);
