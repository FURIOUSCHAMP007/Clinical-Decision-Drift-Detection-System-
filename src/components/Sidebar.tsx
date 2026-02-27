import React from 'react';
import { 
  Home,
  LayoutDashboard, 
  Activity, 
  ShieldCheck, 
  Settings, 
  User, 
  LogOut,
  AlertTriangle,
  TrendingUp,
  History,
  Sparkles
} from 'lucide-react';
import { cn } from '../utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'input', label: 'Simulation Lab', icon: Sparkles },
    { id: 'watson', label: 'Watson Failure Case', icon: AlertTriangle },
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'pathways', label: '1. Pathway Construction', icon: Activity },
    { id: 'entropy', label: '2. Entropy Modeling', icon: TrendingUp },
    { id: 'alignment', label: '3. Alignment Scoring', icon: ShieldCheck },
    { id: 'drift', label: '4. Temporal Drift', icon: AlertTriangle },
    { id: 'outcomes', label: '5. Outcome Co-Movement', icon: Activity },
    { id: 'obsolescence', label: '6. Obsolescence Risk', icon: AlertTriangle },
    { id: 'governance', label: '7. Governance Trace', icon: ShieldCheck },
    { id: 'ehr', label: '8. EHR Dashboard', icon: History },
  ];

  const secondaryItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-full overflow-hidden shrink-0">
      <div className="p-6 shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">CD³S</h1>
        </div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Clinical Intelligence</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                activeTab === item.id 
                  ? "bg-emerald-500/10 text-emerald-400" 
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4",
                activeTab === item.id ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 mb-4 px-4">
          <div className="h-px bg-slate-800 w-full" />
        </div>

        <nav className="space-y-1">
          {secondaryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                activeTab === item.id 
                  ? "bg-emerald-500/10 text-emerald-400" 
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4",
                activeTab === item.id ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-slate-800 shrink-0">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors rounded-xl hover:bg-red-500/5 group">
          <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
