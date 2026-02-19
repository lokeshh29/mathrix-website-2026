import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const AnnouncementBar = () => {
    return (
        <div className="fixed top-20 md:top-24 left-0 right-0 z-40 bg-pink-900/90 backdrop-blur-md border-b border-pink-500/30 h-10 flex items-center overflow-hidden">
            <div className="flex items-center gap-4 w-full">
                {/* Static Icon on the left (optional, creates a nice anchor) */}
                <div className="flex-shrink-0 px-4 bg-pink-950/80 h-full flex items-center z-10 border-r border-pink-500/30">
                    <AlertTriangle size={18} className="text-pink-400 animate-pulse" />
                </div>

                {/* Scrolling Text */}
                <div className="flex-grow overflow-hidden relative flex items-center">
                    <motion.div
                        className="whitespace-nowrap flex gap-10 items-center text-white font-semibold text-sm tracking-wide"
                        animate={{
                            x: ["100vw", "-100%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 15, // Faster speed
                                ease: "linear",
                            },
                        }}
                    >
                        {/* Repeat content to ensure smooth loop or just long scroll */}
                        <span>
                            Due to the overwhelming response, on-spot registration is not available.

                        </span>
                        <span className="text-pink-500/50">•</span>
                        <span>
                            For queries, contact: <span className="text-pink-300">mathrix@annauniv.edu</span>
                        </span>
                        <span className="text-pink-500/50">•</span>
                        <span>
                            ⚠️ Due to overwhelming response, <span className="text-pink-300">On-Spot Registration is NOT available.</span>
                        </span>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
