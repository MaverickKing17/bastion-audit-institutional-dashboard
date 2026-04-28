import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { AgentBehaviorStream } from './components/AgentBehaviorStream';
import { RegulatoryMapping } from './components/RegulatoryMapping';
import { CriticalZone } from './components/CriticalZone';
import { KillSwitchFlow } from './components/KillSwitchFlow';
import { SystemHealthDashboard } from './components/SystemHealthDashboard';
import { Footer } from './components/Footer';
import { Chat } from './components/Chat';
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
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 flex flex-col bg-[#0B1221] overflow-hidden">
        {/* Institutional TopNav */}
        <header className="h-16 border-b border-bastion-border px-8 flex items-center justify-between bg-bastion-navy z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-bastion-sapphire/10 rounded-lg border border-bastion-sapphire/20">
                {currentView === 'dashboard' ? <LayoutGrid size={16} className="text-bastion-sapphire" /> : <Activity size={16} className="text-bastion-sapphire" />}
              </div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-white">
                {currentView === 'dashboard' ? 'Security Audit' : 'System Health'}
              </h2>
            </div>
            
            <div className="h-4 w-px bg-bastion-border" />
            
            <div className="flex items-center gap-4">
              <div className="flex gap-0.5 h-3 items-end">
                {[3, 6, 4, 8, 5, 7, 4].map((h, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: h * 1.2 }} 
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.15 }}
                    className="w-0.5 bg-bastion-green/60 rounded-full" 
                  />
                ))}
              </div>
              <span className="text-[9px] font-bold text-bastion-green uppercase tracking-widest">Active Monitoring</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-bastion-sapphire transition-colors" size={14} />
              <input 
                type="text" 
                placeholder="Search logs..." 
                className="bg-black/20 border border-bastion-border rounded-lg pl-9 pr-4 py-1.5 text-[11px] font-medium w-56 focus:outline-none focus:border-bastion-sapphire focus:bg-black/40 transition-all text-slate-300"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsKillSwitchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-bastion-crimson border border-bastion-crimson/50 rounded-lg text-white font-black text-[9px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-bastion-crimson/20"
              >
                <Power size={12} />
                Kill-Switch
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
                <section id="tier-2" className="grid grid-cols-12 gap-8 h-[500px]">
                  <div className="col-span-8 flex flex-col">
                    <div className="flex-1 bg-bastion-navy-light border border-bastion-border rounded-xl p-6 shadow-2xl relative overflow-hidden">
                       <AgentBehaviorStream events={events} />
                    </div>
                  </div>
                  
                  <div className="col-span-4 space-y-6">
                    <div className="bg-bastion-navy-light border border-bastion-border rounded-xl p-6 shadow-xl h-full flex flex-col">
                       <div className="flex items-center gap-2 mb-6 text-slate-400">
                         <ShieldCheck size={16} />
                         <span className="text-xs font-black uppercase tracking-widest leading-none mt-0.5">Audit Readiness Score</span>
                       </div>
                       
                       <div className="flex-1 flex flex-col justify-center">
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-6xl font-light tracking-tighter text-white">94.2</span>
                          </div>
                          <p className="text-[11px] font-bold text-bastion-green uppercase tracking-[0.2em]">+2.3% THIS WEEK</p>
                          
                          <div className="mt-8 space-y-4">
                            <AuditMetric label="Data Forensic Trace" value={98} />
                            <AuditMetric label="Identity Verifiability" value={91} />
                            <AuditMetric label="Model Drift Threshold" value={95} />
                          </div>
                       </div>

                       <button className="mt-8 w-full py-3 bg-white/5 border border-white/5 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest italic">
                         Generate OSFI Audit Pack
                       </button>
                    </div>
                  </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-bastion-border to-transparent" />

                {/* TIER 3: Audit & Governance Zone */}
                <section id="tier-3">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                      <ShieldCheck size={16} />
                      Regulatory Mapping Panel
                    </h2>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Updated: APR 28, 2026 19:12 UTC</span>
                  </div>
                  <RegulatoryMapping scores={COMPLIANCE_SCORES} />
                </section>
              </div>
            ) : (
              <SystemHealthDashboard />
            )}
          </div>
          <Footer />
        </div>
      </main>

      <KillSwitchFlow isOpen={isKillSwitchOpen} onClose={() => setIsKillSwitchOpen(false)} />
      <Chat />
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

