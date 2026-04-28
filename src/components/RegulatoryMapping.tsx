import { ShieldCheck, Calendar, Activity, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from './Common';
import { ComplianceScore } from '@/src/types';

interface RegulatoryProps {
  scores: ComplianceScore[];
}

export function RegulatoryMapping({ scores }: RegulatoryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {scores.map((score) => (
        <div key={score.framework} className="institutional-card p-6 group cursor-pointer hover:border-bastion-sapphire/30 transition-all flex flex-col bg-bastion-navy shadow-xl">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-bastion-navy-light rounded-lg border border-bastion-border">
                  <ShieldCheck size={16} className={
                    score.status === 'COMPLIANT' ? "text-bastion-green" : 
                    score.status === 'UNDER REVIEW' ? "text-bastion-gold" : "text-bastion-crimson"
                  } />
                </div>
                <span className="font-black text-xs text-white uppercase tracking-widest">{score.framework}</span>
              </div>
              <span className={clsx(
                "text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-widest",
                score.status === 'COMPLIANT' ? "border-bastion-green/20 text-bastion-green bg-bastion-green/5" : 
                score.status === 'UNDER REVIEW' ? "border-bastion-gold/20 text-bastion-gold bg-bastion-gold/5" : "border-bastion-crimson/20 text-bastion-crimson bg-bastion-crimson/5"
              )}>
                {score.status}
              </span>
            </div>
            
            <div className="flex-1 flex flex-col justify-center mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-light tracking-tighter text-white">{score.score}%</span>
                <span className="text-xs text-bastion-green font-black uppercase tracking-widest">+2.1%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 mt-6 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${score.score}%` }}
                  className={clsx(
                    "h-full rounded-full transition-all duration-1000",
                    score.score > 90 ? "bg-bastion-green" : score.score > 70 ? "bg-bastion-gold" : "bg-bastion-crimson"
                  )} 
                />
              </div>
            </div>

            <div className="pt-6 border-t border-bastion-border flex items-center justify-between text-[10px] font-bold text-slate-600">
              <div className="flex items-center gap-2 uppercase tracking-widest">
                <Calendar size={12} className="opacity-50" />
                <span>Last Audit: {score.lastAudit}</span>
              </div>
              <ChevronRight size={14} className="group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const clsx = (...classes: string[]) => classes.filter(Boolean).join(' ');
