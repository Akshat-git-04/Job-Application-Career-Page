// src/pages/SuccessPage.jsx
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <motion.div
        className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className="flex justify-center"
        >
          <CheckCircle className="text-green-500 w-16 h-16" />
        </motion.div>

        <h1 className="text-3xl font-bold text-green-600 mt-4">
          Application Submitted!
        </h1>
        <p className="mt-3 text-gray-700 text-lg">
          Thank you for applying. We’ll be in touch soon.
        </p>

        <motion.button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl font-medium transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
