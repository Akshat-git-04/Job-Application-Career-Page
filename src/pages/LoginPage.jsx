// src/pages/LoginPage.jsx
import { useDispatch } from 'react-redux';
import { setRole } from '../app/slices/formSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    dispatch(setRole(role));

    // Redirect based on role
    if (role === 'user') navigate('/apply');
    if (role === 'manager') navigate('/manager/review');
    if (role === 'admin') navigate('/admin/dashboard');
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Login as:</h1>
      <button
        onClick={() => handleLogin('user')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        User
      </button>
      <button
        onClick={() => handleLogin('manager')}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Manager
      </button>
      <button
        onClick={() => handleLogin('admin')}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Admin
      </button>
    </div>
  );
}
