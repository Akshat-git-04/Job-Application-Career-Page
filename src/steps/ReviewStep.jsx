// src/steps/ReviewStep.jsx
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ReviewStep() {
  const formData = useSelector((state) => state.form.data);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Here you could send formData to a backend
    navigate('/success');
  };

  // Helper: Format field labels
  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1') // split camelCase
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 3: Review & Submit</h2>
      <div className="bg-gray-50 p-4 rounded shadow space-y-3">
        {Object.entries(formData).map(([key, value]) => (
  <div
    key={key}
    className="flex justify-between border-b pb-2 last:border-0"
  >
    <span className="font-medium">{formatLabel(key)}</span>
    <span>
      {key === 'resume'
        ? formData.resume?.name || formData.resume || 'Not uploaded'
        : key === 'dob'
        ? new Date(value).toLocaleDateString()
        : value || <span className="text-gray-400">Not provided</span>}
    </span>
  </div>
))}

      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit Application
      </button>
    </div>
  );
}
