import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Server, Database, Shield, Zap, Clock, AlertTriangle, CheckCircle2, ChevronRight, BarChart3, RefreshCcw, Download } from 'lucide-react';
import { ComponentHealth, HealthMetric } from '@/src/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from './Common';
import { clsx } from 'clsx';

const INITIAL_COMPONENTS: ComponentHealth[] = [
  { name: 'Canadian Edge Gateway', status: 'OPERATIONAL', uptime: '99.98%', latency: 12, cpu: 15, memory: 28, lastPulse: 'Now', type: 'GATEWAY' },
  { name: 'Lakera Guard', status: 'OPERATIONAL', uptime: '99.99%', latency: 8, cpu: 12, memory: 34, lastPulse: 'Now', type: 'SECURITY' },
  { name: 'Encryption Vault', status: 'OPERATIONAL', uptime: '99.99%', latency: 15, cpu: 18, memory: 45, lastPulse: 'Now', type: 'VAULT' },
  { name: 'Agent Monitor', status: 'OPERATIONAL', uptime: '100%', latency: 42, cpu: 7, memory: 15, lastPulse: 'Now', type: 'MONITOR' },
  { name: 'Firestore DB', status: 'OPERATIONAL', uptime: '99.98%', latency: 6, cpu: 20, memory: 58, lastPulse: 'Now', type: 'DATA' },
];

const INCIDENT_LOGS = [
  { time: '2026-04-28 14:12:01', comp: 'Encryption Vault', event: 'Token exhaustion warning on cluster-C', sev: 'HIGH', ref: 'HW-902' },
  { time: '2026-04-28 11:45:22', comp: 'Firestore DB', event: 'Primary write-sharding rebalance', sev: 'MEDIUM', ref: 'DB-441' },
  { time: '2026-04-28 09:20:11', comp: 'Lakera Guard', event: 'Hardware-level bypass lock enabled', sev: 'CRITICAL', ref: 'SCR-110' },
];

function ConnectionLine({ 
  status, 
  latency, 
  className 
}: { 
  status: ComponentHealth['status'], 
  latency: number,
  className?: string 
}) {
  const isOnline = status !== 'OUTAGE';
  const isDegraded = status === 'DEGRADED';
  const isHighLatency = latency > 30;
  
  const strokeColor = !isOnline ? '#ef4444' : (isDegraded || isHighLatency) ? '#d4af37' : '#2ecc71';
  const pulseDuration = !isOnline ? 0 : Math.max(0.3, latency / 50);

  return (
    <svg className={`absolute inset-0 w-8 h-full -left-4 pointer-events-none z-0 ${className}`}>
      <motion.path
        d="M 16 0 L 16 48" // matches the container h-12 (48px)
        stroke={strokeColor}
        strokeWidth={isHighLatency ? "3" : "2"}
        strokeDasharray={isHighLatency ? "2 2" : "4 4"}
        fill="transparent"
        initial={{ opacity: 0.1 }}
        animate={{ 
          opacity: isOnline ? [0.1, 0.4, 0.1] : 0.05,
          x: isHighLatency ? [0.5, -0.5, 0.5] : 0
        }}
        transition={{ 
          opacity: { duration: 2, repeat: Infinity },
          x: { duration: 0.1, repeat: Infinity, ease: "linear" }
        }}
      />
      {isOnline && (
        <motion.circle
          r={isHighLatency ? "4" : "3"}
          fill={strokeColor}
          initial={{ cy: 0 }}
          animate={{ cy: 48 }}
          transition={{ 
            duration: pulseDuration, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ cx: 16 }}
          className="filter blur-[1px]"
        />
      )}
    </svg>
  );
}

