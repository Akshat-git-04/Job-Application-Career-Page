import { motion } from 'framer-motion';

export default function ProgressBar({ totalSteps, currentStep }) {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </div>
  );
}
