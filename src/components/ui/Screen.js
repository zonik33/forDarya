import { motion } from 'framer-motion';

export default function Screen({ children }) {
    return (
        <motion.div
            className="screen"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {children}
        </motion.div>
    );
}