function ComponentStatusBadge({ status }: { status: ComponentHealth['status'] }) {
  const configs = {
    OPERATIONAL: {
      color: 'text-bastion-green',
      bg: 'bg-bastion-green/10',
      border: 'border-bastion-green/20',
      icon: <CheckCircle2 size={12} />,
    },
    DEGRADED: {
      color: 'text-bastion-gold',
      bg: 'bg-bastion-gold/10',
      border: 'border-bastion-gold/20',
      icon: <AlertTriangle size={12} />,
    },
    OUTAGE: {
      color: 'text-bastion-crimson',
      bg: 'bg-bastion-crimson/10',
      border: 'border-bastion-crimson/20',
      icon: <Zap size={12} />,
    }
  };

  const config = configs[status];

  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded border ${config.bg} ${config.border} ${config.color}`}>
      {config.icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{status}</span>
    </div>
  );
}

export function SystemHealthDashboard() {
  const [components, setComponents] = useState<ComponentHealth[]>(INITIAL_COMPONENTS);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const [hoveredCompFromLog, setHoveredCompFromLog] = useState<string | null>(null);
  const [latencyData, setLatencyData] = useState<HealthMetric[]>(() => 
    Array.from({ length: 20 }, (_, i) => ({
      timestamp: `${i}:00`,
      value: 15 + Math.random() * 10
    }))
  );
  const [lastTick, setLastTick] = useState(Date.now());

  const simulateUpdate = useCallback(() => {
    // Update Components
    setComponents(prev => prev.map(comp => {
      // Jitter metrics
      const newCpu = Math.max(2, Math.min(98, comp.cpu + (Math.random() * 4 - 2)));
      const newMemory = Math.max(5, Math.min(95, comp.memory + (Math.random() * 2 - 1)));
      const newLatency = Math.max(2, comp.latency + (Math.random() * 6 - 3));
      
      // Randomly change status (very low probability)
      let newStatus = comp.status;
      const rand = Math.random();
      if (rand > 0.99) {
        newStatus = rand > 0.997 ? 'OUTAGE' : 'DEGRADED';
      } else if (rand < 0.1 && (comp.status === 'DEGRADED' || comp.status === 'OUTAGE')) {
        newStatus = 'OPERATIONAL';
      }

      return {
        ...comp,
        cpu: Math.round(newCpu),
        memory: Math.round(newMemory),
        latency: Math.round(newLatency),
        status: newStatus,
        lastPulse: 'Now'
      };
    }));

    // Update Latency Data (Scrolling graph effect)
    setLatencyData(prev => {
      const lastPoint = prev[prev.length - 1];
      const newValue = Math.max(10, Math.min(100, lastPoint.value + (Math.random() * 10 - 5)));
      const newTimestamp = new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' });
      
      const newArr = [...prev.slice(1), { timestamp: newTimestamp, value: Math.round(newValue) }];
      return newArr;
    });

    setLastTick(Date.now());
  }, []);

  useEffect(() => {
    const interval = setInterval(simulateUpdate, 3000);
    return () => clearInterval(interval);
  }, [simulateUpdate]);

  const handleExportLogs = () => {
    const headers = ['Timestamp', 'Component', 'Event Description', 'Severity', 'Reference'];
    const csvContent = [
      headers.join(','),
      ...INCIDENT_LOGS.map(log => [
        `"${log.time}"`,
        `"${log.comp}"`,
        `"${log.event}"`,
        `"${log.sev}"`,
        `"SYS-${log.ref}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `hardware_interruption_log_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const avgLatency = Math.round(components.reduce((acc, c) => acc + c.latency, 0) / components.length);
  const activeNodes = components.filter(c => c.status !== 'OUTAGE').length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Global System Uptime" 
          value="99.998%" 
          trend="+0.002%" 
          icon={<Clock className="text-bastion-green" size={20} />} 
        />
        <StatCard 
          label="Average Request Latency" 
          value={`${avgLatency}ms`} 
          trend={avgLatency > 30 ? "+2.4ms" : "-1.2ms"} 
          icon={<Zap className={avgLatency > 50 ? "text-bastion-crimson" : avgLatency > 30 ? "text-bastion-gold" : "text-bastion-green"} size={20} />} 
        />
        <StatCard 
          label="Active Infrastructure Nodes" 
          value={`${activeNodes}/${components.length}`} 
          status={activeNodes === components.length ? "HEALTHY" : "CRITICAL"}
          icon={<Server className={activeNodes === components.length ? "text-bastion-sapphire" : "text-bastion-crimson"} size={20} />} 
        />
      </div>

      {/* Main Grid: Topology + Performance */}
      <div className="grid grid-cols-12 gap-8">
        {/* Hardware Status Nodes */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
              <Activity size={14} />
              Resource Node Topology
            </h2>
            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
              <RefreshCcw size={10} className="animate-spin-slow" />
              Live Simulation Frequency: 3.0s
            </div>
          </div>
          
          <div className="relative space-y-12">
            {components.map((node, index) => (
              <div key={node.name} className="relative">
                {index < components.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full h-12 w-px overflow-visible">
                    <ConnectionLine 
                      status={node.status} 
                      latency={node.latency} 
                    />
                  </div>
                )}
                <NodeCard 
                  node={node} 
                  isExpanded={expandedNode === node.name}
                  isCorrelated={hoveredCompFromLog === node.name}
                  hasIncident={INCIDENT_LOGS.some(log => log.comp === node.name && log.sev === 'CRITICAL' || log.sev === 'HIGH')}
                  onClick={() => setExpandedNode(expandedNode === node.name ? null : node.name)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Global Latency Chart */}
        <div className="col-span-12 lg:col-span-7">
          <Card 
            title="System Latency Matrix (ms)" 
            subtitle="Real-time performance across sovereign clusters"
          >
            <div className="h-[340px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={latencyData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis 
                    dataKey="timestamp" 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `${val}ms`}
                    domain={[0, 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#161F30', border: '1px solid #1E293B', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#F1F5F9' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4A90E2" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    strokeWidth={2}
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 border-t border-bastion-border pt-4">
              <div className="flex gap-4">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-bastion-sapphire" /> Institutional Pulse</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-700" /> Latency Floor</span>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
                Last Sync: {new Date(lastTick).toLocaleTimeString()}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Internal System Incident Log */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <AlertTriangle size={16} className="text-bastion-gold" />
             <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Hardware Interruption Log (Last 24H)</h2>
          </div>
          <button 
            onClick={handleExportLogs}
            className="flex items-center gap-2 px-3 py-1.5 bg-bastion-navy border border-bastion-border rounded-lg text-[10px] font-black text-slate-400 hover:text-white hover:border-slate-500 transition-all uppercase tracking-widest italic"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
        <div className="institutional-card overflow-hidden">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-bastion-navy/50 border-b border-bastion-border text-slate-500 uppercase tracking-widest font-black">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Component</th>
                <th className="px-6 py-4">Event Description</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4 text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {INCIDENT_LOGS.map((log, i) => (
                <tr 
                  key={i} 
                  className={clsx(
                    "hover:bg-white/5 transition-colors cursor-default",
                    hoveredCompFromLog === log.comp ? "bg-bastion-sapphire/5" : ""
                  )}
                  onMouseEnter={() => setHoveredCompFromLog(log.comp)}
                  onMouseLeave={() => setHoveredCompFromLog(null)}
                >
                  <td className="px-6 py-4 font-normal text-slate-500">{log.time}</td>
                  <td className="px-6 py-4 font-bold text-white uppercase">{log.comp}</td>
                  <td className="px-6 py-4 text-slate-400">{log.event}</td>
                  <td className="px-6 py-4">
                    <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${
                      log.sev === 'CRITICAL' ? 'border-bastion-crimson/30 text-bastion-crimson' :
                      log.sev === 'HIGH' ? 'border-bastion-gold/30 text-bastion-gold' : 'border-bastion-sapphire/30 text-bastion-sapphire'
                    }`}>
                      {log.sev}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600 uppercase">SYS-{log.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function NodeCard({ node, isExpanded, isCorrelated, hasIncident, onClick }: { 
  node: ComponentHealth, 
  isExpanded: boolean, 
  isCorrelated?: boolean,
  hasIncident?: boolean,
  onClick: () => void 
}) {
  const statusColors = {
    OPERATIONAL: { border: 'border-bastion-green/20', iconColor: 'text-bastion-green', shadow: 'shadow-[0_0_15px_rgba(46,204,113,0.1)]' },
    DEGRADED: { border: 'border-bastion-gold/20', iconColor: 'text-bastion-gold', shadow: 'shadow-[0_0_15px_rgba(212,175,55,0.1)]' },
    OUTAGE: { border: 'border-bastion-crimson/20', iconColor: 'text-bastion-crimson', shadow: 'shadow-[0_0_15px_rgba(175,41,47,0.1)]' }
  };

  const currentStatus = statusColors[node.status];

  return (
    <motion.div 
      layout
      onClick={onClick}
      animate={{ 
        scale: isCorrelated ? 1.02 : 1,
        borderColor: isCorrelated ? 'rgba(74, 144, 226, 0.5)' : undefined
      }}
      className={clsx(
        "institutional-card p-5 group hover:border-bastion-sapphire/30 transition-all cursor-pointer relative overflow-hidden",
        currentStatus.shadow,
        isExpanded ? 'ring-1 ring-bastion-sapphire/50 bg-bastion-navy-light' : '',
        isCorrelated ? 'border-bastion-sapphire bg-bastion-sapphire/5 shadow-[0_0_20px_rgba(74,144,226,0.15)]' : '',
        hasIncident && !isCorrelated ? 'border-bastion-gold/10' : ''
      )}
    >
      {hasIncident && (
        <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bastion-gold/10 border border-bastion-gold/20 animate-pulse">
          <AlertTriangle size={8} className="text-bastion-gold" />
          <span className="text-[7px] font-black text-bastion-gold uppercase tracking-[0.2em]">Active Incident</span>
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <motion.div layout className={`p-2 rounded-lg bg-bastion-navy border ${currentStatus.border}`}>
            {node.name.includes('DB') ? <Database size={16} className={currentStatus.iconColor} /> : 
             node.name.includes('Guard') ? <Shield size={16} className={currentStatus.iconColor} /> : 
             node.name.includes('Gateway') ? <Zap size={16} className={currentStatus.iconColor} /> :
             <Server size={16} className={currentStatus.iconColor} />}
          </motion.div>
          <div>
            <motion.h3 layout className="text-sm font-black text-white uppercase tracking-tight">{node.name}</motion.h3>
            <motion.div layout className="flex items-center gap-2 mt-1">
              <ComponentStatusBadge status={node.status} />
            </motion.div>
          </div>
        </div>
        <div className="text-right">
          <motion.p layout className="text-xs font-mono font-bold text-white">{node.uptime}</motion.p>
          <motion.p layout className="text-[9px] text-slate-600 uppercase font-bold tracking-widest mt-0.5">UPTIME</motion.p>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
        <ResourceGauge label="CPU Usage" value={node.cpu} color="bg-bastion-sapphire" />
        <ResourceGauge label="RAM Load" value={node.memory} color="bg-bastion-gold" />
        <div className="space-y-1">
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Latency</p>
          <p className="text-xs font-mono font-bold text-slate-300">{node.latency}ms</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-6 mt-6 border-t border-white/5 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Provisioned Region</p>
                <p className="text-[11px] font-black text-white uppercase">ca-central-1 (Montreal)</p>
              </div>
              <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Encryption Mode</p>
                <p className="text-[11px] font-black text-bastion-green uppercase">FIPS 140-2 L3</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>Cluster Pulse Integrity</span>
                <span className="text-bastion-green">99.9%</span>
              </div>
              <div className="flex gap-1 h-1">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`flex-1 rounded-full ${i < 11 ? 'bg-bastion-green/40' : 'bg-bastion-crimson/40'}`} />
                ))}
              </div>
            </div>

            <button className="w-full py-2 bg-bastion-sapphire/10 hover:bg-bastion-sapphire/20 border border-bastion-sapphire/30 rounded-lg text-[9px] font-black text-bastion-sapphire uppercase tracking-[0.2em] transition-all">
              Initiate Full Forensic Diagnostic
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ResourceGauge({ label, value, color }: { label: string, value: number, color: string }) {
  const dynamicColor = value > 85 ? 'bg-bastion-crimson' : value > 70 ? 'bg-bastion-gold' : color;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-end">
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest font-mono">{label}</p>
        <span className="text-[10px] font-bold text-slate-400">{value}%</span>
      </div>
      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full rounded-full ${dynamicColor} transition-colors duration-500`} 
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, status, icon }: { label: string, value: string, trend?: string, status?: string, icon: React.ReactNode }) {
  return (
    <div className="institutional-card p-6 bg-gradient-to-br from-bastion-navy-light to-transparent">
       <div className="flex justify-between items-start mb-4">
         <div className="bg-bastion-navy p-2.5 rounded-xl border border-bastion-border">
           {icon}
         </div>
         {trend && (
           <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${trend.startsWith('+') ? 'border-bastion-green/30 text-bastion-green' : 'border-bastion-sapphire/30 text-bastion-sapphire'}`}>
             {trend}
           </span>
         )}
         {status && (
           <span className="text-[10px] font-black text-bastion-green uppercase tracking-[0.2em]">{status} <ChevronRight size={10} className="inline ml-1" /></span>
         )}
       </div>
       <div className="space-y-1">
         <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em]">{label}</p>
         <p className="text-3xl font-light tracking-tighter text-white">{value}</p>
       </div>
    </div>
  );
}
