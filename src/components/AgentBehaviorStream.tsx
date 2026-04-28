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
    <div className="flex flex-col h-full bg-bastion-navy relative group/stream">
      {/* Absolute Glow Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(74,144,226,0.03),transparent)] pointer-events-none" />
      
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.05] bg-bastion-navy-light/30 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-bastion-sapphire/10 flex items-center justify-center border border-bastion-sapphire/20 shadow-inner">
            <Terminal size={14} className="text-bastion-sapphire" />
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-white leading-none mb-1">Forensic Behavior Stream</span>
            <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest">Real-time LLM Activity Logs</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-bastion-green/5 border border-bastion-green/20">
             <span className="w-1.5 h-1.5 rounded-full bg-bastion-green animate-pulse shadow-[0_0_8px_#2ecc71]" />
             <span className="text-[10px] font-black text-bastion-green uppercase tracking-widest leading-none">Live</span>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest group/export">
            <Download size={13} className="group-hover/export:-translate-y-0.5 transition-transform" />
            <span className="border-b border-transparent group-hover/export:border-slate-500">CSV Export</span>
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-0 overflow-y-auto custom-scrollbar font-mono text-[11px] leading-relaxed relative z-10"
      >
        <AnimatePresence initial={false}>
          {events.map((event, idx) => {
            const isCritical = event.severity === Severity.CRITICAL;
            return (
              <motion.div
                layout
                key={event.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={clsx(
                  "group relative border-b border-white/[0.03] px-6 py-4 last:border-0 hover:bg-white/[0.03] transition-all cursor-pointer",
                  isCritical ? "bg-bastion-crimson/[0.02]" : ""
                )}
                onMouseEnter={() => setHoveredEventId(event.id)}
                onMouseLeave={() => setHoveredEventId(null)}
              >
                {/* Critical Indicator side bar */}
                {isCritical && (
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-bastion-crimson shadow-[0_0_8px_rgba(231,76,60,0.5)]" />
                )}

                <div className="grid grid-cols-[100px_1fr_180px] gap-8 items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-600 font-black tracking-tighter opacity-60">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    <span className="text-[8px] text-slate-700 font-bold uppercase tracking-widest">
                      SEQ: {2400 + idx}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className={clsx(
                        "font-black uppercase text-[10px] tracking-widest whitespace-nowrap",
                        event.severity === Severity.CRITICAL ? "text-bastion-crimson" :
                        event.severity === Severity.HIGH ? "text-bastion-gold" :
                        event.severity === Severity.MEDIUM ? "text-bastion-sapphire" : "text-bastion-green"
                      )}>
                        {event.type}
                      </span>
                      <span className="text-slate-300 font-medium tracking-tight">
                        {event.message}
                      </span>
                    </div>
                    
                    {/* Collapsible/Hover metadata */}
                    <AnimatePresence>
                      {hoveredEventId === event.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0, y: -5 }} 
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -5 }}
                          className="grid grid-cols-3 gap-6 text-[9px] text-slate-500 border-t border-white/5 pt-3 mt-1"
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="text-slate-600 font-black tracking-widest">AGENT SOURCE</span>
                            <span className="text-slate-400 uppercase">{event.sourceModel.replace('_', ' ')}</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-slate-600 font-black tracking-widest">PROBABILITY</span>
                            <span className={clsx(
                              "font-bold",
                              event.confidence > 0.9 ? "text-bastion-green" : "text-bastion-gold"
                            )}>{(event.confidence * 100).toFixed(2)}%</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-slate-600 font-black tracking-widest">FORENSIC HASH</span>
                            <span className="text-slate-500/80 break-all family-mono">BA-{event.id.toUpperCase()}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-end items-center gap-3">
                    <AnimatePresence>
                      {hoveredEventId === event.id && (
                        <motion.button
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="p-1.5 hover:bg-white/10 rounded transition-colors text-slate-500 hover:text-white"
                          title="View Raw JSON"
                        >
                          <Info size={14} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                    <div className="flex gap-2 shrink-0">
                      {event.regulatoryCode && <RegulatoryBadge code={event.regulatoryCode} />}
                      <SeverityBadge severity={event.severity} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="px-6 py-4 flex items-center justify-between text-[10px] text-slate-500 border-t border-white/[0.03] bg-bastion-navy-light/10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-slate-700 font-black uppercase">Active Stream</span>
            <span className="text-slate-400 font-bold tracking-tighter">NODE_423_SEC</span>
          </div>
          <div className="flex gap-4 border-l border-white/5 pl-6">
             <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-bastion-crimson" /> {events.filter(e => e.severity === Severity.CRITICAL).length} CRITICAL</span>
             <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-bastion-gold" /> {events.filter(e => e.severity === Severity.HIGH).length} RISK</span>
             <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-bastion-green" /> {events.filter(e => e.severity === Severity.SAFE).length} SECURE</span>
          </div>
        </div>
        <div className="flex items-center gap-4 group cursor-help">
          <Eye size={12} className="text-bastion-sapphire group-hover:scale-110 transition-transform" />
          <span className="font-bold tracking-widest uppercase opacity-60">Sovereign Audit Ledger v4.1</span>
        </div>
      </div>
    </div>
  );
}

const clsx = (...classes: string[]) => classes.filter(Boolean).join(' ');
