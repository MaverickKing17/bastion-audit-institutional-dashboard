import React from 'react';
import { motion } from 'motion/react';
import { Activity, Server, Database, Shield, Zap, Clock, AlertTriangle, CheckCircle2, ChevronRight, BarChart3 } from 'lucide-react';
import { ComponentHealth, HealthMetric } from '@/src/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from './Common';

const MOCK_COMPONENTS: ComponentHealth[] = [
  { name: 'Lakera Guard', status: 'OPERATIONAL', uptime: '99.99%', latency: 12, cpu: 14, memory: 32, lastPulse: 'Now' },
  { name: 'Firestore DB', status: 'OPERATIONAL', uptime: '99.98%', latency: 8, cpu: 22, memory: 64, lastPulse: '2s ago' },
  { name: 'Agent Monitor', status: 'OPERATIONAL', uptime: '100%', latency: 45, cpu: 8, memory: 12, lastPulse: 'Now' },
  { name: 'Encryption Vault', status: 'DEGRADED', uptime: '99.95%', latency: 154, cpu: 45, memory: 88, lastPulse: '12s ago' },
];

const MOCK_LATENCY_DATA: HealthMetric[] = Array.from({ length: 20 }, (_, i) => ({
  timestamp: `${i}:00`,
  value: 10 + Math.random() * 20 + (i > 15 ? 40 : 0)
}));

export function SystemHealthDashboard() {
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
          value="24.4ms" 
          trend="-1.2ms" 
          icon={<Zap className="text-bastion-gold" size={20} />} 
        />
        <StatCard 
          label="Active Infrastructure Nodes" 
          value="12/12" 
          status="ONLINE"
          icon={<Server className="text-bastion-sapphire" size={20} />} 
        />
      </div>

      {/* Main Grid: Topology + Performance */}
      <div className="grid grid-cols-12 gap-8">
        {/* Hardware Status Nodes */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
            <Activity size={14} />
            Resource Node Topology
          </h2>
          {MOCK_COMPONENTS.map((node) => (
            <NodeCard key={node.name} node={node} />
          ))}
        </div>

        {/* Global Latency Chart */}
        <div className="col-span-12 lg:col-span-7">
          <Card 
            title="System Latency Matrix (ms)" 
            subtitle="Real-time performance across sovereign clusters"
          >
            <div className="h-[340px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_LATENCY_DATA}>
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
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 border-t border-bastion-border pt-4">
              <div className="flex gap-4">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-bastion-sapphire" /> P99 Latency</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-700" /> Baseline</span>
              </div>
              <button className="flex items-center gap-1 hover:text-white transition-colors">
                <BarChart3 size={12} />
                VIEW DETAILED ANALYTICS
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Internal System Incident Log */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
           <AlertTriangle size={16} className="text-bastion-gold" />
           <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Hardware Interruption Log (Last 24H)</h2>
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
              {[
                { time: '2026-04-28 14:12:01', comp: 'Vault-Primary', event: 'Token exhaustion warning on cluster-C', sev: 'HIGH', ref: 'HW-902' },
                { time: '2026-04-28 11:45:22', comp: 'DB-Instance', event: 'Primary write-sharding rebalance', sev: 'MEDIUM', ref: 'DB-441' },
                { time: '2026-04-28 09:20:11', comp: 'Lakera-Gate', event: 'Hardware-level bypass lock enabled', sev: 'CRITICAL', ref: 'SCR-110' },
              ].map((log, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
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

function NodeCard({ node, ...props }: { node: ComponentHealth, [key: string]: any }) {
  return (
    <div className="institutional-card p-5 group hover:border-bastion-sapphire/30 transition-all cursor-pointer" {...props}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-bastion-navy border ${node.status === 'OPERATIONAL' ? 'border-bastion-green/20' : 'border-bastion-gold/20'}`}>
            {node.name.includes('DB') ? <Database size={16} className="text-bastion-sapphire" /> : 
             node.name.includes('Guard') ? <Shield size={16} className="text-bastion-green" /> : 
             <Server size={16} className="text-slate-400" />}
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-tight">{node.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${node.status === 'OPERATIONAL' ? 'bg-bastion-green shadow-[0_0_8px_rgba(46,204,113,0.5)]' : 'bg-bastion-gold'}`} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{node.status}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono font-bold text-white">{node.uptime}</p>
          <p className="text-[9px] text-slate-600 uppercase font-bold tracking-widest mt-0.5">UPTIME</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
        <ResourceGauge label="CPU Usage" value={node.cpu} color="bg-bastion-sapphire" />
        <ResourceGauge label="RAM Load" value={node.memory} color="bg-bastion-gold" />
        <div className="space-y-1">
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Latency</p>
          <p className="text-xs font-mono font-bold text-slate-300">{node.latency}ms</p>
        </div>
      </div>
    </div>
  );
}

function ResourceGauge({ label, value, color }: { label: string, value: number, color: string }) {
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
          className={`h-full rounded-full ${color}`} 
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
