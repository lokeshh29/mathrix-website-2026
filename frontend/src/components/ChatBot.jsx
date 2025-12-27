import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am Cipher. How can I assist you with Mathrix 2026 today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Simulate bot response
        setTimeout(() => {
            const botMsg = { id: Date.now() + 1, text: "I'm currently in demo mode! I'll be fully operational soon to help with event registrations and queries.", sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none"> {/* Container to manage layout, pointer-events-none to let clicks pass through empty space */}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-auto mb-4 w-80 md:w-96 glass-card border border-pink-500/30 overflow-hidden flex flex-col shadow-[0_0_50px_rgba(219,39,119,0.25)]"
                    >
                        {/* Header */}
                        <div className="p-4 bg-[#1a1a2e] border-b border-white/5 flex items-center justify-between backdrop-blur-md relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20" />
                            <div className="relative flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl shadow-lg shadow-pink-500/20">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm tracking-wide">Cipher</h3>
                                    <span className="text-[10px] text-gray-400 flex items-center gap-1.5 uppercase font-medium tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                        Online
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="relative p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-[#0f0518]/95 scrollbar-thin scrollbar-thumb-white/10">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                            ? 'bg-pink-600 text-white rounded-br-none shadow-pink-900/20'
                                            : 'bg-[#1a1a2e] text-gray-100 border border-white/5 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 bg-[#1a1a2e] border-t border-white/5 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your query..."
                                className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500/50 focus:bg-black/40 transition-all placeholder:text-gray-600"
                            />
                            <button
                                type="submit"
                                className="p-2.5 bg-pink-600 hover:bg-pink-500 rounded-xl text-white transition-all shadow-lg shadow-pink-600/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!input.trim()}
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button Container */}
            <motion.div
                className="flex flex-col items-center gap-2 pointer-events-auto cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
                animate={{
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <div
                    className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 text-white flex items-center justify-center border-2 border-white/20 z-50 shadow-[0_4px_20px_rgba(219,39,119,0.5)] group-hover:shadow-[0_4px_30px_rgba(219,39,119,0.8)] transition-shadow duration-300"
                >
                    <AnimatePresence mode='wait'>
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={28} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Bot size={32} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Text Badge */}
                <div className="bg-[#1a1a2e] border border-pink-500/50 px-4 py-1.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.5)] mt-1 group-hover:border-pink-400 transition-colors">
                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 tracking-wide">
                        Ask Cipher
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default ChatBot;
