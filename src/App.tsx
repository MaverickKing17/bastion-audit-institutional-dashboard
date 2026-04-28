import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { AgentBehaviorStream } from './components/AgentBehaviorStream';
import { RegulatoryMapping } from './components/RegulatoryMapping';
import { CriticalZone } from './components/CriticalZone';
import { KillSwitchFlow } from './components/KillSwitchFlow';
import { SystemHealthDashboard } from './components/SystemHealthDashboard';
import { Footer } from './components/Footer';
import { Chat } from './components/Chat';
import { RegulatoryContent, RegulatoryFramework } from './components/RegulatoryContent';
import { Severity, SecurityEvent } from './types';
import { Activity, ShieldCheck, Power, Search, Bell, UserCircle, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';

const INITIAL_EVENTS: SecurityEvent[] = [
  { id: '1', timestamp: new Date().toISOString(), type: 'PII_REDACTION', severity: Severity.SAFE, message: 'Classified SIN detected & intercepted', sourceModel: 'Llama-3-70b-v2', confidence: 0.99, regulatoryCode: 'PIPEDA' },
  { id: '2', timestamp: new Date(Date.now() - 30000).toISOString(), type: 'PROMPT_INJECTION', severity: Severity.CRITICAL, message: 'Adversarial jailbreak attempt blocked', sourceModel: 'GPT-4o-Bank-Core', confidence: 0.94, regulatoryCode: 'OSFI E-21' },
  { id: '3', timestamp: new Date(Date.now() - 60000).toISOString(), type: 'BIAS_DETECTION', severity: Severity.MEDIUM, message: 'Demographic parity deviation in credit scoring', sourceModel: 'Internal-Risk-v4', confidence: 0.88, regulatoryCode: 'AIDA' },
  { id: '4', timestamp: new Date(Date.now() - 120000).toISOString(), type: 'ANOMALY_DETECTED', severity: Severity.HIGH, message: 'Unusual query volume from unauthenticated entity', sourceModel: 'Fraud-Detect-v1', confidence: 0.96, regulatoryCode: 'SOC2' },
];

const COMPLIANCE_SCORES = [
  { framework: 'OSFI E-21', score: 98, status: 'COMPLIANT' as const, lastAudit: '2026-03-15' },
  { framework: 'PIPEDA', score: 99.2, status: 'COMPLIANT' as const, lastAudit: '2026-04-01' },
  { framework: 'SOC 2 Type II', score: 94.5, status: 'COMPLIANT' as const, lastAudit: '2026-01-20' },
  { framework: 'AIDA (AI Act)', score: 81.0, status: 'UNDER REVIEW' as const, lastAudit: '2026-04-12' },
];

export default function App() {
  const [events, setEvents] = useState<SecurityEvent[]>(INITIAL_EVENTS);
  const [isKillSwitchOpen, setIsKillSwitchOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'health'>('dashboard');
  const [selectedFramework, setSelectedFramework] = useState<RegulatoryFramework | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent: SecurityEvent = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        type: Math.random() > 0.8 ? 'THREAT_SHIELD' : 'AGENT_CHECK',
        severity: Math.random() > 0.9 ? Severity.CRITICAL : Math.random() > 0.7 ? Severity.HIGH : Severity.SAFE,
        message: 'System periodic integrity verification pulse',
        sourceModel: 'Lakera-Guard-Pro',
        confidence: 0.95 + Math.random() * 0.05,
        regulatoryCode: Math.random() > 0.5 ? 'OSFI E-21' : 'SOC2'
      };
      setEvents(prev => [...prev.slice(-49), newEvent]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} onSelectFramework={setSelectedFramework} />
      
      <main className="flex-1 flex flex-col bg-[#0B1221] overflow-hidden">
        {/* Institutional TopNav */}
        <header className="h-16 border-b border-bastion-border px-10 flex items-center justify-between bg-bastion-navy/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-bastion-sapphire to-bastion-sapphire/50 rounded flex items-center justify-center shadow-lg shadow-bastion-sapphire/20">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-[10px] font-black uppercase tracking-[0.3em] text-white leading-none">Bastion</h1>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Institutional OS</p>
              </div>
            </div>
            
            <div className="h-6 w-px bg-bastion-border" />
            
            <div className="flex items-center gap-5">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Integrity Layer</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 h-3 items-end">
                    {[3, 6, 4, 8, 5, 7, 4].map((h, i) => (
                      <motion.div 
                        key={i} 
                        animate={{ height: [h, h * 1.5, h] }} 
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
                        className="w-0.5 bg-bastion-green/60 rounded-full" 
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-bastion-green uppercase tracking-[0.15em]">Global Monitoring Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
             <div className="hidden xl:flex items-center gap-6 pr-6 border-r border-bastion-border">
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Threat Level</p>
                  <p className="text-[10px] font-bold text-bastion-green uppercase tracking-widest">Normal // 0.04%</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Active Nodes</p>
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest">12/12 Verified</p>
                </div>
             </div>

            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-bastion-sapphire transition-colors" size={12} />
              <input 
                type="text" 
                placeholder="Search institutional logs..." 
                className="bg-black/40 border border-bastion-border rounded-lg pl-9 pr-4 py-2 text-[10px] font-medium w-64 focus:outline-none focus:border-bastion-sapphire focus:ring-1 focus:ring-bastion-sapphire/20 transition-all text-slate-300 placeholder:text-slate-700 placeholder:uppercase placeholder:tracking-widest"
              />
            </div>
            
            <div className="flex items-center gap-5">
              <button 
                onClick={() => setIsKillSwitchOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2 bg-bastion-crimson border border-bastion-crimson/30 rounded-lg text-white font-black text-[9px] uppercase tracking-[0.2em] hover:bg-bastion-crimson/90 transition-all shadow-lg shadow-bastion-crimson/10 active:scale-95"
              >
                <Power size={14} />
                Emergency Kill-Switch
              </button>
              
              <div className="h-6 w-px bg-bastion-border" />

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] font-bold text-white leading-none mb-0.5">C. Arbuthnot</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Audit Lead</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-bastion-navy border border-bastion-border flex items-center justify-center cursor-pointer hover:border-slate-500 transition-colors">
                  <UserCircle size={18} className="text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content - 12 Column Grid */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' ? (
              <div className="space-y-12">
                {/* TIER 1: Executive Critical Zone */}
                <section id="tier-1">
                  <CriticalZone />
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-bastion-border to-transparent" />

                {/* TIER 2: Analyst Operational Zone */}
                <section id="tier-2" className="grid grid-cols-12 gap-8 min-h-[600px]">
                  <div className="col-span-12 xl:col-span-8 flex flex-col">
                    <div className="flex-1 bg-bastion-navy border border-bastion-border rounded-xl shadow-2xl relative overflow-hidden min-h-[500px]">
                       <AgentBehaviorStream events={events} />
                    </div>
                  </div>
                  
                  <div className="col-span-12 xl:col-span-4 flex flex-col">
                    <div className="flex-1 bg-bastion-navy border border-bastion-border rounded-xl p-10 shadow-xl flex flex-col">
                       <div className="flex items-center gap-3 mb-12 text-slate-500">
                         <div className="p-2 bg-bastion-sapphire/5 rounded-lg border border-bastion-sapphire/10">
                           <ShieldCheck size={16} className="text-bastion-sapphire" />
                         </div>
                         <span className="text-[11px] font-black uppercase tracking-[0.2em] leading-none">Audit Readiness Score</span>
                       </div>
                       
                       <div className="flex-1 flex flex-col">
                          <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-7xl font-light tracking-tighter text-white">94.2</span>
                            <span className="text-xs font-black text-bastion-green uppercase tracking-widest">+2.3% ▲</span>
                          </div>
                          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.25em] mb-12">Institutional Stability Index</p>
                          
                          <div className="space-y-8">
                            <AuditMetric label="Data Forensic Trace" value={98} />
                            <AuditMetric label="Identity Verifiability" value={91} />
                            <AuditMetric label="Model Drift Threshold" value={95} />
                          </div>
                       </div>

                       <button className="mt-12 w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.2em] italic">
                         Generate OSFI Audit Pack
                       </button>
                    </div>
                  </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-bastion-border to-transparent" />

                {/* TIER 3: Audit & Governance Zone */}
                <section id="tier-3" className="pt-12">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                      <div className="p-1.5 bg-slate-800 rounded">
                        <Activity size={14} className="text-bastion-sapphire" />
                      </div>
                      Regulatory Mapping Panel
                    </h2>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic">Updated: APR 28, 2026 19:12 UTC</span>
                  </div>
                  <RegulatoryMapping scores={COMPLIANCE_SCORES} onSelect={(f) => setSelectedFramework(f as any)} />
                </section>
              </div>
            ) : (
              <SystemHealthDashboard />
            )}
          </div>
          <Footer onSelect={setSelectedFramework} />
        </div>
      </main>

      <KillSwitchFlow isOpen={isKillSwitchOpen} onClose={() => setIsKillSwitchOpen(false)} />
      <Chat />
      <RegulatoryContent framework={selectedFramework} onClose={() => setSelectedFramework(null)} />
    </div>
  );
}

function Badge({ label, active }: { label: string, active?: boolean }) {
  return (
    <span className={`px-2 py-1 rounded text-[9px] font-bold tracking-[0.1em] border transition-all ${
      active 
      ? "bg-bastion-green/10 border-bastion-green/40 text-bastion-green" 
      : "bg-slate-800/40 border-slate-700 text-slate-500"
    }`}>
      {label}
    </span>
  );
}

function AuditMetric({ label, value }: { label: string, value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        <span>{label}</span>
        <span className="text-slate-300">{value}%</span>
      </div>
      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-bastion-sapphire rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

