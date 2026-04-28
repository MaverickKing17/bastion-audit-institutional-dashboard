import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessageSquare, X, Bot, User, Loader2, Sparkles, ShieldAlert } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

    try {
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[90] w-14 h-14 bg-bastion-sapphire rounded-2xl flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(74,144,226,0.5)] border border-white/20 text-white"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bastion-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-bastion-green"></span>
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-[90] w-96 h-[500px] bg-bastion-navy border border-bastion-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-bastion-border bg-bastion-navy-light flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-bastion-sapphire/10 flex items-center justify-center border border-bastion-sapphire/30">
                  <Bot size={18} className="text-bastion-sapphire" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white leading-none">Guard-GPT Assistant</h3>
                  <p className="text-[9px] font-bold text-bastion-green uppercase tracking-widest mt-1">Sovereign Knowledge Engine</p>
                </div>
              </div>
              <div className="p-1.5 bg-bastion-crimson/10 rounded-lg border border-bastion-crimson/20">
                <ShieldAlert size={14} className="text-bastion-crimson" />
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-bastion-navy/20"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="p-4 bg-white/5 rounded-full border border-white/5">
                    <Sparkles className="text-bastion-gold" size={32} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white uppercase tracking-widest">Audit Support Ready</p>
                    <p className="text-[10px] text-slate-500 uppercase font-medium leading-relaxed">
                      Ask about OSFI E-21 requirements, PII redaction rules, or threat mitigation strategies.
                    </p>
                  </div>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[85%] p-3 rounded-xl text-xs leading-relaxed border
                    ${msg.role === 'user' 
                      ? 'bg-bastion-sapphire/10 border-bastion-sapphire/30 text-white rounded-br-none' 
                      : 'bg-black/40 border-bastion-border text-slate-300 rounded-bl-none'}
                  `}>
                    <div className="flex items-center gap-2 mb-1 opacity-50">
                      {msg.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                      <span className="text-[9px] font-bold uppercase tracking-widest">
                        {msg.role === 'user' ? 'Audit Officer' : 'System Guard'}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-black/40 border border-bastion-border text-slate-300 p-3 rounded-xl rounded-bl-none">
                    <Loader2 size={16} className="animate-spin text-bastion-sapphire" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-bastion-border bg-bastion-navy/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inquire system status..."
                  className="w-full bg-black/40 border border-bastion-border rounded-xl pl-4 pr-12 py-3 text-xs font-medium focus:outline-none focus:border-bastion-sapphire text-white placeholder:text-slate-700"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-bastion-sapphire rounded-lg flex items-center justify-center text-white hover:scale-105 transition-all disabled:opacity-30"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
