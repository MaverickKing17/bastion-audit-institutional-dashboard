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
              relative p-6 rounded-xl border bg-gradient-to-br transition-all
              ${threat.severity === Severity.CRITICAL 
                ? 'border-bastion-crimson/30 from-bastion-crimson/5 to-transparent' 
                : 'border-bastion-gold/30 from-bastion-gold/5 to-transparent'}
            `}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="p-2 bg-bastion-navy rounded-lg border border-white/5">
                {threat.icon}
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-600 bg-black/20 px-2 py-0.5 rounded uppercase">{threat.time}</span>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-bold tracking-tight text-white uppercase italic">{threat.type}</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Scope: {threat.target}</p>
            </div>

            <div className="mt-8 flex gap-2">
              <button className={`
                flex-1 py-1.5 rounded font-black text-[9px] uppercase tracking-widest transition-all
                ${threat.severity === Severity.CRITICAL 
                  ? 'bg-bastion-crimson text-white hover:brightness-110' 
                  : 'bg-bastion-gold text-bastion-navy hover:brightness-110'}
              `}>
                ACKNOWLEDGE
              </button>
              <button className="px-3 py-1.5 bg-white/5 rounded border border-white/5 hover:bg-white/10 transition-colors">
                <ChevronRight size={12} className="text-slate-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
