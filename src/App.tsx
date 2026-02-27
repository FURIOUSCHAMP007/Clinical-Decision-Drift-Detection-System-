import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { analyzeClinicalDrift } from './services/geminiService';
import { MOCK_CLINICAL_EVENTS } from './mockData';
import { DriftAnalysisResult, UserRole, UserProfile } from './types';
import { cn } from './utils';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Settings, User as UserIcon, History as HistoryIcon, Activity } from 'lucide-react';

import { HomeView } from './components/HomeView';
import { PathwayView } from './components/PathwayView';
import { EntropyView } from './components/EntropyView';
import { AlignmentView } from './components/AlignmentView';
import { DriftView } from './components/DriftView';
import { OutcomesView } from './components/OutcomesView';
import { ObsolescenceView } from './components/ObsolescenceView';
import { GovernanceView } from './components/GovernanceView';
import { EHRDashboard } from './components/EHRDashboard';
import { WatsonFailureView } from './components/WatsonFailureView';
import { ClinicalInputView } from './components/ClinicalInputView';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [analysisResult, setAnalysisResult] = useState<DriftAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [user] = useState<UserProfile>({
    id: 'usr-001',
    name: 'Dr. Sarah Chen',
    email: 's.chen@st-jude.org',
    role: UserRole.DEPT_HEAD,
    department: 'Oncology',
    organization: 'St. Jude Medical Center'
  });

  useEffect(() => {
    async function runAnalysis() {
      try {
        setLoading(true);
        const result = await analyzeClinicalDrift(MOCK_CLINICAL_EVENTS);
        setAnalysisResult(result);
      } catch (err) {
        console.error(err);
        setError('Failed to run drift analysis. Please ensure GEMINI_API_KEY is configured.');
      } finally {
        setLoading(false);
      }
    }
    runAnalysis();
  }, []);

  const renderContent = () => {
    if (loading && activeTab !== 'home') {
      return (
        <div className="flex-1 flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-medium animate-pulse">Synthesizing Governance Signals...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return <HomeView onNavigate={setActiveTab} />;
      case 'watson':
        return <WatsonFailureView onBack={() => setActiveTab('home')} />;
      case 'input':
        return <ClinicalInputView />;
      case 'dashboard':
        return <Dashboard result={analysisResult} loading={loading} />;
      case 'pathways':
        return <PathwayView result={analysisResult} />;
      case 'entropy':
        return <EntropyView result={analysisResult} />;
      case 'alignment':
        return <AlignmentView result={analysisResult} />;
      case 'drift':
        return <DriftView result={analysisResult} />;
      case 'outcomes':
        return <OutcomesView result={analysisResult} />;
      case 'obsolescence':
        return <ObsolescenceView result={analysisResult} />;
      case 'governance':
        return <GovernanceView result={analysisResult} />;
      case 'ehr':
        return <EHRDashboard />;
      case 'profile':
        return <ProfileView user={user} />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView onNavigate={setActiveTab} />;
    }
  };

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-red-100 shadow-xl text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Configuration Required</h2>
          <p className="text-slate-500 mb-8">{error}</p>
          <div className="bg-slate-50 p-4 rounded-xl text-left text-xs font-mono text-slate-600 mb-6">
            # .env<br />
            GEMINI_API_KEY="your_key_here"
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

const PlaceholderView = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
    <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mb-6">
      <Icon className="w-10 h-10" />
    </div>
    <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
    <p className="text-slate-500 max-w-md">
      This module is part of the CD³S extended governance suite. 
      Detailed drill-down and reporting features are being synthesized from the drift engine.
    </p>
  </div>
);

const ProfileView = ({ user }: { user: UserProfile }) => (
  <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">User Profile</h2>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-emerald-500" />
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6">
            <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-lg">
              <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                <UserIcon className="w-12 h-12" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Full Name</label>
              <p className="text-lg font-semibold text-slate-900">{user.name}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Role</label>
              <p className="text-lg font-semibold text-slate-900">{user.role.replace('_', ' ')}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Email</label>
              <p className="text-lg font-semibold text-slate-900">{user.email}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Department</label>
              <p className="text-lg font-semibold text-slate-900">{user.department}</p>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Organization</label>
              <p className="text-lg font-semibold text-slate-900">{user.organization}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SettingsView = () => (
  <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">System Settings</h2>
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            AI Configuration
          </h3>
          <div className="space-y-4">
            <SettingItem label="Drift Sensitivity" description="Threshold for triggering drift alerts." value="0.75" />
            <SettingItem label="Alignment Drop Trigger" description="Minimum % drop to flag as risk." value="15%" />
            <SettingItem label="Entropy Alert Threshold" description="Unpredictability score limit." value="0.40" />
          </div>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-500" />
            Governance Controls
          </h3>
          <div className="space-y-4">
            <ToggleSetting label="Enable Obsolescence Detector" active={true} />
            <ToggleSetting label="Enable Entropy Monitoring" active={true} />
            <ToggleSetting label="Explainability Trace Logging" active={true} />
          </div>
        </section>
      </div>
    </div>
  </div>
);

const SettingItem = ({ label, description, value }: { label: string, description: string, value: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
    <div>
      <p className="font-semibold text-slate-900">{label}</p>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
    <div className="px-3 py-1 bg-slate-100 rounded-lg font-mono text-sm font-bold text-slate-700">
      {value}
    </div>
  </div>
);

const ToggleSetting = ({ label, active }: { label: string, active: boolean }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
    <p className="font-semibold text-slate-900">{label}</p>
    <div className={cn(
      "w-12 h-6 rounded-full relative transition-colors cursor-pointer",
      active ? "bg-emerald-500" : "bg-slate-200"
    )}>
      <div className={cn(
        "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
        active ? "right-1" : "left-1"
      )} />
    </div>
  </div>
);
