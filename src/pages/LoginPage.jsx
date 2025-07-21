// src/pages/LoginPage.jsx
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

//   const handleLogin = () => {
//     // Dummy login for now
//     navigate('/apply/personal');
//   };
const handleLogin = () => {
  navigate('/apply'); // Go to StartOrResume first
};


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Login to Apply
      </button>
    </div>
  );
}
