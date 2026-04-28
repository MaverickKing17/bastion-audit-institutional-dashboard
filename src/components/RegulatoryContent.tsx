import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Lock, Globe, Server, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

export type RegulatoryFramework = 'OSFI E-21' | 'PIPEDA' | 'AIDA' | 'SOC 2' | 'ISO 42001' | 'MODEL DRIFT' | 'FORENSIC' | 'HARDWARE' | 'INCIDENT';

interface Props {
  framework: RegulatoryFramework | null;
  onClose: () => void;
}

const FRAMEWORK_CONTENT: Record<RegulatoryFramework, { title: string; subtitle: string; content: string; icon: any; color: string }> = {
  'OSFI E-21': {
    title: 'OSFI Guideline E-21',
    subtitle: 'Operational Risk Management for Canadian FI',
    icon: Shield,
    color: 'text-bastion-green',
    content: `Guideline E-21 is the gold standard for operational risk in Canada. Bastion Audit ensures:
    
- **Three Lines of Defence**: Automation of controls across business units, risk management, and internal audit.
- **Technology & Cyber Risk**: Strict adherence to OSFI B-13 (Technology and Cyber Risk Management) within the E-21 framework.
- **Outsourcing Resilience**: Real-time monitoring of third-party AI models to comply with OSFI B-10.
- **Governance**: Board-level reporting modules that demonstrate active oversight of AI decision-making models.`,
  },
  'PIPEDA': {
    title: 'PIPEDA Compliance',
    subtitle: 'Data Privacy & Sovereignty',
    icon: Lock,
    color: 'text-bastion-sapphire',
    content: `PIPEDA governs how private sector organizations collect, use, and disclose personal information. For the financial sector:

- **Sovereign Hosting**: All data processed by Bastion is anchored in ca-central-1 (Montreal/Toronto) to ensure no jurisdictional leakage.
- **Informed Consent**: Automated tracking of data usage purposes for every AI interaction.
- **Right to Rectification**: Tools to trace AI-generated decisions back to source data for verification.
- **Mandatory Breach Reporting**: Real-time incident logs that meet the threshold for OPC (Office of the Privacy Commissioner) notification.`,
  },
  'AIDA': {
    title: 'AIDA (AI & Data Act)',
    subtitle: 'Proposed Canada-wide AI Regulation',
    icon: Globe,
    color: 'text-bastion-gold',
    content: `As Canada prepares for the Artificial Intelligence and Data Act (AIDA), Bastion is already ahead with:

- **Bias Mitigation**: Continuous testing of fiscal lending models for discriminatory patterns.
- **Transparency**: Generating "Reasoning Logs" for every LLM output to explain the logic to auditors.
- **Safety Measures**: Hardened guardrails that prevent AI from generating non-factual or high-risk financial advice.
- **Accountability**: Designating responsible AI officers within the platform workflow.`,
  },
  'SOC 2': {
    title: 'SOC 2 Type II',
    subtitle: 'Security, Availability, Processing Integrity',
    icon: Server,
    color: 'text-white',
    content: `Bastion Audit is built on SOC 2 compliant infrastructure:

- **Continuous Monitoring**: Shift from point-in-time audits to real-time compliance posture.
- **Access Control**: Zero-trust architecture tracking every 'Audit Lead' and 'Officer' action.
- **Confidentiality**: Automatic PII/PHI redaction in transit.
- **System Integrity**: Validating that AI components processed data as requested without silent failures.`,
  },
  'ISO 42001': {
    title: 'ISO/IEC 42001',
    subtitle: 'International Standard for AI Management',
    icon: FileText,
    color: 'text-bastion-sapphire',
    content: `The world's first AI Management system standard. Our implementation covers:

- **AI Policy Framework**: Centralized control over model usage and risk assessment.
- **System Lifecycle**: Managing models from development to decommissioning with full versioning.
- **Impact Assessment**: Automated generation of Algorithmic Impact Assessments (AIA) required for government and large-scale enterprise use.
- **Ethical Safeguards**: Documenting the human-in-the-loop interventions for high-stakes financial calculations.`,
  },
  'MODEL DRIFT': {
    title: 'Model Drift Analysis',
    subtitle: 'Semantic and Statistical Stability',
    icon: AlertTriangle,
    color: 'text-bastion-crimson',
    content: `Financial models fail when reality changes. Bastion tracks:

- **Concept Drift**: Detecting when the meaning of input data (e.g., credit scores) shifts statistically.
- **Semantic Drift**: Monitoring if LLM responses are deviating from the institutional knowledge base.
- **Data Quality Alerts**: Catching corrupted or null fields before they poison the model.
- **Automated Retraining Triggers**: Hard-coded thresholds that flag models for human review when accuracy drops below 94%.`,
  },
  'FORENSIC': {
    title: 'Forensic Audit Export',
    subtitle: 'Immutable Ledger of AI Activity',
    icon: FileText,
    color: 'text-slate-400',
    content: `When a regulator asks "Why did the computer do this?", Bastion provides:

- **Cryptographic Hashing**: Every AI prompt/response pair is hashed and stored in an immutable ledger.
- **User Correlation**: Mapping every automated action to the specific human audit lead overseeing the system.
- **Temporal Trace**: Millionth-of-a-second timestamps proving exactly when a risk threshold was breached.
- **One-Click Export**: SEC/OSFI formatted CSV and PDF reports ready for immediate submission.`,
  },
  'HARDWARE': {
    title: 'Hardware Vault attestation',
    subtitle: 'Physical Security & FIPS Compliance',
    icon: Lock,
    color: 'text-bastion-sapphire',
    content: `True security requires physical root of trust. Bastion leverages:

- **FIPS 140-2 Level 3**: Hardware Security Modules (HSM) that are tamper-evident and tamper-responsive.
- **Cold Storage Wallets**: Key management for financial signing that remains offline when not in use.
- **Physical Proximity Alerts**: Zero-trust physical access logs correlated with system access logs.
- **Zero-Persistence RAM**: Ensuring sensitive decryption keys never touch a hard disk.`,
  },
  'INCIDENT': {
    title: 'Incident Response Manual',
    subtitle: 'Automated Crisis Playbooks',
    icon: AlertTriangle,
    color: 'text-bastion-crimson',
    content: `When a breach or model failure occurs, seconds matter:

- **Automated Isolation**: Instantly triggering the 'Kill-Switch' to quarantine failing components.
- **Communication Tree**: Pre-filled notification templates for Canadian regulators (FINTRAC, OSFI).
- **Post-Mortem Toolkit**: Tools to analyze the semantic vector space of a failure to find the root cause.
- **Recovery Orchstration**: Systematic restoration of verified-safe model weights.`,
  }
};

