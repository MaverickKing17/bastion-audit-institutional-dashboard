import { motion } from 'motion/react';
import { AlertCircle, Zap, ShieldAlert, Lock, UserX } from 'lucide-react';
import { Severity } from '@/src/types';

const THREATS = [
  { id: 1, type: 'Prompt Injection Active', severity: Severity.CRITICAL, icon: <Zap className="text-bastion-crimson" />, target: 'Retail Banking Assistant', time: '12s ago' },
  { id: 2, type: 'PII Leak Attempt', severity: Severity.HIGH, icon: <UserX className="text-bastion-gold" />, target: 'Fraud Detection Agent', time: '45s ago' },
  { id: 3, type: 'Compliance Breach', severity: Severity.CRITICAL, icon: <ShieldAlert className="text-bastion-crimson" />, target: 'Global Enterprise Core', time: '1m ago' },
];

export function CriticalZone() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-bastion-crimson flex items-center gap-2">
          <AlertCircle size={18} />
          Executive Critical Zone
        </h2>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          3 Active Escalations • Priority Tier 1
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {THREATS.map((threat) => (
          <motion.div
            key={threat.id}
            whileHover={{ scale: 1.01 }}
            className={`
              relative p-6 rounded-xl border-2 bg-gradient-to-br transition-all
              ${threat.severity === Severity.CRITICAL 
                ? 'border-bastion-crimson/40 from-bastion-crimson/10 to-transparent shadow-[0_0_40px_-15px_rgba(175,41,47,0.3)]' 
                : 'border-bastion-gold/40 from-bastion-gold/10 to-transparent shadow-[0_0_40px_-15px_rgba(212,175,55,0.2)]'}
            `}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-bastion-navy rounded-lg border border-white/5">
                {threat.icon}
              </div>
              <span className="text-[10px] font-mono text-slate-500">{threat.time}</span>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-black tracking-tight text-white leading-none mb-2">{threat.type}</h3>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Target: {threat.target}</p>
            </div>

            <div className="mt-8 flex gap-2">
              <button className={`
                flex-1 py-2 rounded font-bold text-[10px] uppercase tracking-widest transition-all
                ${threat.severity === Severity.CRITICAL 
                  ? 'bg-bastion-crimson text-white hover:bg-bastion-crimson/80' 
                  : 'bg-bastion-gold text-bastion-navy hover:bg-bastion-gold/80'}
              `}>
                Authorize Mitigation
              </button>
              <button className="px-3 py-2 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors">
                <Lock size={14} className="text-slate-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
