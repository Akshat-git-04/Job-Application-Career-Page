// src/pages/JobApplicationForm.jsx
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { prevStep } from '../app/slices/formSlice';
import ProgressBar from '../components/form/ProgressBar';
import StepNavigator from '../components/form/StepNavigator';
import { FileText, ChevronLeft } from 'lucide-react';

import StartOrResume from './StartOrResume';
import PersonalDetailsStep from '../steps/PersonalDetailsStep';
import ExperienceStep from '../steps/ExperienceStep';
import ReviewStep from '../steps/ReviewStep';

const steps = [
  { id: 0, label: 'Personal Details', path: 'personal' },
  { id: 1, label: 'Experience', path: 'experience' },
  { id: 2, label: 'Review & Submit', path: 'review' },
];

export default function JobApplicationForm() {
  const { step } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    if (step > 0) {
      dispatch(prevStep());
      navigate(`/apply/${steps[step - 1].path}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Floating background blobs for a dynamic feel */}
      <motion.div
        className="absolute -top-32 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        className="relative max-w-3xl mx-auto p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <FileText className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Job Application
            </h1>
            <p className="text-gray-600 mt-2">Fill out your details to apply</p>
          </div>
        </motion.div>

        {/* Progress Bar */}
        {step >= 0 && (
          <motion.div
            className="mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          >
            <ProgressBar totalSteps={steps.length} currentStep={step} />
          </motion.div>
        )}

        {/* Form Card */}
        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<StartOrResume />} />
            <Route path="personal" element={<PersonalDetailsStep />} />
            <Route path="experience" element={<ExperienceStep />} />
            <Route path="review" element={<ReviewStep />} />
          </Routes>
        </motion.div>

        {/* Step Navigation */}
        {step > 0 && (
          <motion.div
            className="mt-6 flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StepNavigator currentStep={step} totalSteps={steps.length} onBack={handleBack} />
            <ChevronLeft className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">Go back to previous step</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
