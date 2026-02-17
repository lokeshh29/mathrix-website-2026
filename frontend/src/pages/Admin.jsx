import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Search, Download, Filter, RefreshCw, Trash2, ChevronDown } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('All');
    const [sortOrder, setSortOrder] = useState('desc');

    const [selectedImage, setSelectedImage] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [deletePasswordInput, setDeletePasswordInput] = useState("");
    const [showExportMenu, setShowExportMenu] = useState(false);

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
    }).sort((a, b) => {
        const dateA = new Date(a.timestamp || 0);
        const dateB = new Date(b.timestamp || 0);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    const handleExport = (targetEvent) => {
        let exportData = [];
        let title = "Mathrix Registrations";
        let filename = "mathrix_registrations.pdf";

        if (targetEvent === "current") {
            exportData = filteredRegistrations;
            title = "Mathrix Registrations (Filtered View)";
        } else {
            // Filter all registrations for the specific event
            exportData = registrations.filter(reg => (reg.events || []).includes(targetEvent));
            title = `Mathrix Registrations - ${targetEvent}`;
            filename = `mathrix_${targetEvent.replace(/\s+/g, '_')}.pdf`;
        }

        // Use Landscape orientation
        const doc = new jsPDF({ orientation: 'landscape' });

        // Add Title
        doc.setFontSize(18);
        doc.text(title, 14, 22);

        // Add Date
        doc.setFontSize(11);
        doc.setTextColor(100);
        const dateStr = new Date().toLocaleString();
        doc.text(`Generated on: ${dateStr}`, 14, 28);

        // Define Columns
        const columns = [
            { header: 'S.No', dataKey: 'sno' },
            { header: 'MID', dataKey: 'mathrixId' },
            { header: 'Full Name', dataKey: 'fullName' },
            { header: 'Email', dataKey: 'email' },
            { header: 'Phone', dataKey: 'phone' },
            { header: 'College', dataKey: 'college' },
            { header: 'Specialization', dataKey: 'specialization' },
            { header: 'Txn ID', dataKey: 'transactionId' },
            { header: 'Events', dataKey: 'events' },
        ];

        // Format Data Rows
        const rows = exportData.map((reg, index) => ({
            sno: index + 1,
            mathrixId: reg.mathrixId || '-',
            fullName: reg.fullName,
            email: reg.email,
            phone: reg.phone,
            college: reg.college,
            specialization: reg.specialization,
            transactionId: reg.transactionId,
            events: (reg.events || []).join(', ')
        }));

        // Generate Table
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: rows.map(row => columns.map(col => row[col.dataKey])),
            startY: 35,
            styles: { fontSize: 9, cellPadding: 3, overflow: 'linebreak' },
            headStyles: { fillColor: [236, 72, 153], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            columnStyles: {
                0: { cellWidth: 15, halign: 'center' }, // S.No
                1: { cellWidth: 20, halign: 'center' }, // MID
                2: { cellWidth: 35 }, // Full Name
                3: { cellWidth: 55 }, // Email
                4: { cellWidth: 25 }, // Phone
                5: { cellWidth: 45 }, // College
                6: { cellWidth: 25 }, // Specialization
                7: { cellWidth: 30 }, // Txn ID
                8: { cellWidth: 'auto' } // Events (Remaining space)
            },
            margin: { top: 35, left: 14, right: 14 }
        });

        // Save PDF
        doc.save(filename);
        setShowExportMenu(false);
    };

    const initiateDelete = (transactionId) => {
        setDeleteId(transactionId);
        setDeletePasswordInput("");
    };

    const confirmDelete = async () => {
        const secret = import.meta.env.VITE_DELETE_PASSWORD || "12345";
        if (deletePasswordInput !== secret) {
            alert("Incorrect Deletion Password!");
            return;
        }

        // Proceed with deletion
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/registrations/${encodeURIComponent(deleteId)}?secret=${password}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const errorText = await res.text();
                try {
                    const errorJson = JSON.parse(errorText);
                    throw new Error(errorJson.detail || 'Failed to delete');
                } catch (e) {
                    throw new Error(errorText || `Failed to delete (Status: ${res.status})`);
                }
            }

            // Refresh list
            fetchRegistrations(password);
            alert("Registration deleted successfully");
            setDeleteId(null);
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
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn btn-primary py-3 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="animate-spin" size={20} />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }


    return (
        <div className="container mx-auto px-4 py-24 min-h-screen">
            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-pink-500 transition-colors p-2"
                            onClick={() => setSelectedImage(null)}
                        >
                            <Trash2 className="rotate-45" size={32} /> {/* Using Trash2 rotated as close icon or import X */}
                        </button>
                        <img
                            src={selectedImage}
                            alt="Payment Screenshot"
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <a
                            href={selectedImage}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Download size={20} /> Download Original
                        </a>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <div className="bg-[#0f0518] border border-red-500/30 p-8 rounded-2xl max-w-sm w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Trash2 className="text-red-500" /> Confirm Delete
                        </h3>
                        <p className="text-gray-400 mb-6 text-sm">
                            Enter the deletion password to permanently remove this registration. This action cannot be undone.
                        </p>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 mb-6"
                            value={deletePasswordInput}
                            onChange={(e) => setDeletePasswordInput(e.target.value)}
                        />
                        <div className="flex gap-4">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 transition-colors font-bold"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-white">Registrations <span className="text-pink-500 text-lg">({registrations.length})</span></h1>
                <div className="flex gap-4">
                    <button onClick={fetchRegistrations} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white" title="Refresh">
                        <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setShowExportMenu(!showExportMenu)}
                            className="btn bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30 flex items-center gap-2"
                        >
                            <Download size={18} /> Export PDF <ChevronDown size={16} />
                        </button>

                        {showExportMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-[#0f0518] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                                <button
                                    onClick={() => handleExport('current')}
                                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    Current View
                                </button>
                                <div className="h-px bg-white/10 my-1"></div>
                                <div className="max-h-60 overflow-y-auto">
                                    {allEvents.filter(e => e !== 'All').map((event, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleExport(event)}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            {event}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
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
                <div className="relative w-full md:w-48">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-pink-500/50 appearance-none cursor-pointer"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="desc" className="bg-gray-900 text-white">Newest First</option>
                        <option value="asc" className="bg-gray-900 text-white">Oldest First</option>
                    </select>
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
                                <th className="p-4">S.No</th>
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
                                <tr key={index}>
                                    <td className="p-4">
                                        <div className="text-gray-400">{index + 1}</div>
                                    </td>
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
                                                <button
                                                    onClick={() => setSelectedImage(reg.screenshotUrl)}
                                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                                                >
                                                    View
                                                </button>
                                            )}
                                            <button
                                                onClick={() => initiateDelete(reg.transactionId)}
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
                                    <td colSpan="7" className="p-8 text-center text-gray-500">
                                        No registrations found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default Admin;
