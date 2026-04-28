import React from 'react';
import { Shield, Globe, Activity, Database, Fingerprint, Lock, ShieldCheck, ChevronRight, LayoutGrid } from 'lucide-react';

interface SidebarProps {
  currentView: 'dashboard' | 'health';
  onViewChange: (view: 'dashboard' | 'health') => void;
}

function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
        active 
        ? 'bg-bastion-sapphire/10 border border-bastion-sapphire/30 text-white' 
        : 'hover:bg-white/5 border border-transparent text-slate-500'
      }`}
    >
      <span className={active ? 'text-bastion-sapphire' : ''}>{icon}</span>
      <span className={`text-xs font-bold uppercase tracking-tight ${active ? 'text-white' : ''}`}>{label}</span>
      {active && <div className="ml-auto w-1 h-1 rounded-full bg-bastion-sapphire shadow-[0_0_8px_rgba(74,144,226,0.8)]" />}
    </button>
  );
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <div className="w-72 border-r border-bastion-border bg-bastion-navy p-6 flex flex-col gap-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-bastion-green rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(46,204,113,0.2)] border border-white/10">
          <Shield fill="#0B1221" className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-black text-lg leading-none tracking-tight text-white mb-0.5 uppercase italic">Bastion Audit</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Enterprise Security Gateway</p>
        </div>
      </div>

      <nav className="space-y-1">
        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-3 block">Primary Operations</label>
        <NavItem 
          active={currentView === 'dashboard'} 
          onClick={() => onViewChange('dashboard')} 
          icon={<LayoutGrid size={18} />} 
          label="Security Audit" 
        />
        <NavItem 
          active={currentView === 'health'} 
          onClick={() => onViewChange('health')} 
          icon={<Activity size={18} />} 
          label="System Health" 
        />
      </nav>

      <div className="space-y-1">
        <label className="label-xs mb-3 block">Tenant Context</label>
        <div className="p-3 bg-bastion-navy-light/50 rounded-xl border border-bastion-border group cursor-pointer hover:border-bastion-sapphire/30 transition-all">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-bastion-navy border border-white/5 flex items-center justify-center">
               <Globe className="text-bastion-sapphire" size={14} />
             </div>
             <div>
               <p className="text-[11px] font-bold text-white uppercase tracking-tight">Global Enterprise</p>
               <p className="text-[9px] text-slate-500 uppercase font-medium">14 Active Agents</p>
             </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="label-xs mb-1 block">Governance</label>
        <button className="w-full flex items-center gap-3 p-2.5 text-[10px] font-bold text-slate-500 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-colors group uppercase tracking-widest">
          <Lock size={12} className="group-hover:text-bastion-crimson" />
          <span>Privileges Locked</span>
        </button>
      </div>

      <div className="space-y-3">
        <label className="label-xs mb-1 block">Residency</label>
        <div className="space-y-2 px-1">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-500 uppercase font-medium">Primary</span>
            <span className="text-white font-bold uppercase tracking-tight flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-bastion-green animate-pulse" />
              CA-CENTRAL
            </span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-500 uppercase font-medium">Compliance</span>
            <span className="text-bastion-green font-bold uppercase tracking-tight">E-21 Verified</span>
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-4 pt-6 border-t border-bastion-border">
        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1 block">System Health</label>
        <div className="space-y-3">
          <StatusRow label="Lakera Guard" status="ACTIVE" dot="bg-bastion-green" />
          <StatusRow label="Firestore DB" status="STABLE" dot="bg-bastion-sapphire" />
          <StatusRow label="Agent Monitor" status="ONLINE" dot="bg-bastion-green" />
        </div>
      </div>
    </div>
  );
}

function StatusRow({ label, status, dot }: { label: string, status: string, dot: string }) {
  return (
    <div className="flex justify-between items-center text-[11px]">
      <span className="text-slate-500 uppercase font-medium">{label}</span>
      <span className={`font-black text-[10px] uppercase tracking-wider flex items-center gap-2 ${dot === 'bg-bastion-green' ? 'text-bastion-green' : 'text-bastion-sapphire'}`}>
        {status}
        <span className={`w-1.5 h-1.5 rounded-full ${dot} shadow-[0_0_8px_rgba(46,204,113,0.5)]`} />
      </span>
    </div>
  );
}
