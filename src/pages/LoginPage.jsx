import { useDispatch } from 'react-redux';
import { setRole } from '../app/slices/formSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Users, User } from 'lucide-react';

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

  const buttons = [
    { label: 'Login as Admin', role: 'admin', icon: Shield, color: 'from-red-500 to-pink-600', hover: 'hover:from-red-600 hover:to-pink-700' },
    { label: 'Login as Manager', role: 'manager', icon: Users, color: 'from-yellow-500 to-orange-600', hover: 'hover:from-yellow-600 hover:to-orange-700' },
    { label: 'Login as User', role: 'user', icon: User, color: 'from-green-500 to-emerald-600', hover: 'hover:from-green-600 hover:to-emerald-700' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Job Portal</h1>
        <p className="text-gray-600 mb-8">Select your role to continue</p>

        <div className="space-y-4">
          {buttons.map(({ label, role, icon: Icon, color, hover }) => (
            <motion.button
              key={role}
              onClick={() => handleLogin(role)}
              className={`w-full flex items-center justify-center gap-3 px-5 py-3 text-lg text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r ${color} ${hover} transition`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
              {label}
            </motion.button>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-xs text-gray-500">
            This is a demo application. Choose any role to explore features.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
