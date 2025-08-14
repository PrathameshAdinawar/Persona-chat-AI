import { motion } from "framer-motion";

export default function GlassCard({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`backdrop-blur-md bg-white/60 dark:bg-gray-800/60 rounded-xl shadow-lg p-6 border border-white/30 dark:border-gray-700/30 ${className}`}
    >
      {children}
    </motion.div>
  );
}
