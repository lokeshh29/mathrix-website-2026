import React from 'react';
import { motion } from 'framer-motion';

const scheduleData = [
    {
        day: 'Day 1',
        date: 'Febraury 21',
        events: [
            { time: '09:00 AM', title: 'Inauguration', location: 'Main Audi' },
            { time: '10:00 AM', title: 'Code Relay', location: 'Lab 1' },
            { time: '11:00 AM', title: 'Math Olympiad', location: 'Hall A' },
            { time: '01:00 PM', title: 'Lunch Break', location: 'Cafeteria' },
            { time: '02:00 PM', title: 'Paper Presentation', location: 'Seminar Hall' },
        ]
    },
    {
        day: 'Day 2',
        date: 'Febraury 21',
        events: [
            { time: '09:00 AM', title: 'Workshop: AI in Math', location: 'Lab 2' },
            { time: '12:00 PM', title: 'Guest Lecture', location: 'Seminar Hall' },
            { time: '02:00 PM', title: 'Crypto Hunt', location: 'Campus Wide' },
            { time: '05:00 PM', title: 'Valedictory', location: 'Main Audi' },
        ]
    }
];

const Schedule = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-12 text-center"
            >
                Event Schedule
            </motion.h1>

            <div className="max-w-4xl mx-auto">
                {scheduleData.map((day, dayIndex) => (
                    <motion.div
                        key={dayIndex}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: dayIndex * 0.3 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-3xl font-bold text-purple-400">{day.day}</h2>
                            <span className="text-gray-500 text-xl">// {day.date}</span>
                            <div className="h-px bg-white/10 flex-grow"></div>
                        </div>

                        <div className="relative border-l-2 border-purple-500/20 ml-4 space-y-8 pl-8 pb-4">
                            {day.events.map((event, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-[#0a0a1a] bg-purple-500"></span>
                                    <div className="glass-card p-4 hover:bg-white/5 transition-all">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <h3 className="text-xl font-bold text-white">{event.title}</h3>
                                            <span className="text-purple-300 font-mono text-sm bg-purple-500/10 px-2 py-1 rounded w-fit">
                                                {event.time}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm mt-1">{event.location}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;
