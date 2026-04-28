import React from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { Severity } from '@/src/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  const styles = {
    [Severity.CRITICAL]: 'bg-bastion-crimson/10 text-bastion-crimson border-bastion-crimson/50',
    [Severity.HIGH]: 'bg-bastion-gold/10 text-bastion-gold border-bastion-gold/50',
    [Severity.MEDIUM]: 'bg-bastion-sapphire/10 text-bastion-sapphire border-bastion-sapphire/50',
    [Severity.SAFE]: 'bg-bastion-green/10 text-bastion-green border-bastion-green/50',
  };

  const icons = {
    [Severity.CRITICAL]: <AlertCircle className="w-3 h-3 mr-1.5" />,
    [Severity.HIGH]: <AlertTriangle className="w-3 h-3 mr-1.5" />,
    [Severity.MEDIUM]: <Shield className="w-3 h-3 mr-1.5" />,
    [Severity.SAFE]: <CheckCircle2 className="w-3 h-3 mr-1.5" />,
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-semibold border",
      styles[severity]
    )}>
      {icons[severity]}
      {severity}
    </span>
  );
}

export function RegulatoryBadge({ code }: { code: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
      {code}
    </span>
  );
}

export function Card({ children, title, subtitle, className, ...props }: { children: React.ReactNode, title?: string, subtitle?: string, className?: string, [key: string]: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("institutional-card h-full flex flex-col", className)}
      {...props}
    >
      {(title || subtitle) && (
        <div className="px-5 py-4 border-bottom border-bastion-border bg-bastion-navy/20">
          {title && <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="flex-1 p-5">
        {children}
      </div>
    </motion.div>
  );
}
