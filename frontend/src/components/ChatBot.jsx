import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, ChevronRight, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am **Cipher**. How can I assist you with Mathrix 2026 today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input;
        const userMsg = { id: Date.now(), text: userText, sender: 'user' };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");
            const API_URL = `${BASE_URL}/converse`;

            const history = messages.slice(-5).map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                content: msg.text
            }));

            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_query: userText, history: history }),
            });

            const data = await response.json();
            const botResponse = data.answer || "I'm having trouble connecting to my brain right now.";
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);

        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Connection error. Is the backend running?", sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="pointer-events-auto w-[90vw] md:w-[400px] h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans"
                        style={{
                            background: "linear-gradient(135deg, rgba(15, 5, 24, 0.95) 0%, rgba(20, 10, 40, 0.95) 100%)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(168, 85, 247, 0.2)"
                        }}
                    >
                        {/* Header */}
                        <div className="p-4 flex items-center justify-between border-b border-white/10 relative bg-white/5 backdrop-blur-sm">
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30">
                                    <Bot size={22} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
                                        Cipher AI
                                        <Sparkles size={14} />
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                >
                                    <Minimize2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-md backdrop-blur-sm border ${msg.sender === 'user'
                                            ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-none border-transparent shadow-purple-900/20'
                                            : 'bg-white/5 text-gray-100 rounded-bl-none border-white/10'
                                            }`}
                                    >
                                        {msg.sender === 'user' ? (
                                            msg.text
                                        ) : (
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                                                    ul: ({ node, ...props }) => <ul className="list-disc ml-5 mb-3 space-y-1 text-gray-300" {...props} />,
                                                    ol: ({ node, ...props }) => <ol className="list-decimal ml-5 mb-3 space-y-1 text-gray-300" {...props} />,
                                                    li: ({ node, ...props }) => <li className="pl-1 marker:text-pink-500" {...props} />,
                                                    strong: ({ node, ...props }) => <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300" {...props} />,
                                                    code: ({ node, ...props }) => <code className="bg-black/40 px-1.5 py-0.5 rounded text-xs font-mono text-pink-300 border border-pink-500/20" {...props} />,
                                                }}
                                            >
                                                {msg.text.replace(/•/g, '\n-')}
                                            </ReactMarkdown>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything about Mathrix..."
                                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all placeholder:text-gray-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="absolute right-2 p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto group relative flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-pink-500 rounded-full blur-xl opacity-40 group-hover:opacity-75 transition-opacity duration-300" />

                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0f0518] border border-pink-500/50 flex items-center justify-center shadow-2xl z-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <AnimatePresence mode='wait'>
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={28} className="text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Bot size={32} className="text-white" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Badge Label */}
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute right-full mr-4 bg-[#1a1a2e]/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-white font-medium whitespace-nowrap shadow-xl hidden md:block"
                    >
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">Ask Cipher</span>
                        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-[#1a1a2e]/90 border-r border-t border-white/10 transform -translate-y-1/2 rotate-45" />
                    </motion.div>
                )}
            </motion.button>

            {/* Mobile Badge (Below) */}
            {!isOpen && (
                <div className="md:hidden pointer-events-auto bg-[#1a1a2e]/80 backdrop-blur-md border border-pink-500/30 px-4 py-1.5 rounded-full shadow-lg">
                    <span className="text-xs font-bold text-pink-300 tracking-wide uppercase">Ask Cipher</span>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
