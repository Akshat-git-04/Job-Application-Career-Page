import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function StepNavigator({ currentStep, onBack }) {
  return (
    <motion.div
      className="flex justify-start mt-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.button
        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl shadow hover:shadow-lg disabled:opacity-50 transition"
        onClick={onBack}
        disabled={currentStep === 0}
        whileHover={{ scale: currentStep > 0 ? 1.05 : 1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} />
        Back
      </motion.button>
    </motion.div>
  );
}
