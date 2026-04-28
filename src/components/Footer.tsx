import React from 'react';
import { Shield, ExternalLink, Globe, FileText, Lock, CheckCircle2 } from 'lucide-react';

export function Footer() {
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
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider mb-6">
            Institutional-grade AI Security & Compliance Posture Management for the Canadian Financial Sector.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-bastion-green animate-pulse" />
            <span className="text-[9px] font-black text-white uppercase tracking-widest italic">Sovereign Cloud // CA-CENTRAL-1</span>
          </div>
        </div>

        {/* Regulatory Column */}
        <div className="col-span-1">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Compliance Frameworks</h4>
          <ul className="space-y-3">
            <RegulatoryItem label="OSFI E-21 (Operational Risk)" />
            <RegulatoryItem label="PIPEDA (Data Privacy)" />
            <RegulatoryItem label="AIDA (AI & Data Act)" />
            <RegulatoryItem label="SOC 2 Type II" />
            <RegulatoryItem label="ISO/IEC 42001 (AI Management)" />
          </ul>
        </div>

        {/* Governance Column */}
        <div className="col-span-1">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Governance Resources</h4>
          <ul className="space-y-4">
            <FooterLink label="Model Drift Analysis" />
            <FooterLink label="Forensic Audit Trail Export" />
            <FooterLink label="Hardware Vault Attestation" />
            <FooterLink label="Incident Response Manual" />
          </ul>
        </div>

        {/* Contact/Verification Column */}
        <div className="col-span-1 bg-bastion-navy-light/30 p-6 rounded-xl border border-bastion-border">
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">Official Verification</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-bastion-green" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">OSFI Compliant Status</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock size={16} className="text-bastion-sapphire" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">FIPS 140-2 Level 3</span>
            </div>
            <button className="w-full mt-2 py-3 bg-white/5 border border-white/5 rounded-lg text-[9px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest italic">
              Download Trust Center Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-bastion-border flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          © {currentYear} Bastion Audit Security. All Sovereign Rights Reserved.
        </p>
        <div className="flex gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Legal Disclosure</a>
        </div>
      </div>
    </footer>
  );
}

function RegulatoryItem({ label }: { label: string }) {
  return (
    <li className="flex items-center justify-between group cursor-pointer">
      <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300 transition-colors uppercase tracking-tight">{label}</span>
      <ExternalLink size={10} className="text-slate-700 group-hover:text-bastion-sapphire transition-colors" />
    </li>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-2 group cursor-pointer text-[10px] font-bold text-slate-500 uppercase tracking-tight hover:text-white transition-colors">
      <FileText size={12} className="text-slate-700" />
      <span>{label}</span>
    </li>
  );
}
