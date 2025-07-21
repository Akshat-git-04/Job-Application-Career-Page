// src/pages/JobApplicationForm.jsx
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { prevStep } from '../app/slices/formSlice';
import ProgressBar from '../components/form/ProgressBar';
import StepNavigator from '../components/form/StepNavigator';

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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Job Application</h1>

      {step >= 0 && <ProgressBar totalSteps={steps.length} currentStep={step} />}

      <div className="mt-6 border p-4 rounded-lg shadow">
        <Routes>
          <Route path="/" element={<StartOrResume />} />
          <Route path="personal" element={<PersonalDetailsStep />} />
          <Route path="experience" element={<ExperienceStep />} />
          <Route path="review" element={<ReviewStep />} />
        </Routes>
      </div>

      {step > 0 && (
        <StepNavigator
          currentStep={step}
          totalSteps={steps.length}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
