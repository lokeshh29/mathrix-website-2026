import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, FileText, AlertCircle, Loader } from 'lucide-react';

const Ticket = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error, notfound
    const [errorMsg, setErrorMsg] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim() || query.trim().length < 3) {
            setErrorMsg('Please enter at least 3 characters');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMsg('');
        setResults([]);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ticket/search?q=${encodeURIComponent(query.trim())}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || 'Search failed');
            }

            if (data.results.length === 0) {
                setStatus('notfound');
            } else {
                setResults(data.results);
                setStatus('success');
            }
        } catch (err) {
            setErrorMsg(err.message);
            setStatus('error');
        }
    };

    const handleDownload = (mathrixId) => {
        window.open(`${import.meta.env.VITE_API_URL}/ticket/${mathrixId}`, '_blank');
    };

    return (
        <div className="container mx-auto px-4 py-32 min-h-screen flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    Download Your <span className="text-pink-500">Ticket</span>
                </h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    Enter your Mathrix ID or registered phone number to download your admission ticket.
                </p>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSearch}
                className="w-full max-w-lg mb-10"
            >
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Enter Mathrix ID or Phone Number"
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white text-lg focus:outline-none focus:border-pink-500/50 transition-colors"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn btn-primary px-6 py-4 rounded-xl flex items-center gap-2 text-lg"
                    >
                        {status === 'loading' ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
                        Search
                    </button>
                </div>
            </motion.form>

            {/* Results */}
            {status === 'loading' && (
                <div className="text-gray-400 flex items-center gap-2">
                    <Loader className="animate-spin" size={20} />
                    Searching...
                </div>
            )}

            {status === 'notfound' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-8 text-center max-w-md"
                >
                    <AlertCircle className="mx-auto text-yellow-400 mb-4" size={40} />
                    <h3 className="text-xl font-bold text-white mb-2">No Results Found</h3>
                    <p className="text-gray-400">
                        No registration found for "<span className="text-pink-400">{query}</span>".
                        Please check your Mathrix ID or phone number and try again.
                    </p>
                </motion.div>
            )}

            {status === 'error' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-6 text-center max-w-md border border-red-500/20"
                >
                    <AlertCircle className="mx-auto text-red-400 mb-3" size={32} />
                    <p className="text-red-300">{errorMsg}</p>
                </motion.div>
            )}

            {status === 'success' && results.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-2xl space-y-4"
                >
                    <p className="text-gray-400 text-sm mb-2">
                        Found {results.length} registration{results.length > 1 ? 's' : ''}
                    </p>
                    {results.map((reg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/5"
                        >
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-1">{reg.fullName}</h3>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <span className="text-pink-400 font-mono text-sm bg-pink-500/10 px-2 py-0.5 rounded">
                                        MID: {reg.mathrixId}
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        {reg.college}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {(reg.events || []).map((ev, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/20">
                                            {ev}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => handleDownload(reg.mathrixId)}
                                className="btn btn-primary px-5 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap"
                            >
                                <FileText size={18} />
                                Download Ticket
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Ticket;
