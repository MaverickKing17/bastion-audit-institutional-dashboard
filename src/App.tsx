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
    <div className="flex h-screen overflow-hidden font-sans bg-bastion-navy text-[var(--color-text-primary)]">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} onSelectFramework={setSelectedFramework} />
      
      <main className="flex-1 flex flex-col bg-bastion-navy overflow-hidden">
        {/* Institutional TopNav */}
        <header className="h-16 border-b border-bastion-border px-10 flex items-center justify-between bg-bastion-navy-light/80 backdrop-blur-xl z-20 sticky top-0">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-9 h-9 bg-bastion-navy border border-bastion-border rounded-xl flex items-center justify-center shadow-2xl group-hover:border-bastion-sapphire/50 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-bastion-sapphire/10 to-transparent opacity-50" />
                <ShieldCheck size={18} className="text-bastion-sapphire relative z-10" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[11px] font-black uppercase tracking-[0.4em] text-white leading-none mb-1 group-hover:text-bastion-sapphire transition-colors">Bastion</h1>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-bastion-green animate-pulse" />
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">Security OS v4.1</p>
                </div>
              </div>
            </div>
            
            <div className="h-6 w-px bg-bastion-border" />
            
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1.5 font-mono">Integrity Layer</span>
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5 h-3 items-end">
                    {[3, 6, 4, 8, 5, 7, 4].map((h, i) => (
                      <motion.div 
                        key={i} 
                        animate={{ height: [h, (h * 1.8) % 12, h] }} 
                        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.1, ease: "easeInOut" }}
                        className="w-0.5 bg-bastion-green/40 rounded-sm" 
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-bastion-green/5 border border-bastion-green/20">
                    <span className="text-[8px] font-black text-bastion-green uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>

               <div className="hidden lg:flex flex-col">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1.5 font-mono">Quantum Entropy</span>
                <div className="flex items-center gap-2">
                   <div className="h-1 w-20 bg-bastion-navy rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        animate={{ x: ['-100%', '100%'] }} 
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="h-full w-1/2 bg-gradient-to-r from-transparent via-bastion-sapphire/50 to-transparent" 
                      />
                   </div>
                   <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">99.9%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
             <div className="hidden xl:flex items-center gap-8 pr-8 border-r border-bastion-border">
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Threat Level</p>
                  <p className="text-[11px] font-bold text-bastion-green uppercase tracking-widest font-mono">Normal // 0.04%</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Active Nodes</p>
                  <p className="text-[11px] font-bold text-white uppercase tracking-widest font-mono">12/12 Verified</p>
                </div>
             </div>

            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-bastion-sapphire transition-colors" size={13} />
              <input 
                type="text" 
                placeholder="Search institutional logs..." 
                className="bg-bastion-navy border border-bastion-border rounded-xl pl-10 pr-12 py-2 text-[10px] font-medium w-72 focus:outline-none focus:border-bastion-sapphire transition-all text-white placeholder:text-slate-700 placeholder:uppercase placeholder:tracking-[0.15em] shadow-inner shadow-black/20"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-bastion-border bg-bastion-navy-light text-[8px] font-black text-slate-600 tracking-tighter opacity-0 group-focus-within:opacity-100 transition-opacity">
                ⌘K
              </div>
            </div>
            
            <div className="flex items-center gap-5">
              <button 
                onClick={() => setIsKillSwitchOpen(true)}
                className="group relative flex items-center gap-3 px-5 py-2.5 bg-bastion-navy border border-bastion-crimson/30 rounded-xl transition-all hover:bg-bastion-crimson/5 hover:border-bastion-crimson overflow-hidden active:scale-95"
              >
                <div className="absolute inset-0 bg-bastion-crimson opacity-0 group-hover:opacity-[0.03] transition-opacity" />
                <Power size={14} className="text-bastion-crimson group-hover:scale-110 transition-transform" />
                <span className="text-white font-black text-[9px] uppercase tracking-[0.25em] relative z-10">Safety Override</span>
                <div className="w-1.5 h-1.5 rounded-full bg-bastion-crimson animate-pulse shadow-[0_0_8px_rgba(229,72,77,0.4)]" />
              </button>
              
              <div className="h-6 w-px bg-bastion-border" />

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] font-black text-white leading-none mb-1 tracking-tight">C. Arbuthnot</p>
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] text-bastion-sapphire uppercase font-black tracking-widest mb-0.5">L7 Clearance</span>
                    <span className="text-[8px] text-slate-600 uppercase font-bold tracking-widest">Audit Principal</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-bastion-navy border border-bastion-border flex items-center justify-center cursor-pointer hover:border-bastion-sapphire/50 transition-all transition-all relative group shadow-2xl">
                  <UserCircle size={20} className="text-slate-500 group-hover:text-white transition-colors" />
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-bastion-navy border border-bastion-border rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-bastion-green shadow-[0_0_8px_rgba(31,169,113,0.4)]" />
                  </div>
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

                <div className="h-px bg-bastion-border-dim" />

                {/* TIER 2: Analyst Operational Zone */}
                <section id="tier-2" className="grid grid-cols-12 gap-8 min-h-[600px]">
                  <div className="col-span-12 xl:col-span-8 flex flex-col">
                    <div className="flex-1 bg-bastion-surface border border-bastion-border rounded-xl shadow-2xl relative overflow-hidden min-h-[500px]">
                       <AgentBehaviorStream events={events} />
                    </div>
                  </div>
                  
                  <div className="col-span-12 xl:col-span-4 flex flex-col">
                    <div className="flex-1 bg-bastion-surface border border-bastion-border rounded-xl p-10 shadow-xl flex flex-col">
                       <div className="flex items-center gap-3 mb-12 text-[var(--color-text-muted)]">
                         <div className="p-2 bg-bastion-sapphire/5 rounded-lg border border-bastion-sapphire/10">
                           <ShieldCheck size={16} className="text-bastion-sapphire" />
                         </div>
                         <span className="text-[11px] font-black uppercase tracking-[0.2em] leading-none text-[var(--color-text-primary)]">Audit Readiness Score</span>
                       </div>
                       
                       <div className="flex-1 flex flex-col">
                          <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-7xl font-light tracking-tighter text-[var(--color-text-primary)]">94.2</span>
                            <span className="text-xs font-black text-bastion-green uppercase tracking-widest">+2.3% ▲</span>
                          </div>
                          <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-[0.25em] mb-12">Institutional Stability Index</p>
                          
                          <div className="space-y-8">
                            <AuditMetric label="Data Forensic Trace" value={98} />
                            <AuditMetric label="Identity Verifiability" value={91} />
                            <AuditMetric label="Model Drift Threshold" value={95} />
                          </div>
                       </div>

                       <button className="mt-12 w-full py-4 bg-bastion-navy border border-bastion-border rounded-xl text-[10px] font-black text-[var(--color-text-secondary)] hover:text-white hover:bg-bastion-navy-light transition-all uppercase tracking-[0.2em] italic">
                         Generate OSFI Audit Pack
                       </button>
                    </div>
                  </div>
                </section>

                <div className="h-px bg-bastion-border-dim" />

                {/* TIER 3: Audit & Governance Zone */}
                <section id="tier-3" className="pt-12">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] flex items-center gap-3">
                      <div className="p-1.5 bg-bastion-navy-light rounded">
                        <Activity size={14} className="text-bastion-sapphire" />
                      </div>
                      Regulatory Mapping Panel
                    </h2>
                    <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest italic">Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()} 19:12 UTC</span>
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
        <span className="text-[var(--color-text-primary)] font-black">{value}%</span>
      </div>
      <div className="h-1 bg-bastion-navy rounded-full overflow-hidden">
        <div className="h-full bg-bastion-sapphire rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

