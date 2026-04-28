import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Lock, Globe, Server, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

export type RegulatoryFramework = 
  | 'OSFI E-21' | 'PIPEDA' | 'AIDA' | 'SOC 2' | 'ISO 42001' 
  | 'MODEL DRIFT' | 'FORENSIC' | 'HARDWARE' | 'INCIDENT'
  | 'PRIVACY' | 'TERMS' | 'COOKIE' | 'DMCA' | 'DISCLAIMER' 
  | 'ACCESSIBILITY' | 'AML' | 'CONFLICTS';

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
    content: `The Personal Information Protection and Electronic Documents Act (PIPEDA) is the federal privacy law for private-sector organizations in Canada. For Big Five banks and institutional players, Bastion ensures:

- **Strict Data Residency**: Bastion enforces a "Canada-First" routing policy, ensuring that all PII (Personally Identifiable Information) processed by LLMs remains within the ca-central-1 AWS/GCP regions.
- **OPC Audit Readiness**: We provide automated logs that satisfy the Office of the Privacy Commissioner's (OPC) strict documentation requirements for "Reasonable Security Safeguards."
- **Institutional Consent Tracking**: Automated mapping of AI processing to user-granted consent parameters, preventing "Purpose Creep" in credit scoring or marketing models.
- **Breach Mitigation**: Real-time identification of privacy data leaks (e.g., Credit Card Numbers, SIN) with immediate redaction and mandatory reporting triggers.`,
  },
  'AIDA': {
    title: 'AIDA (AI & Data Act)',
    subtitle: 'Proposed Canada-wide AI Regulation',
    icon: Globe,
    color: 'text-bastion-gold',
    content: `The Artificial Intelligence and Data Act (AIDA) represents Canada's first legislative framework for AI. Bastion Audit aligns with the proposed requirements for "High-Impact Systems":

- **Algorithmic Impact Assessments (AIA)**: Bastion automates the generation of AIAs for financial models, documenting the intended use, data sources, and potential harm mitigation strategies.
- **Bias & Fairness Monitoring**: Constant statistical evaluation of lending, hiring, and insurance models to prevent discriminatory outcomes as defined by Canadian Human Rights standards.
- **Transparence & Explainability**: We generate "Human-Readable Reasoning Logs" for every model inference, ensuring that internal risk officers can explain a specific financial rejection to a customer.
- **System Hazard Mitigation**: Real-time monitoring for "Mass Harm" scenarios, with automated circuit-breakers if a model begins producing statistically anomalous financial advice.`,
  },
  'SOC 2': {
    title: 'SOC 2 Type II',
    subtitle: 'Security, Availability, Processing Integrity',
    icon: Server,
    color: 'text-white',
    content: `Bastion Audit's infrastructure is built on the five "Trust Services Criteria" mandated for institutional SaaS providers in Canada:

- **Security & Zero Trust**: Integration with Azure AD and Okta using hardware-backed MFA to ensure only authorized risk officers can access sensitive audit trails.
- **Processing Integrity**: We validate that AI model outputs are complete, valid, accurate, and timely—ensuring that "Model Hallucinations" don't become part of the financial record.
- **Availability & Resilience**: Architected with multi-region failover to ensure the Compliance Dashboard remains accessible even during major CSP outages.
- **Continuous Control Monitoring (CCM)**: Moving beyond annual audits to second-by-second verification of security controls, providing a "Real-Time SOC 2" posture.`,
  },
  'ISO 42001': {
    title: 'ISO/IEC 42001',
    subtitle: 'International Standard for AI Management',
    icon: FileText,
    color: 'text-bastion-sapphire',
    content: `ISO 42001 is the international gold standard for Artificial Intelligence Management Systems (AIMS). Bastion's implementation for the Canadian market includes:

- **AI Risk Treatment**: A centralized portal to document, assess, and treat risks specific to generative AI, such as Prompt Injection and Data Poisoning.
- **Data Quality for AI**: Continuous auditing of the training and fine-tuning datasets used for institutional models to ensure they meet "Representative Data" standards.
- **Lifecycle Management**: Tracking models from initial sandbox development to production deployment, including versioning and "Model Kill-Switch" protocols.
- **Stakeholder Accountability**: Clearly defined roles within the Bastion UI for AI Developers, Risk Officers, and the Board of Directors, ensuring clear lines of responsibility.`,
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
  },
  'PRIVACY': {
    title: 'Privacy Policy',
    subtitle: 'Data Sovereignty & Protection',
    icon: Lock,
    color: 'text-bastion-sapphire',
    content: `Bastion Audit is committed to maintaining the highest standards of data privacy, specifically aligned with Canadian federal (PIPEDA) and provincial laws.

- **Data Sovereignty**: All metadata, logs, and audit trails are stored exclusively within Canadian borders. We do not transmit PII across international boundaries for processing.
- **Collection Limitation**: We only collect institutional telemetry essential for security auditing and compliance verification.
- **Anonymization**: All user interaction data is cryptographically anonymized before entering the model drift analysis engine.
- **Automated Purge**: Compliance logs are strictly retained as per OSFI retention schedules and automatically purged thereafter using secure-erase protocols.`,
  },
  'TERMS': {
    title: 'Terms of Service',
    subtitle: 'Institutional Usage Agreement',
    icon: FileText,
    color: 'text-slate-400',
    content: `Usage of the Bastion Audit platform is governed by these institutional terms. By accessing the system, you agree to:

- **Authorized Access Only**: System usage is strictly limited to named Audit Leads and Officers representing verified Canadian Financial Institutions.
- **Model Integrity**: Users may not attempt to reverse-engineer, adversarial-probe, or extraction-attack the underlying security models without expressing prior written consent.
- **Reporting Obligation**: Any discovered vulnerability or unexpected model output must be reported through the secure Incident Response channel within 15 minutes of detection.
- **Audit Logging**: You acknowledge that 100% of actions performed within this interface are recorded in an immutable ledger for forensic review.`,
  },
  'COOKIE': {
    title: 'Cookie & Tracking Policy',
    subtitle: 'State Management & Telemetry',
    icon: Globe,
    color: 'text-bastion-sapphire',
    content: `Bastion Audit uses minimal, highly secure cookies to maintain institutional session integrity.

- **Essential Cookies**: Used strictly for session management, MFA verification, and user preference persistence across the dashboard.
- **Zero Third-Party Tracking**: We use no external tracking pixels, marketing cookies, or third-party analytics (e.g., Google Analytics). All telemetry is self-hosted.
- **Hardware Binding**: Cookies are bound to the specific workstation hardware fingerprint verified during onboarding.
- **Secure Flags**: Every cookie is set with 'HttpOnly', 'Secure', and 'SameSite=Strict' flags to prevent cross-site scripting and request forgery.`,
  },
  'DMCA': {
    title: 'DMCA & Intellectual Property',
    subtitle: 'IP Protection & Copyright',
    icon: FileText,
    color: 'text-slate-400',
    content: `Bastion Audit respects the intellectual property rights of others and expects its institutional users to do the same.

- **Model Ownership**: All underlying security weights, RAG architectures, and custom-tuned LLMs are the exclusive property of Bastion Audit or its licensors.
- **Take-down Requests**: For copyright infringement claims, contact our designated IP Officer at compliance@bastion.ca. Requests are processed within 24 business hours as per Digital Millennium Copyright Act standards.
- **Attribution**: No part of the "Institutional Guard" software may be reproduced or distributed without formal cryptographic signing from Bastion HQ.
- **Fair Use**: AI evaluations performed on third-party data under the Forensic stream follow Canadian 'Fair Dealing' exceptions for the purposes of security research and audit.`,
  },
  'DISCLAIMER': {
    title: 'Legal Disclaimer',
    subtitle: 'Non-Liability & Limitation',
    icon: AlertTriangle,
    color: 'text-bastion-gold',
    content: `This dashboard provides automated compliance guidance and does not constitute legal or regulatory advice from OSFI, FINTRAC, or the OPC.

- **Not Legal Counsel**: While Bastion Audit helps institutions meet regulatory requirements, final compliance determination remains with the institution's legal department.
- **Model Probabilities**: AI-generated "Compliance Readiness" scores are based on probabilistic modeling and should be verified by a human auditor before being presented to a regulator.
- **No Guarantee of Zero-Threat**: No system can guarantee 100% protection against sophisticated state-sponsored actors. Bastion is a layer of defense, not a total solution.
- **Institutional Responsibility**: The use of the "Emergency Kill-Switch" is a high-impact action; user accepts all liabilities for service interruptions resulting from its activation.`,
  },
  'ACCESSIBILITY': {
    title: 'Accessibility Statement',
    subtitle: 'AODA & Accessible Canada Act',
    icon: Globe,
    color: 'text-white',
    content: `Bastion Audit is designed to exceed the requirements of the Accessibility for Ontarians with Disabilities Act (AODA) and the federal Accessible Canada Act.

- **WCAG 2.1 Level AA**: The interface targets full compliance with web content accessibility guidelines.
- **High-Contrast Interface**: Specifically optimized for risk officers using screen readers or requiring high-visibility color palettes.
- **Keyboard Navigation**: 100% of dashboard functions can be triggered via keyboard shortcuts, including the Kill-Switch mechanism.
- **Audit Report Accessibility**: All exported Forensic CSV and PDF reports are structured for machine readability and accessibility software.`,
  },
  'AML': {
    title: 'AML & KYC Compliance',
    subtitle: 'Anti-Money Laundering Safeguards',
    icon: Shield,
    color: 'text-bastion-green',
    content: `Bastion Audit assists Canadian financial institutions in adhering to FINTRAC's Anti-Money Laundering (AML) and Know Your Customer (KYC) requirements.

- **Suspicious Activity Detection**: Our AI engine monitors transaction-adjacent metadata for patterns indicative of money laundering or terrorist financing.
- **Sanctions Screening**: Integration with Global Affairs Canada and OSFI consolidated watchlists for real-time model interaction filtering.
- **Enhanced Due Diligence (EDD)**: Automated risk-rating of entities based on complex relationship mappings extracted from unstructured data inputs.
- **Record Keeping**: Immutable logs of AML checks preserved for the mandatory 7-year period as required by the PCMLTFA.`,
  },
  'CONFLICTS': {
    title: 'Conflict of Interest',
    subtitle: 'Institutional Integrity Policy',
    icon: Lock,
    color: 'text-bastion-sapphire',
    content: `In accordance with NI 31-103 and other Canadian securities regulations, Bastion enforces a strict conflict of interest policy.

- **Audit Independence**: To ensure objective results, the platform isolates developers of an AI system from the auditors reviewing its compliance stream.
- **Personal Interest Redaction**: Risk officers are automatically flagged if they attempt to audit systems related to their own personal financial disclosures.
- **Influence Mitigation**: Any human intervention in the AI audit trail must be accompanied by a "Justification Token" explaining the rationale for the override.
- **Third-Party Disclosure**: All third-party data providers contributing to the Bastion Knowledge Base are required to disclose any financial interests in the regulated entities.`,
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
