import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle, Loader, Download, Plus, Trash2, UserPlus, Users } from 'lucide-react';
import qrCode from '../assets/qr_code.jpeg';

const Register = () => {
    // State for multiple attendees
    const [attendees, setAttendees] = useState([{
        id: 1,
        fullName: '',
        email: '',
        phone: '',
        college: '',
        course: '',
        specialization: '',
        year: '',
        events: [],
        workshops: []
    }]);

    // Common details
    const [transactionId, setTransactionId] = useState('');
    const [file, setFile] = useState(null);

    // UI State
    const [collegeType, setCollegeType] = useState('other'); // 'ceg' or 'other'
    const [status, setStatus] = useState('idle');
    const [rulesAccepted, setRulesAccepted] = useState(false);
    const [message, setMessage] = useState('');
    const [responseIds, setResponseIds] = useState([]);

    const eventOptions = [
        "SQL – Query Quest", "MagicMatix", "Code Mathrix", "Through the Lens",
        "IPL Auction", "Paper Presentation", "GoofyChess", "Math Quiz",
        "Find The Fixed Points", "Mathkinator", "Treasure Hunt"
    ];

    const deadlines = {
        // Start 10:30 -> Close 10:00 AM
        "Code Mathrix": "2026-02-20T10:00:00+05:30",
        "IPL Auction": "2026-02-20T10:00:00+05:30",
        "Math Quiz": "2026-02-20T10:00:00+05:30",

        // Start 11:00 -> Close 10:45
        "SQL – Query Quest": "2026-02-20T10:45:00+05:30",
        "Paper Presentation": "2026-02-20T10:45:00+05:30",

        // Start 11:30 -> Close 11:15
        "MagicMatix": "2026-02-20T11:15:00+05:30",

        // Start 11:40 -> Close 11:25
        "Treasure Hunt": "2026-02-20T11:25:00+05:30",
        "Find The Fixed Points": "2026-02-20T11:25:00+05:30",

        // Start 12:00 -> Close 11:45
        "Mathkinator": "2026-02-20T11:45:00+05:30",
        "GoofyChess": "2026-02-20T11:45:00+05:30",

        // Special
        "Through the Lens": "2026-02-19T10:00:00+05:30"
    };

    const isEventOpen = (eventName) => {
        const deadline = deadlines[eventName];
        if (!deadline) return true; // Open if no deadline defined
        return new Date() < new Date(deadline);
    };

    // Effect to update college for all attendees when type changes
    useEffect(() => {
        setAttendees(prev => prev.map(a => ({
            ...a,
            college: collegeType === 'ceg' ? 'CEG, Anna University' : ''
        })));
    }, [collegeType]);

    // Add new attendee
    const addAttendee = () => {
        setAttendees(prev => [...prev, {
            id: Date.now(),
            fullName: '',
            email: '',
            phone: '',
            college: collegeType === 'ceg' ? 'CEG, Anna University' : '',
            course: '',
            specialization: '',
            year: '',
            events: [],
            workshops: []
        }]);
    };

    // Remove attendee
    const removeAttendee = (id) => {
        if (attendees.length > 1) {
            setAttendees(prev => prev.filter(a => a.id !== id));
        }
    };

    // Handle input change for specific attendee
    const handleAttendeeChange = (id, field, value) => {
        setAttendees(prev => prev.map(a =>
            a.id === id ? { ...a, [field]: value } : a
        ));
    };

    // Handle event selection for specific attendee
    const handleEventChange = (id, event, checked) => {
        setAttendees(prev => prev.map(a => {
            if (a.id !== id) return a;

            const currentEvents = a.events;
            if (checked) {
                if (!isEventOpen(event)) {
                    alert("Registration for this event is closed.");
                    return a;
                }
                if (currentEvents.length >= 3) {
                    alert("Maximum 3 events per person allowed.");
                    return a;
                }
                return { ...a, events: [...currentEvents, event] };
            } else {
                return { ...a, events: currentEvents.filter(e => e !== event) };
            }
        }));
    };

    // Calculate total fee
    // Rate: 60 for CEG, 120 for Other
    const calculateFee = () => {
        const rate = collegeType === 'ceg' ? 60 : 120;
        const totalEvents = attendees.reduce((acc, curr) => acc + curr.events.length, 0);
        return totalEvents * rate;
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('uploading');
        setMessage('');

        try {
            if (!file) throw new Error("Please upload a payment screenshot");
            if (!rulesAccepted) throw new Error("Please accept the rules");

            const submissionData = new FormData();

            // Clean data before sending
            const cleanAttendees = attendees.map(({ id, ...rest }) => ({
                ...rest,
                transactionId: transactionId // Attach unique transaction ID to each
            }));

            submissionData.append('registrations', JSON.stringify(cleanAttendees));
            submissionData.append('screenshot', file);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/register/bulk`, {
                method: 'POST',
                body: submissionData
            });

            const jsonResponse = await response.json();

            if (!response.ok) {
                throw new Error(jsonResponse.detail || "Registration failed");
            }

            setStatus('success');
            setResponseIds(jsonResponse.ids);
            setMessage(`Successfully registered ${jsonResponse.ids.length} attendees!`);

        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
            setMessage(error.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-24 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto glass-card p-6 md:p-8"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 font-tech uppercase tracking-wide">
                        Event Registration
                    </h1>
                    <p className="text-gray-400">Register individually or as a group. One payment for all.</p>
                </div>

                {status === 'success' ? (
                    <div className="text-center py-12">
                        <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">Registration Successful!</h2>

                        <div className="space-y-4 mb-8">
                            <p className="text-gray-300">Generated Mathrix IDs:</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {responseIds.map(id => (
                                    <span key={id} className="bg-white/10 px-4 py-2 rounded-lg font-mono text-pink-400 font-bold border border-white/10">
                                        {id}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => window.location.reload()} className="btn bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-bold transition-all">
                            Register More
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* 1. College Type Selection (Applies to all) */}
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Users className="text-pink-400" />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Step 1: College Category
                                </span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className={`p-4 rounded-xl border cursor-pointer transition-all ${collegeType === 'ceg' ? 'bg-pink-500/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                                    <input type="radio" name="collegeType" value="ceg" checked={collegeType === 'ceg'} onChange={() => setCollegeType('ceg')} className="hidden" />
                                    <div className="text-center font-bold text-lg">CEG Student</div>
                                    <div className="text-center text-sm opacity-70 mt-1">₹60 / Event</div>
                                </label>
                                <label className={`p-4 rounded-xl border cursor-pointer transition-all ${collegeType === 'other' ? 'bg-pink-500/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                                    <input type="radio" name="collegeType" value="other" checked={collegeType === 'other'} onChange={() => setCollegeType('other')} className="hidden" />
                                    <div className="text-center font-bold text-lg">Other College</div>
                                    <div className="text-center text-sm opacity-70 mt-1">₹120 / Event</div>
                                </label>
                            </div>
                        </div>

                        {/* 2. Instructions */}
                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl space-y-4">
                            <h4 className="font-bold text-yellow-200 flex items-center gap-2 text-lg uppercase tracking-wide">
                                <AlertCircle size={20} /> Important Instructions
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 pl-1 leading-relaxed">
                                <li>Participants are permitted to register for a maximum of three events.</li>
                                <li>It is the responsibility of the participants to verify that the scheduled events do not overlap in schedule.</li>
                                <li>Kindly refer the schedule before submission.</li>
                                <li>Registration fee is non-refundable.</li>
                            </ul>
                            <label className="flex items-center gap-3 p-4 bg-black/20 rounded-xl cursor-pointer hover:bg-black/30 transition-colors border border-white/5 select-none text-white group">
                                <input
                                    type="checkbox"
                                    checked={rulesAccepted}
                                    onChange={(e) => setRulesAccepted(e.target.checked)}
                                    className="form-checkbox h-5 w-5 text-pink-500 rounded border-gray-600 bg-gray-700 focus:ring-0 cursor-pointer group-hover:border-pink-500 transition-colors"
                                />
                                <span className="font-medium">I have read the instructions and agree to the rules.</span>
                            </label>
                        </div>

                        {/* 3. Attendees List */}
                        <div className={`space-y-6 ${!rulesAccepted ? 'opacity-50 pointer-events-none grayscale' : ''} transition-all duration-300`}>
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <UserPlus className="text-purple-400" />
                                    Step 2: Attendee Details
                                </h3>
                                <button
                                    type="button"
                                    onClick={addAttendee}
                                    className="btn btn-outline text-sm px-4 py-2 flex items-center gap-2 hover:bg-white/10"
                                >
                                    <Plus size={16} /> Add Another Person
                                </button>
                            </div>

                            <AnimatePresence>
                                {attendees.map((attendee, index) => (
                                    <motion.div
                                        key={attendee.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-600" />

                                        <div className="flex justify-between items-start mb-6">
                                            <h4 className="text-lg font-bold text-gray-200">Attendee #{index + 1}</h4>
                                            {attendees.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeAttendee(attendee.id)}
                                                    className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">Full Name</label>
                                                <input required type="text" value={attendee.fullName} onChange={(e) => handleAttendeeChange(attendee.id, 'fullName', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">Email</label>
                                                <input required type="email" value={attendee.email} onChange={(e) => handleAttendeeChange(attendee.id, 'email', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="john@example.com" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">Phone</label>
                                                <input required type="tel" value={attendee.phone} onChange={(e) => handleAttendeeChange(attendee.id, 'phone', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="+91 98765 43210" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">Year</label>
                                                <select required value={attendee.year} onChange={(e) => handleAttendeeChange(attendee.id, 'year', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all [&>option]:text-black">
                                                    <option value="" disabled>Select Year</option>
                                                    <option value="1">1st Year</option>
                                                    <option value="2">2nd Year</option>
                                                    <option value="3">3rd Year</option>
                                                    <option value="4">4th Year</option>
                                                    <option value="5">5th Year</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">Course</label>
                                                <input required type="text" value={attendee.course} onChange={(e) => handleAttendeeChange(attendee.id, 'course', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="B.E. / B.Tech" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">Specialization</label>
                                                <input required type="text" value={attendee.specialization} onChange={(e) => handleAttendeeChange(attendee.id, 'specialization', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="CSE" />
                                            </div>
                                            {collegeType === 'other' && (
                                                <div className="space-y-1 md:col-span-2">
                                                    <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">College Name</label>
                                                    <input required type="text" value={attendee.college} onChange={(e) => handleAttendeeChange(attendee.id, 'college', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="College Name" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-gray-300 text-sm font-medium">Select Events (Max 3)</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                                {eventOptions.map(event => {
                                                    const isSelected = attendee.events.includes(event);
                                                    const isEventClosed = !isEventOpen(event);
                                                    const isMaxReached = attendee.events.length >= 3;
                                                    const isDisabled = (isMaxReached && !isSelected) || isEventClosed;

                                                    return (
                                                        <label key={event} className={`flex items-center space-x-2 p-2 rounded-lg border text-sm cursor-pointer transition-all ${isSelected ? 'bg-pink-500/20 border-pink-500/50 text-white' : 'border-white/5 text-gray-400 hover:bg-white/5'} ${isDisabled ? 'opacity-50 cursor-not-allowed bg-black/20' : ''}`}>
                                                            <input
                                                                type="checkbox"
                                                                value={event}
                                                                checked={isSelected}
                                                                onChange={(e) => handleEventChange(attendee.id, event, e.target.checked)}
                                                                disabled={isDisabled}
                                                                className="hidden"
                                                            />
                                                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-pink-500 border-pink-500' : 'border-gray-500'} ${isEventClosed ? 'border-gray-700 bg-gray-800' : ''}`}>
                                                                {isSelected && <CheckCircle size={12} className="text-white" />}
                                                            </div>
                                                            <span className={isEventClosed ? "line-through text-gray-600" : ""}>{event} {isEventClosed && <span className="text-red-500/80 text-xs ml-1 no-underline decoration-0 font-bold">(Closed)</span>}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* 4. Payment Section */}
                        <div className={`bg-white/5 p-8 rounded-2xl border border-white/10 space-y-8 ${!rulesAccepted ? 'opacity-50 pointer-events-none grayscale' : ''} transition-all duration-300`}>
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                                Step 3: Payment
                            </h3>

                            <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-black/20 p-6 rounded-xl">
                                <div className="text-center md:text-left">
                                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Registration Fee</p>
                                    <p className="text-5xl font-mono font-bold text-white">₹{calculateFee()}</p>
                                    <p className="text-sm text-gray-500 mt-2">{attendees.length} Attendees • {collegeType === 'ceg' ? '₹60' : '₹120'} / Event</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-white p-2 rounded-xl w-40 h-40 mb-2">
                                        <img src={qrCode} alt="QR" className="w-full h-full object-contain" />
                                    </div>
                                    <p className="text-white font-mono font-bold text-sm bg-white/10 px-3 py-1 rounded-lg mb-4">mathrix.ceg@okaxis</p>

                                    {/* Bank Details */}
                                    <div className="text-left text-xs text-gray-400 bg-white/5 p-3 rounded-lg border border-white/10 w-full max-w-xs">
                                        <p className="font-bold text-gray-300 mb-1 border-b border-white/10 pb-1">Alternative: Bank Transfer</p>
                                        <p><span className="text-gray-500">Acc No:</span> <span className="text-white font-mono">10496975761</span></p>
                                        <p><span className="text-gray-500">Name:</span> <span className="text-white">Mathematics Colloquim</span></p>
                                        <p><span className="text-gray-500">Branch:</span> <span className="text-white">Anna University, Chennai</span></p>
                                        <p><span className="text-gray-500">IFSC:</span> <span className="text-white font-mono">SBIN0006463</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-gray-300 text-sm font-medium ml-1">Transaction ID</label>
                                    <input required type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-all font-mono" placeholder="txn_1234567890" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-300 text-sm font-medium ml-1">Payment Screenshot</label>
                                    <div className="relative">
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
                                        <label htmlFor="file-upload" className={`w-full flex items-center justify-center gap-2 bg-white/5 border border-dashed ${file ? 'border-green-500 text-green-400' : 'border-white/20 text-gray-400'} rounded-xl px-4 py-3 cursor-pointer hover:bg-white/10 transition-all h-[50px]`}>
                                            <Upload size={20} />
                                            <span className="truncate max-w-[200px]">{file ? file.name : "Upload Screenshot (Required)"}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                                <AlertCircle size={20} />
                                <p>{message}</p>
                            </div>
                        )}

                        <button
                            disabled={status === 'uploading' || status === 'submitting' || !rulesAccepted}
                            type="submit"
                            className="w-full btn btn-primary py-4 text-xl font-bold shadow-[0_0_30px_rgba(236,72,153,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                            {status === 'uploading' ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader className="animate-spin" /> Processing Payment...
                                </span>
                            ) : `Pay ₹${calculateFee()} & Register`}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Register;
