import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

const eventsData = [
    {
        id: 1,
        title: 'Code Relay',
        description: 'A team-based coding relay race where speed and logic matter. Pass the baton (keyboard) and conquer the challenge.',
        date: 'March 15, 2026',
        time: '10:00 AM',
        location: 'Lab 1',
        category: 'Technical',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
        id: 2,
        title: 'Math Olympiad',
        description: 'The ultimate test of mathematical prowess. Solve complex problems and prove your mettle.',
        date: 'March 15, 2026',
        time: '11:00 AM',
        location: 'Hall A',
        category: 'Core',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
        id: 3,
        title: 'Crypto Hunt',
        description: 'Decipher clues, crack codes, and uncover the treasure in this cryptography-based scavenger hunt.',
        date: 'March 16, 2026',
        time: '02:00 PM',
        location: 'Campus Wide',
        category: 'Fun',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
];

const Events = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-12 text-center"
            >
                Upcoming Events
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {eventsData.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card overflow-hidden group hover:border-purple-500/50"
                    >
                        <div className="h-48 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent z-10" />
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <span className="absolute top-4 right-4 z-20 bg-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                {event.category}
                            </span>
                        </div>

                        <div className="p-6 relative z-20 -mt-6">
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{event.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{event.description}</p>

                            <div className="flex flex-col gap-2 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-purple-400" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-green-400" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-red-400" />
                                    <span>{event.location}</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 btn btn-outline group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:text-white">
                                Register
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Events;
