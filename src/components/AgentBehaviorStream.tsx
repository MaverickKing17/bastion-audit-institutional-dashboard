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
    <div className="flex flex-col h-full bg-bastion-navy-light relative group/stream">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 bg-bastion-navy/20 pointer-events-none" />
      
      <div className="flex items-center justify-between px-6 py-5 border-b border-bastion-border bg-bastion-navy-light/95 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-bastion-sapphire/5 flex items-center justify-center border border-bastion-sapphire/10 shadow-sm text-bastion-sapphire">
            <Terminal size={14} />
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-white leading-none mb-1">Forensic Behavior Stream</span>
            <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Real-time LLM Activity Logs</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-bastion-navy border border-bastion-border">
             <span className="w-1.5 h-1.5 rounded-full bg-bastion-green animate-pulse shadow-[0_0_8px_rgba(31,169,113,0.4)]" />
             <span className="text-[10px] font-black text-bastion-green uppercase tracking-widest leading-none">Live</span>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest group/export">
            <Download size={13} className="group-hover/export:-translate-y-0.5 transition-transform" />
            <span className="border-b border-transparent group-hover/export:border-slate-500 font-mono">CSV Export</span>
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
                  "group relative border-b border-bastion-border/40 px-6 py-4 last:border-0 hover:bg-white/5 transition-all cursor-pointer",
                  isCritical ? "bg-bastion-crimson/[0.04]" : ""
                )}
                onMouseEnter={() => setHoveredEventId(event.id)}
                onMouseLeave={() => setHoveredEventId(null)}
              >
                {/* Critical Indicator side bar */}
                {isCritical && (
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-bastion-crimson shadow-[0_0_8px_rgba(229,72,77,0.3)]" />
                )}

                <div className="grid grid-cols-[100px_1fr_180px] gap-8 items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[var(--color-text-secondary)] font-bold tracking-tighter">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    <span className="text-[8px] text-[var(--color-text-muted)] font-black uppercase tracking-widest leading-none">
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
                      <span className="text-[var(--color-text-primary)] font-bold tracking-tight">
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
                          className="grid grid-cols-3 gap-6 text-[9px] text-[var(--color-text-muted)] border-t border-bastion-border/50 pt-3 mt-1"
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="text-slate-600 font-black tracking-widest uppercase">AGENT SOURCE</span>
                            <span className="text-[var(--color-text-primary)] uppercase font-bold">{event.sourceModel.replace('_', ' ')}</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-slate-600 font-black tracking-widest uppercase">PROBABILITY</span>
                            <span className={clsx(
                              "font-black",
                              event.confidence > 0.9 ? "text-bastion-green" : "text-bastion-gold"
                            )}>{(event.confidence * 100).toFixed(2)}%</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-slate-600 font-black tracking-widest uppercase">FORENSIC HASH</span>
                            <span className="text-[var(--color-text-secondary)] break-all font-mono font-bold">BA-{event.id.toUpperCase().slice(0, 12)}</span>
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
                          className="p-1.5 hover:bg-bastion-navy rounded transition-colors text-slate-500 hover:text-white"
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

      <div className="px-6 py-4 flex items-center justify-between text-[10px] text-[var(--color-text-muted)] border-t border-bastion-border bg-bastion-navy/40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-black uppercase">Active Stream</span>
            <span className="text-slate-500 font-black tracking-tighter">NODE_423_SEC</span>
          </div>
          <div className="flex gap-4 border-l border-bastion-border pl-6">
             <span className="flex items-center gap-1.5 font-bold text-slate-400"><span className="w-1 h-1 rounded-full bg-bastion-crimson" /> {events.filter(e => e.severity === Severity.CRITICAL).length} CRITICAL</span>
             <span className="flex items-center gap-1.5 font-bold text-slate-400"><span className="w-1 h-1 rounded-full bg-bastion-gold" /> {events.filter(e => e.severity === Severity.HIGH).length} RISK</span>
             <span className="flex items-center gap-1.5 font-bold text-slate-400"><span className="w-1 h-1 rounded-full bg-bastion-green" /> {events.filter(e => e.severity === Severity.SAFE).length} SECURE</span>
          </div>
        </div>
        <div className="flex items-center gap-4 group cursor-help">
          <Eye size={12} className="text-bastion-sapphire group-hover:scale-110 transition-transform" />
          <span className="font-black tracking-widest uppercase opacity-40">Sovereign Audit Ledger v4.1</span>
        </div>
      </div>
    </div>
  );
}

const clsx = (...classes: string[]) => classes.filter(Boolean).join(' ');
