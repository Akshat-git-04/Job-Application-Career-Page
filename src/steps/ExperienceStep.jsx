// src/steps/ExperienceStep.jsx
import DynamicForm from '../components/form/DynamicForm';
import { experienceSchema } from '../data/formSchemas';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { nextStep } from '../app/slices/formSlice';

export default function ExperienceStep() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(nextStep());
    navigate('/apply/review');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Step 2: Experience</h2>
      <DynamicForm schema={experienceSchema} onSubmit={handleSubmit} />
    </div>
  );
}
