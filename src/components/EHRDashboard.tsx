import React, { useState } from 'react';
import { 
  Users, 
  User as UserIcon, 
  Activity, 
  FileText, 
  Calendar, 
  Search, 
  Filter,
  ChevronRight,
  Thermometer,
  Heart,
  Scale,
  Droplets,
  Microscope,
  Stethoscope,
  Plus,
  Pill,
  Image as ImageIcon,
  ClipboardList
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { MOCK_PATIENTS } from '../mockData';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

export const EHRDashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState(MOCK_PATIENTS[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex bg-slate-50 overflow-hidden">
      {/* Patient List Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            Oncology Patients
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredPatients.map(patient => (
            <button
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={cn(
                "w-full p-4 text-left border-b border-slate-50 transition-all hover:bg-slate-50",
                selectedPatient.id === patient.id ? "bg-emerald-50 border-l-4 border-l-emerald-500" : ""
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-slate-900">{patient.name}</span>
                <span className={cn(
                  "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                  patient.status === 'Active' ? "bg-blue-100 text-blue-600" :
                  patient.status === 'Critical' ? "bg-red-100 text-red-600" :
                  "bg-emerald-100 text-emerald-600"
                )}>
                  {patient.status}
                </span>
              </div>
              <div className="text-xs text-slate-500 flex justify-between">
                <span>{patient.id} • {patient.age}y {patient.gender[0]}</span>
                <span>{patient.stage}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100">
          <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add New Patient
          </button>
        </div>
      </div>

      {/* Patient Detail View */}
      <div className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPatient.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm mb-8 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400">
                  <UserIcon className="w-10 h-10" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-black text-slate-900">{selectedPatient.name}</h2>
                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-widest">
                      {selectedPatient.id}
                    </span>
                  </div>
                  <p className="text-slate-500 font-medium">
                    {selectedPatient.diagnosis} • <span className="text-emerald-600 font-bold">{selectedPatient.stage}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Next Treatment</p>
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <Calendar className="w-4 h-4" />
                  {selectedPatient.nextTreatment}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Vitals & Labs & Meds (4 cols) */}
              <div className="lg:col-span-4 space-y-8">
                {/* Vitals */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Current Vitals
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <VitalCard 
                      icon={Heart} 
                      label="Heart Rate" 
                      value={`${selectedPatient.vitals.heartRate} bpm`} 
                      trendData={selectedPatient.vitalTrends?.heartRate}
                      color="#10b981"
                    />
                    <VitalCard 
                      icon={Activity} 
                      label="Blood Pressure" 
                      value={selectedPatient.vitals.bp} 
                      trendData={selectedPatient.vitalTrends?.bpSystolic}
                      color="#3b82f6"
                    />
                    <VitalCard icon={Thermometer} label="Temperature" value={selectedPatient.vitals.temp} />
                    <VitalCard icon={Scale} label="Weight" value={selectedPatient.vitals.weight} />
                  </div>
                </div>

                {/* Labs */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Microscope className="w-4 h-4" /> Lab Results
                  </h3>
                  <div className="space-y-4">
                    <LabItem label="WBC Count" value={selectedPatient.labs.wbc} />
                    <LabItem label="Hemoglobin" value={selectedPatient.labs.hemoglobin} />
                    <LabItem label="Platelets" value={selectedPatient.labs.platelets} />
                    {selectedPatient.labs.cea && <LabItem label="CEA Marker" value={selectedPatient.labs.cea} highlight />}
                  </div>
                </div>

                {/* Medications */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Pill className="w-4 h-4" /> Active Medications
                  </h3>
                  <div className="space-y-4">
                    {selectedPatient.medications?.map((med: any, i: number) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-sm font-bold text-slate-900">{med.name}</p>
                        <p className="text-xs text-slate-500">{med.dosage} • {med.frequency}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Treatment History & Imaging & Notes (8 cols) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Clinical Notes */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-emerald-500" />
                    Clinical Notes
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50 italic">
                    "{selectedPatient.notes}"
                  </p>
                </div>

                {/* Treatment History */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-emerald-500" />
                    Treatment & Clinical History
                  </h3>
                  <div className="space-y-6">
                    {selectedPatient.treatments.map((t: any, i: number) => (
                      <div key={i} className="flex gap-6 relative">
                        {i !== selectedPatient.treatments.length - 1 && (
                          <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-slate-100" />
                        )}
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 z-10">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-900">{t.type}</h4>
                            <span className="text-xs font-medium text-slate-400">{t.date}</span>
                          </div>
                          <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            {t.notes}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Imaging Studies */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-emerald-500" />
                    Imaging Studies
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPatient.imaging?.map((img: any, i: number) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-bold text-slate-900">{img.study}</p>
                          <p className="text-[10px] font-bold text-slate-400">{img.date}</p>
                        </div>
                        <p className="text-xs text-emerald-600 font-medium">{img.result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CD3S Integration */}
                <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-emerald-500 rounded-2xl">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold">CD³S Integration Active</h4>
                      <p className="text-xs text-slate-400">Monitoring this patient's pathway for protocol drift.</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Patient's current treatment cycle aligns 94% with standard NSCLC-v2025 guidelines. No significant individual drift detected.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const VitalCard = ({ 
  icon: Icon, 
  label, 
  value, 
  trendData,
  color = "#10b981"
}: { 
  icon: any, 
  label: string, 
  value: string,
  trendData?: { value: number }[],
  color?: string
}) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col">
    <div className="flex justify-between items-start mb-2">
      <Icon className="w-4 h-4 text-slate-400" />
      {trendData && (
        <div className="w-12 h-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-bold text-slate-900">{value}</p>
  </div>
);

const LabItem = ({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
    <span className="text-sm text-slate-600">{label}</span>
    <span className={cn(
      "text-sm font-bold",
      highlight ? "text-rose-600" : "text-slate-900"
    )}>{value}</span>
  </div>
);

const ShieldCheck = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
