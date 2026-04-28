import React from 'react';
import { Shield, ExternalLink, Globe, FileText, Lock, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onSelect: (framework: any) => void;
}

export function Footer({ onSelect }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bastion-navy border-t border-bastion-border pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1 border-r border-bastion-border/30 pr-8">
          <div className="flex items-center gap-2 mb-6 text-white">
            <Shield className="text-bastion-green fill-bastion-navy" size={24} />
            <span className="font-black text-xl tracking-tight uppercase italic">Bastion Audit</span>
          </div>
          <p className="text-[11px] text-white font-medium leading-relaxed uppercase tracking-wider mb-6">
            Institutional-grade AI Security & Compliance Posture Management for the Canadian Financial Sector.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-bastion-green animate-pulse" />
            <span className="text-[9px] font-black text-white uppercase tracking-widest italic">Sovereign Cloud // CA-CENTRAL-1</span>
          </div>
        </div>

        {/* Regulatory Column */}
        <div className="col-span-1">
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">Compliance Frameworks</h4>
          <ul className="space-y-3">
            <RegulatoryItem label="OSFI E-21 (Operational Risk)" onClick={() => onSelect('OSFI E-21')} />
            <RegulatoryItem label="PIPEDA (Data Privacy)" onClick={() => onSelect('PIPEDA')} />
            <RegulatoryItem label="AIDA (AI & Data Act)" onClick={() => onSelect('AIDA')} />
            <RegulatoryItem label="SOC 2 Type II" onClick={() => onSelect('SOC 2')} />
            <RegulatoryItem label="ISO/IEC 42001 (AI Management)" onClick={() => onSelect('ISO 42001')} />
          </ul>
        </div>

        {/* Governance Column */}
        <div className="col-span-1">
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">Governance & Policy</h4>
          <ul className="space-y-4">
            <FooterLink label="AML & KYC Compliance" onClick={() => onSelect('AML')} />
            <FooterLink label="Conflict of Interest" onClick={() => onSelect('CONFLICTS')} />
            <FooterLink label="Accessibility Statement" onClick={() => onSelect('ACCESSIBILITY')} />
            <FooterLink label="Incident Response Manual" onClick={() => onSelect('INCIDENT')} />
          </ul>
        </div>

        {/* Contact/Verification Column */}
        <div className="col-span-1 bg-bastion-navy-light/30 p-6 rounded-xl border border-bastion-border">
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">Official Verification</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-bastion-green" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">OSFI Compliant Status</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock size={16} className="text-bastion-sapphire" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">FIPS 140-2 Level 3</span>
            </div>
            <button className="w-full mt-2 py-3 bg-white/5 border border-white/5 rounded-lg text-[9px] font-black text-white hover:bg-white/10 transition-all uppercase tracking-widest italic">
              Download Trust Center Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-bastion-border flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-white font-bold uppercase tracking-widest">
          © {currentYear} Bastion Audit Security. All Sovereign Rights Reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold text-white uppercase tracking-widest">
          <button onClick={() => onSelect('PRIVACY')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
          <button onClick={() => onSelect('TERMS')} className="hover:text-slate-300 transition-colors">Terms of Service</button>
          <button onClick={() => onSelect('COOKIE')} className="hover:text-slate-300 transition-colors">Cookie Policy</button>
          <button onClick={() => onSelect('DMCA')} className="hover:text-slate-300 transition-colors">DMCA</button>
          <button onClick={() => onSelect('DISCLAIMER')} className="hover:text-slate-300 transition-colors">Legal Disclaimer</button>
        </div>
      </div>
    </footer>
  );
}

function RegulatoryItem({ label, onClick }: { label: string, onClick: () => void }) {
  return (
    <li className="flex items-center justify-between group cursor-pointer" onClick={onClick}>
      <span className="text-[10px] font-bold text-white group-hover:text-slate-300 transition-colors uppercase tracking-tight">{label}</span>
      <ExternalLink size={10} className="text-white/40 group-hover:text-bastion-sapphire transition-colors" />
    </li>
  );
}

function FooterLink({ label, onClick }: { label: string, onClick: () => void }) {
  return (
    <li className="flex items-center gap-2 group cursor-pointer text-[10px] font-bold text-white uppercase tracking-tight hover:text-slate-300 transition-colors" onClick={onClick}>
      <FileText size={12} className="text-white/40" />
      <span>{label}</span>
    </li>
  );
}
