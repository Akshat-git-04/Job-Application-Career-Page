// src/steps/PersonalDetailsStep.jsx
import DynamicForm from '../components/form/DynamicForm';
import { personalDetailsSchema } from '../data/formSchemas';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { nextStep } from '../app/slices/formSlice';

export default function PersonalDetailsStep() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(nextStep());
    navigate('/apply/experience');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Step 1: Personal Details</h2>
      <DynamicForm schema={personalDetailsSchema} onSubmit={handleSubmit} />
    </div>
  );
}
