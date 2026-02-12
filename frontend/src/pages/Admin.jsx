import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Search, Download, Filter, RefreshCw, Trash2 } from 'lucide-react';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('All');

    // Extract unique events for the filter dropdown
    const allEvents = ['All', ...new Set(registrations.flatMap(reg => reg.events || []))];

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Verify password by attempting to fetch data
            await fetchRegistrations(password);
            setIsAuthenticated(true);
        } catch (err) {
            setError('Invalid Password or Server Error');
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchRegistrations = async (secret = password) => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/registrations?secret=${secret}`);
            if (res.status === 401) throw new Error('Invalid Password');
            if (!res.ok) throw new Error('Failed to fetch data');
            const data = await res.json();
            setRegistrations(data.registrations);
        } catch (err) {
            setError(err.message);
            throw err; // Propagate error to handleLogin
        } finally {
            setLoading(false);
        }
    };

    const filteredRegistrations = registrations.filter(reg => {
        const matchesSearch =
            reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.phone.includes(searchTerm) ||
            reg.transactionId.includes(searchTerm);

        const matchesEvent = selectedEvent === 'All' || (reg.events || []).includes(selectedEvent);

        return matchesSearch && matchesEvent;
    });

    const downloadCSV = () => {
        const headers = ["Full Name", "Email", "Phone", "College", "Dept", "Year", "Events", "Transaction ID", "Screenshot URL", "Timestamp"];
        const rows = filteredRegistrations.map(reg => [
            reg.fullName,
            reg.email,
            reg.phone,
            reg.college,
            reg.dept,
            reg.year,
            (reg.events || []).join(', '),
            reg.transactionId,
            reg.screenshotUrl,
            reg.timestamp
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "mathrix_registrations.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async (transactionId) => {
        if (!window.confirm("Are you sure you want to delete this registration? This action cannot be undone.")) {
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/registrations/${transactionId}?secret=${password}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error('Failed to delete');

            // Refresh list
            fetchRegistrations(password);
            alert("Registration deleted successfully");
        } catch (err) {
            alert("Error deleting registration: " + err.message);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-32 min-h-screen flex justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-10 max-w-md w-full text-center"
                >
                    <div className="mx-auto w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-6">
                        <Lock className="text-pink-500" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-6">Admin Access</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button type="submit" className="w-full btn btn-primary py-3">Login</button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-24 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-white">Registrations <span className="text-pink-500 text-lg">({registrations.length})</span></h1>
                <div className="flex gap-4">
                    <button onClick={fetchRegistrations} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white" title="Refresh">
                        <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                    </button>
                    <button onClick={downloadCSV} className="btn bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30 flex items-center gap-2">
                        <Download size={18} /> Export CSV
                    </button>
                </div>
            </div>

            <div className="glass-card p-6 mb-8 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or transaction ID..."
                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-pink-500/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative w-full md:w-64">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-pink-500/50 appearance-none cursor-pointer"
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                    >
                        {allEvents.map((event, index) => (
                            <option key={index} value={event} className="bg-gray-900 text-white">
                                {event}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 font-medium">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Contact</th>
                                <th className="p-4">College/Dept</th>
                                <th className="p-4">Events</th>
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-gray-300">
                            {filteredRegistrations.map((reg, index) => (
                                <tr key={index} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-white">{reg.fullName}</div>
                                    </td>
                                    <td className="p-4">
                                        <div>{reg.email}</div>
                                        <div className="text-sm opacity-70">{reg.phone}</div>
                                    </td>
                                    <td className="p-4">
                                        <div>{reg.college}</div>
                                        <div className="text-sm opacity-70">{reg.dept} • Year {reg.year}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                            {(reg.events || []).map((ev, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-pink-500/20 text-pink-300 rounded text-xs border border-pink-500/20">{ev}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-mono text-sm">{reg.transactionId}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {reg.screenshotUrl && (
                                                <a href={reg.screenshotUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm" title="View Screenshot">
                                                    View
                                                </a>
                                            )}
                                            <button
                                                onClick={() => handleDelete(reg.transactionId)}
                                                className="text-red-400 hover:text-red-300 transition-colors p-1"
                                                title="Delete Registration"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredRegistrations.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">
                                        No registrations found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;
