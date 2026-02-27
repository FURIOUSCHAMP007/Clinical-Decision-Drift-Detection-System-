import React from 'react';
import { Activity, ArrowRight, Info } from 'lucide-react';
import { DriftAnalysisResult } from '../types';
import { motion } from 'motion/react';

export const PathwayView: React.FC<{ result: DriftAnalysisResult | null }> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Activity className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Stage 1: Clinical Pathway Construction</h2>
          </div>
          <p className="text-slate-500">Converting Symptoms → Tests → Medications → Procedures into structured behavioral graphs.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              Dominant Pathways (Clustered)
            </h3>
            <div className="space-y-4">
              {result.dominant_pathways.map((path, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">{path}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full" />
              Alternative Sequences
            </h3>
            <div className="space-y-4">
              {result.alternative_pathways.map((path, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">{path}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-emerald-400" />
            AI Pipeline Logic: Pathway Variance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PipelineStep 
              number="01" 
              title="Tokenization" 
              desc="Clinical events are tokenized into discrete decision nodes." 
            />
            <PipelineStep 
              number="02" 
              title="Clustering" 
              desc="Similar sequences are grouped using density-based clustering." 
            />
            <PipelineStep 
              number="03" 
              title="Variance Check" 
              desc="Computing the distance between dominant and alternative paths." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PipelineStep = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="space-y-2">
    <span className="text-3xl font-black text-white/10 block leading-none">{number}</span>
    <h4 className="font-bold text-emerald-400">{title}</h4>
    <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
  </div>
);
