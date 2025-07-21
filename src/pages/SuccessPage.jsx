// src/pages/SuccessPage.jsx
import { useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">Application Submitted!</h1>
      <p className="mt-4">Thank you for applying. We’ll be in touch soon.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Home
      </button>
    </div>
  );
}
