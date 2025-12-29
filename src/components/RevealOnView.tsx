import React from "react";
import { motion } from "framer-motion";

export const RevealOnView: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default RevealOnView;
