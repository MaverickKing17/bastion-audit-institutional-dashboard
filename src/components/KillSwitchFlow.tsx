import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Lock, ShieldOff, Server, LayoutGrid, Cpu, X } from 'lucide-react';

interface KillSwitchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KillSwitchFlow({ isOpen, onClose }: KillSwitchProps) {
  const [step, setStep] = useState(1);
  const [scope, setScope] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState('');

  const reset = () => {
    setStep(1);
    setScope(null);
    setConfirmation('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="max-w-2xl w-full bg-bastion-navy-light border border-bastion-crimson/30 rounded-2xl p-10 shadow-[0_0_100px_rgba(175,41,47,0.2)]"
        >
          {step === 1 && (
            <div className="space-y-8 text-center">
              <div className="flex justify-center">
                <div className="p-5 bg-bastion-crimson/10 rounded-full border border-bastion-crimson/30">
                  <AlertTriangle size={64} className="text-bastion-crimson animate-pulse" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tight text-white uppercase italic">Critical System Override</h2>
                <p className="text-slate-400 text-lg leading-relaxed px-10">
                  Executing a manual kill-switch operation will immediately sever all autonomy gates and freeze agent execution. This action is recorded in the immutable audit trail.
                </p>
              </div>
              <div className="pt-6 flex justify-center gap-4">
                <button onClick={reset} className="px-8 py-3 rounded-lg font-bold text-slate-400 hover:text-white transition-colors">ABORT OPERATION</button>
                <button 
                  onClick={() => setStep(2)} 
                  className="px-8 py-3 bg-bastion-crimson rounded-lg font-bold text-white shadow-lg shadow-bastion-crimson/20 hover:scale-105 transition-all text-sm uppercase tracking-widest"
                >
                  Initiate Lock Sequence
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Step 2: Define Override Scope</h2>
                <p className="text-slate-400 mt-2">Identify the boundary for hardware-level interception</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'agent', icon: <Cpu />, label: 'Single Agent', desc: 'Isolate specific entity' },
                  { id: 'workflow', icon: <Server />, label: 'Workflow', desc: 'Sever logical chain' },
                  { id: 'environment', icon: <LayoutGrid />, label: 'Env Wide', desc: 'Total infrastructure freeze' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setScope(item.id)}
                    className={`
                      p-6 rounded-xl border-2 text-left transition-all
                      ${scope === item.id 
                        ? 'border-bastion-crimson bg-bastion-crimson/10' 
                        : 'border-bastion-border bg-bastion-navy hover:border-slate-600'}
                    `}
                  >
                    <div className={scope === item.id ? "text-bastion-crimson" : "text-slate-400"}>
                      {item.icon}
                    </div>
                    <div className="mt-4 font-bold text-white text-sm uppercase">{item.label}</div>
                    <div className="text-[10px] text-slate-500 mt-1 uppercase font-medium">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-6 flex justify-between">
                <button onClick={() => setStep(1)} className="text-slate-500 hover:text-white text-xs font-bold uppercase transition-colors">Back</button>
                <button 
                  disabled={!scope}
                  onClick={() => setStep(3)}
                  className="px-8 py-3 bg-white text-bastion-navy rounded font-black text-sm uppercase tracking-widest disabled:opacity-30 transition-all hover:scale-105"
                >
                  Verify Authorization
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Step 3: Identity Confirmation</h2>
                <p className="text-slate-400 mt-2">Type "DISABLE AUTONOMY" to execute the kill-switch</p>
              </div>
              
              <div className="relative">
                <input 
                  autoFocus
                  type="text"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value.toUpperCase())}
                  placeholder="AUTHORIZATION_STRING_REQUIRED"
                  className="w-full bg-black/50 border-2 border-bastion-border rounded-xl p-6 font-mono text-center text-xl tracking-[0.4em] focus:border-bastion-crimson outline-none transition-all placeholder:text-slate-800"
                />
                {confirmation === 'DISABLE AUTONOMY' && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 border-2 border-bastion-crimson rounded-xl pointer-events-none"
                  />
                )}
              </div>

              <div className="bg-bastion-crimson/5 border border-bastion-crimson/20 rounded-lg p-4 flex gap-4 items-start">
                <ShieldOff className="text-bastion-crimson shrink-0" size={18} />
                <div className="text-[11px] text-slate-400 space-y-1">
                  <p className="font-bold text-bastion-crimson uppercase italic underline decoration-bastion-crimson/30 decoration-2">Governance Warning:</p>
                  <p>All safety interlocks will be bypassed. This event triggers an automatic OSFI E-21 incident report. Operator identity [NAR-702] is being logged via hardware vault.</p>
                </div>
              </div>

              <div className="pt-6 flex justify-between gap-4">
                <button onClick={() => setStep(2)} className="text-slate-500 hover:text-white text-xs font-bold uppercase">Back</button>
                <button 
                  disabled={confirmation !== 'DISABLE AUTONOMY'}
                  onClick={() => setStep(4)}
                  className="flex-1 py-4 bg-bastion-crimson rounded-xl font-black text-white tracking-[0.2em] disabled:opacity-20 hover:scale-[1.02] transition-all shadow-2xl shadow-bastion-crimson/40"
                >
                  EXECUTE SYSTEM KILL
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-8 py-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-24 h-24 bg-bastion-green rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(46,204,113,0.3)]"
              >
                <Lock size={40} className="text-white" />
              </motion.div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">System Sanitized</h2>
                <p className="text-slate-400 font-mono text-sm leading-relaxed">
                  AUTONOMY_DISABLED // ALL_GATES_INTERCEPTED<br/>
                  Incident Ref: CA-7728-BS-2026<br/>
                  Immutable Log Stored in Vault: Primary (Canada Central)
                </p>
              </div>
              <button 
                onClick={reset} 
                className="px-10 py-3 bg-white/5 border border-white/10 rounded-lg font-bold text-slate-400 hover:text-white transition-all"
              >
                CLOSE SECURE CONSOLE
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
