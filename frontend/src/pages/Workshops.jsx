import React from 'react';
import { motion } from 'framer-motion';


const Workshops = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Workshops</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Deep dive into the world of technology and mathematics with our hands-on workshops.
                </p>
            </motion.div>


        </div>
    );
};

export default Workshops;
