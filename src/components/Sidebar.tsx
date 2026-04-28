import React from 'react';
import { Shield, Globe, Activity, Database, Fingerprint, Lock, ShieldCheck, ChevronRight, LayoutGrid } from 'lucide-react';

interface SidebarProps {
  currentView: 'dashboard' | 'health';
  onViewChange: (view: 'dashboard' | 'health') => void;
  onSelectFramework: (framework: any) => void;
}

function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
        active 
        ? 'bg-bastion-sapphire/5 border border-bastion-sapphire/20 text-bastion-sapphire shadow-sm' 
        : 'hover:bg-white/5 border border-transparent text-slate-500'
      }`}
    >
      <span className={active ? 'text-bastion-sapphire' : ''}>{icon}</span>
      <span className={`text-xs font-black uppercase tracking-tight ${active ? 'text-[var(--color-text-primary)]' : 'text-slate-500'}`}>{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-bastion-sapphire shadow-[0_0_8px_rgba(62,123,250,0.3)]" />}
    </button>
  );
}

export function Sidebar({ currentView, onViewChange, onSelectFramework }: SidebarProps) {
  return (
    <div className="w-72 border-r border-bastion-border bg-bastion-navy-light p-6 flex flex-col gap-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-bastion-green rounded-lg flex items-center justify-center shadow-sm border border-white/5">
          <Shield fill="#0F1A2F" className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-black text-lg leading-none tracking-tight text-white mb-0.5 uppercase italic">Bastion Audit</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Enterprise Security Gateway</p>
        </div>
      </div>

      <nav className="space-y-1">
        <label className="label-xs mb-3 block">Primary Operations</label>
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
        <div className="p-3 bg-bastion-navy/40 rounded-xl border border-bastion-border group cursor-pointer hover:border-bastion-sapphire/30 transition-all">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-bastion-surface border border-bastion-border flex items-center justify-center shadow-sm">
               <Globe className="text-bastion-sapphire" size={14} />
             </div>
             <div>
               <p className="text-[11px] font-bold text-white uppercase tracking-tight">Global Enterprise</p>
               <p className="text-[9px] text-slate-500 uppercase font-black">14 Active Agents</p>
             </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="label-xs mb-1 block">Governance</label>
        <button className="w-full flex items-center gap-3 p-2.5 text-[10px] font-black text-slate-500 bg-bastion-navy border border-bastion-border rounded-lg hover:bg-bastion-surface hover:text-white transition-all group uppercase tracking-widest">
          <Lock size={12} className="group-hover:text-bastion-crimson" />
          <span>Privileges Locked</span>
        </button>
      </div>

      <div className="space-y-3">
        <label className="label-xs mb-1 block">Residency</label>
        <div className="space-y-2 px-1">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-500 uppercase font-bold tracking-tight">Primary</span>
            <span className="text-white font-black uppercase tracking-tight flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-bastion-green animate-pulse" />
              CA-CENTRAL
            </span>
          </div>
          <div className="flex justify-between items-center text-[10px] group cursor-pointer" onClick={() => onSelectFramework('OSFI E-21')}>
            <span className="text-slate-500 uppercase font-bold tracking-tight group-hover:text-slate-400 transition-colors">Compliance</span>
            <span className="text-bastion-green font-black uppercase tracking-tight group-hover:brightness-110 transition-all">E-21 Verified</span>
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-4 pt-6 border-t border-bastion-border">
        <label className="label-xs mb-1 block">System Health</label>
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
      <span className="text-slate-400 uppercase font-bold tracking-tighter">{label}</span>
      <span className={`font-black text-[10px] uppercase tracking-wider flex items-center gap-2 ${dot === 'bg-bastion-green' ? 'text-bastion-green' : 'text-bastion-sapphire'}`}>
        {status}
        <span className={`w-1.5 h-1.5 rounded-full ${dot} shadow-sm`} />
      </span>
    </div>
  );
}
