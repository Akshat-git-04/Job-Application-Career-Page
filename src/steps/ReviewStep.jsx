import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function ReviewStep() {
  const formData = useSelector((state) => state.form.data);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({});

  const togglePassword = (key) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = () => {
    // Here you could send formData to a backend
    navigate('/success');
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1') 
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 3: Review & Submit</h2>
      <div className="bg-gray-50 p-4 rounded shadow space-y-3">
        {Object.entries(formData).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center border-b pb-2 last:border-0"
          >
            <span className="font-medium">{formatLabel(key)}</span>
            <span className="flex items-center gap-2">
              {key.toLowerCase().includes('password') ? (
                <>
                  <span>
                    {showPassword[key] ? value : '********'}
                  </span>
                  <button
                    type="button"
                    onClick={() => togglePassword(key)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showPassword[key] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </>
              ) : key === 'resume' ? (
                formData.resume?.name || formData.resume || 'Not uploaded'
              ) : key === 'dob' ? (
                new Date(value).toLocaleDateString()
              ) : (
                value || <span className="text-gray-400">Not provided</span>
              )}
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
