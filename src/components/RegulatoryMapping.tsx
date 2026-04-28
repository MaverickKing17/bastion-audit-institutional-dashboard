import { ShieldCheck, Calendar, Activity, ChevronRight } from 'lucide-react';
import { Card } from './Common';
import { ComplianceScore } from '@/src/types';

interface RegulatoryProps {
  scores: ComplianceScore[];
}

export function RegulatoryMapping({ scores }: RegulatoryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {scores.map((score) => (
        <Card key={score.framework} className="group cursor-pointer hover:border-bastion-sapphire/50 transition-all">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-slate-800 rounded">
                  <ShieldCheck size={16} className={
                    score.status === 'COMPLIANT' ? "text-bastion-green" : 
                    score.status === 'UNDER REVIEW' ? "text-bastion-gold" : "text-bastion-crimson"
                  } />
                </div>
                <span className="font-bold text-lg tracking-tight">{score.framework}</span>
              </div>
              <span className={clsx(
                "text-[10px] font-bold px-1.5 py-0.5 rounded border",
                score.status === 'COMPLIANT' ? "border-bastion-green/30 text-bastion-green/80" : 
                score.status === 'UNDER REVIEW' ? "border-bastion-gold/30 text-bastion-gold/80" : "border-bastion-crimson/30 text-bastion-crimson/80"
              )}>
                {score.status}
              </span>
            </div>
            
            <div className="flex-1 flex flex-col justify-center py-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-light tracking-tighter">{score.score}%</span>
                <span className="text-xs text-bastion-green font-medium">+2.1%</span>
              </div>
              <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                <div 
                  className={clsx(
                    "h-full rounded-full transition-all duration-1000",
                    score.score > 90 ? "bg-bastion-green" : score.score > 70 ? "bg-bastion-gold" : "bg-bastion-crimson"
                  )} 
                  style={{ width: `${score.score}%` }} 
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-bastion-border flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>LAST AUDIT: {score.lastAudit}</span>
              </div>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

const clsx = (...classes: string[]) => classes.filter(Boolean).join(' ');
