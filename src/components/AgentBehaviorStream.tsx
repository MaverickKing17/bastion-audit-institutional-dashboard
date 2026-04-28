import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Eye, Download, Info } from 'lucide-react';
import { SecurityEvent, Severity } from '@/src/types';
import { SeverityBadge, RegulatoryBadge } from './Common';

interface StreamProps {
  events: SecurityEvent[];
}

export function AgentBehaviorStream({ events }: StreamProps) {
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  return (
    <div className="flex flex-col h-full bg-bastion-navy">
      <div className="flex items-center justify-between p-4 border-b border-bastion-border bg-bastion-navy-light/50">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-bastion-sapphire/10 rounded border border-bastion-sapphire/20">
            <Terminal size={14} className="text-bastion-sapphire" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Forensic Behavior Stream</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-bastion-green/10 border border-bastion-green/20">
             <span className="w-1.5 h-1.5 rounded-full bg-bastion-green animate-pulse" />
             <span className="text-[9px] font-black text-bastion-green uppercase tracking-widest leading-none">Live</span>
          </div>
          <button className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
            <Download size={12} />
            <span>CSV Export</span>
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto custom-scrollbar font-mono text-[12px] leading-relaxed"
      >
        <AnimatePresence initial={false}>
          {events.map((event) => (
            <motion.div
              layout
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="group relative border-b border-white/[0.03] py-3 last:border-0 hover:bg-white/[0.02] transition-colors"
              onMouseEnter={() => setHoveredEventId(event.id)}
              onMouseLeave={() => setHoveredEventId(null)}
            >
              <div className="grid grid-cols-[110px_1fr_100px] gap-6 items-start">
                <span className="text-slate-600 font-bold">[{new Date(event.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-start gap-4">
                    <span className={clsx(
                      "font-black uppercase text-[10px] tracking-widest whitespace-nowrap mt-1",
                      event.severity === Severity.CRITICAL ? "text-bastion-crimson" :
                      event.severity === Severity.HIGH ? "text-bastion-gold" :
                      event.severity === Severity.MEDIUM ? "text-bastion-sapphire" : "text-bastion-green"
                    )}>
                      {event.type}
                    </span>
                    <span className="text-slate-300 font-medium">{event.message}</span>
                  </div>
                  
                  {hoveredEventId === event.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 grid grid-cols-2 gap-x-8 gap-y-1 text-[11px] text-slate-500 border-t border-white/5 pt-2"
                    >
                      <div className="flex justify-between">
                        <span className="text-slate-600">SOURCE:</span>
                        <span>{event.sourceModel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">CONFIDENCE:</span>
                        <span className="text-bastion-green">{(event.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">REGULATORY:</span>
                        <span className="text-slate-400 font-bold">{event.regulatoryCode || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">FORENSIC ID:</span>
                        <span className="text-slate-400">{event.id.slice(0, 8)}...</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  {event.regulatoryCode && <RegulatoryBadge code={event.regulatoryCode} />}
                  <SeverityBadge severity={event.severity} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex space-x-4">
          <span>MONITOR: 423</span>
          <span>CHECK: {events.filter(e => e.severity === Severity.HIGH).length}</span>
          <span>OK: {events.filter(e => e.severity === Severity.SAFE).length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye size={12} className="text-bastion-sapphire" />
          <span>REAL-TIME AUDIT LOG ENABLED</span>
        </div>
      </div>
    </div>
  );
}

const clsx = (...classes: string[]) => classes.filter(Boolean).join(' ');
