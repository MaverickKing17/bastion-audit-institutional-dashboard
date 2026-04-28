import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessageSquare, X, Bot, User, Loader2, Sparkles, ShieldAlert, AlertTriangle, Terminal, ShieldOff, EyeOff, Lock, Skull, Link2Off, FileWarning, ShieldCheck } from 'lucide-react';

interface SecurityMetadata {
  isFlagged: boolean;
  flaggedCategories: string[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  securityMetadata?: SecurityMetadata;
}

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [securityStatus, setSecurityStatus] = useState<'clean' | 'scanning' | 'alert' | 'idle'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setSecurityStatus('scanning');

    try {
      // Step 1: Lakera Guard Security Scan
      const securityResponse = await fetch('/api/security/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input })
      });

      if (securityResponse.ok) {
        const securityData = await securityResponse.json();
        const isFlagged = securityData.results?.[0]?.flagged || securityData.results?.[0]?.flag;
        
        if (isFlagged) {
          setSecurityStatus('alert');
          const categories = securityData.results[0].categories;
          const flaggedCategories = Object.entries(categories || {})
            .filter(([_, value]) => value === true)
            .map(([key]) => key);

          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: `Access denied due to institutional risk. Lakera Guard has intercepted this transmission.`,
            securityMetadata: {
              isFlagged: true,
              flaggedCategories: flaggedCategories
            }
          }]);
          setIsLoading(false);
          return;
        }
      }
      
      setSecurityStatus('clean');

      // Step 2: Proceed to Chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to communicate with Groq');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}. Please ensure GROQ_API_KEY is configured in the environment.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-gradient-to-tr from-bastion-tangerine to-orange-400 rounded-2xl flex items-center justify-center shadow-[0_15px_50px_-10px_rgba(255,140,0,0.5)] border border-white/30 text-white group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
            >
              <MessageSquare size={28} className="group-hover:animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-bastion-green border-2 border-bastion-navy"></span>
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="fixed bottom-28 right-8 z-[90] w-[400px] h-[600px] bg-bastion-navy border border-bastion-border rounded-3xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header with vibrant gradient */}
            <div className="p-6 bg-gradient-to-r from-bastion-navy-light to-bastion-navy relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bastion-tangerine via-bastion-gold to-bastion-green" />
               <div className="absolute -right-8 -top-8 w-32 h-32 bg-bastion-tangerine/5 rounded-full blur-3xl" />
               
               <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-bastion-tangerine/10 flex items-center justify-center border border-bastion-tangerine/30 shadow-inner group overflow-hidden">
                    <motion.div
                      animate={{ 
                        y: [0, -2, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Bot size={24} className="text-bastion-tangerine" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Sentinel Assistant</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        securityStatus === 'alert' ? 'bg-bastion-crimson' : 
                        securityStatus === 'scanning' ? 'bg-bastion-gold' : 'bg-bastion-green'
                      }`} />
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${
                        securityStatus === 'alert' ? 'text-bastion-crimson' : 
                        securityStatus === 'scanning' ? 'text-bastion-gold' : 'text-bastion-green'
                      }`}>
                        {securityStatus === 'alert' ? 'Threat Detected' : 
                         securityStatus === 'scanning' ? 'Lakera Scanning...' : 
                         'Lakera Secure Channel'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-500 hover:text-white">
                    <Sparkles size={16} />
                  </button>
                  <div className="p-2 bg-bastion-crimson/10 rounded-xl border border-bastion-crimson/20">
                    <ShieldAlert size={16} className="text-bastion-crimson" />
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area with refined styling */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-bastion-tangerine/5 via-transparent to-transparent"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="p-6 bg-bastion-tangerine/5 rounded-full border border-bastion-tangerine/20 shadow-[0_0_40px_rgba(255,140,0,0.1)]"
                  >
                    <Sparkles className="text-bastion-tangerine" size={40} />
                  </motion.div>
                  <div className="space-y-2">
                    <p className="text-sm font-black text-white uppercase tracking-[0.2em]">Institutional Guard Ready</p>
                    <p className="text-xs text-slate-500 uppercase font-bold leading-relaxed tracking-wider">
                      Inquire about OSFI E-21, PIPEDA Data residency, or automated threat mitigation workflows.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full pt-4">
                    {['OSFI E-21 Summary', 'PII Redaction Status', 'System Uptime', 'Compliance Gap'].map((hint) => (
                      <button 
                        key={hint}
                        onClick={() => setInput(hint)}
                        className="p-3 bg-bastion-navy border border-bastion-border rounded-xl text-[10px] font-black text-slate-500 hover:text-white hover:border-bastion-tangerine/30 hover:bg-bastion-tangerine/5 transition-all text-left uppercase tracking-wider"
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed shadow-xl
                    ${msg.role === 'user' 
                      ? 'bg-gradient-to-br from-bastion-tangerine to-orange-600 text-white rounded-br-none shadow-bastion-tangerine/20' 
                      : 'bg-bastion-navy-light border border-bastion-border text-slate-300 rounded-bl-none'}
                  `}>
                    <div className="flex items-center gap-2 mb-2 opacity-60">
                      {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                        {msg.role === 'user' ? 'Direct Officer' : 'System Guard (Sovereign)'}
                      </span>
                    </div>
                    {msg.securityMetadata?.isFlagged ? (
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-bastion-crimson/10 border border-bastion-crimson/20 rounded-xl">
                          <AlertTriangle className="text-bastion-crimson shrink-0" size={18} />
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-bastion-crimson mb-1">Institutional Risk Detected</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-relaxed">
                              {msg.content}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Violation Vector Analysis:</p>
                          <div className="grid grid-cols-1 gap-2">
                            {msg.securityMetadata.flaggedCategories.map((cat) => (
                              <div key={cat} className="flex items-center gap-3 p-2 bg-bastion-navy/50 border border-white/5 rounded-lg">
                                <SecurityCategoryIcon category={cat} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                                  {cat.replace('_', ' ')}
                                </span>
                                <div className="ml-auto flex items-center gap-1">
                                   <div className="w-1.5 h-1.5 rounded-full bg-bastion-crimson shadow-[0_0_8px_rgba(229,72,77,0.5)]" />
                                   <span className="text-[8px] font-black text-bastion-crimson uppercase tracking-tighter">FLAGGED</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/5">
                           <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500 uppercase italic">
                             <ShieldCheck size={10} className="text-bastion-green" />
                             Protected by Bastion Sovereign Protocol v4.1
                           </div>
                        </div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-bastion-navy-light border border-bastion-border text-slate-300 p-4 rounded-2xl rounded-bl-none flex items-center gap-3">
                    <Loader2 size={18} className="animate-spin text-bastion-tangerine" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Processing Inquiry...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area with lively focus */}
            <div className="p-6 bg-bastion-navy border-t border-bastion-border">
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Sentinel any compliance question..."
                  className="w-full bg-bastion-navy-light border-2 border-bastion-border rounded-2xl pl-5 pr-14 py-4 text-xs font-black focus:outline-none focus:border-bastion-tangerine focus:ring-4 focus:ring-bastion-tangerine/10 text-white placeholder:text-slate-700 transition-all shadow-inner shadow-black/20"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-bastion-tangerine rounded-xl flex items-center justify-center text-white hover:bg-orange-400 transition-all disabled:opacity-30 shadow-lg shadow-bastion-tangerine/20"
                >
                  <Send size={18} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

function SecurityCategoryIcon({ category }: { category: string }) {
  const iconSize = 14;
  const className = "text-bastion-crimson";
  
  switch (category.toLowerCase()) {
    case 'prompt_injection':
      return <Terminal size={iconSize} className={className} />;
    case 'jailbreak':
      return <Lock size={iconSize} className={className} />;
    case 'pii':
      return <FileWarning size={iconSize} className={className} />;
    case 'unknown_links':
      return <Link2Off size={iconSize} className={className} />;
    case 'sexual':
      return <EyeOff size={iconSize} className={className} />;
    case 'hate':
      return <Skull size={iconSize} className={className} />;
    case 'violence':
    case 'harassment':
      return <ShieldOff size={iconSize} className={className} />;
    default:
      return <ShieldAlert size={iconSize} className={className} />;
  }
}
