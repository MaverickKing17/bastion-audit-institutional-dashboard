import { motion } from 'motion/react';
import { AlertCircle, Zap, ShieldAlert, Lock, UserX, ChevronRight } from 'lucide-react';
import { Severity } from '@/src/types';

const THREATS = [
  { id: 1, type: 'Prompt Injection Active', severity: Severity.CRITICAL, icon: <Zap className="text-bastion-crimson" />, target: 'Retail Banking Assistant', time: '12s ago' },
  { id: 2, type: 'PII Leak Attempt', severity: Severity.HIGH, icon: <UserX className="text-bastion-gold" />, target: 'Fraud Detection Agent', time: '45s ago' },
  { id: 3, type: 'Compliance Breach', severity: Severity.CRITICAL, icon: <ShieldAlert className="text-bastion-crimson" />, target: 'Global Enterprise Core', time: '1m ago' },
];

export function CriticalZone() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="label-xs text-bastion-crimson flex items-center gap-2.5">
          <AlertCircle size={14} className="animate-pulse" />
          Critical Alert Zone
        </h2>
        <div className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.25em]">
          Priority Tier 1 // OSFI Mandate Required
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {THREATS.map((threat) => (
          <motion.div
            key={threat.id}
            whileHover={{ y: -2 }}
            className={`
              relative p-6 rounded-xl border bg-bastion-navy-light transition-all
              ${threat.severity === Severity.CRITICAL 
                ? 'border-bastion-crimson/20 shadow-lg shadow-bastion-crimson/5' 
                : 'border-bastion-gold/20 shadow-lg shadow-bastion-gold/5'}
            `}
          >
            <div className="flex justify-between items-center mb-6">
              <div className={`p-2 rounded-lg bg-bastion-navy border ${threat.severity === Severity.CRITICAL ? 'border-bastion-crimson/20' : 'border-bastion-gold/20'}`}>
                {threat.icon}
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">{threat.time}</span>
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-[13px] font-black tracking-wider text-slate-900 uppercase">{threat.type}</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.1em] flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                SCOPE: {threat.target}
              </p>
            </div>

            <div className="mt-8 flex gap-2">
              <button className={`
                flex-1 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] transition-all border
                ${threat.severity === Severity.CRITICAL 
                  ? 'bg-bastion-crimson/10 border-bastion-crimson/30 text-bastion-crimson hover:bg-bastion-crimson hover:text-white' 
                  : 'bg-bastion-gold/10 border-bastion-gold/30 text-bastion-gold hover:bg-bastion-gold hover:text-bastion-navy'}
              `}>
                Acknowledge Threat
              </button>
              <button className="px-4 py-2.5 bg-bastion-navy border border-bastion-border rounded-lg hover:border-slate-500 transition-colors">
                <ChevronRight size={14} className="text-slate-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