export function RegulatoryContent({ framework, onClose }: Props) {
  if (!framework) return null;

  const content = FRAMEWORK_CONTENT[framework];
  const Icon = content.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-bastion-navy border border-bastion-border rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-8 border-b border-bastion-border bg-bastion-navy-light flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={clsx("p-3 rounded-xl border", content.color.replace('text-', 'border-').replace('text-', 'bg-').concat('/10'))}>
                <Icon size={24} className={content.color} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">{content.title}</h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">{content.subtitle}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto custom-scrollbar">
            <div className="text-slate-300 leading-8 text-sm whitespace-pre-line font-medium italic mb-8 border-l-2 border-bastion-sapphire/30 pl-6">
              Official Institutional Guidance // Bastion Audit v4.1
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="text-slate-300 leading-relaxed text-sm space-y-4">
                {content.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('-')) {
                    return (
                      <ul key={i} className="space-y-4 list-none p-0 my-6">
                        {paragraph.split('\n').map((item, j) => (
                          <li key={j} className="flex gap-4 items-start">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-bastion-sapphire shrink-0" />
                            <div dangerouslySetInnerHTML={{ __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<b class="text-white font-black uppercase tracking-tight">$1</b>') }} />
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i} className="mb-6">{paragraph}</p>;
                })}
              </div>
            </div>

            <div className="mt-12 p-6 bg-bastion-navy-light/50 border border-bastion-border rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Compliance Readiness</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Calculated via Sovereign AI Engine</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-light text-bastion-green">99.8%</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-black/20 border-t border-bastion-border text-center">
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em]">
              Authorized Use Only • Canadian Financial Sector Sentinel
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
