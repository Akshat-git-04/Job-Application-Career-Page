import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/slices/formSlice';
import { motion } from 'framer-motion';

export default function Navbar() {
  const role = useSelector((state) => state.form.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const linkClasses =
    'font-semibold px-3 py-2 rounded-lg transition text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500';

  return (
    <motion.nav
      className="flex gap-6 p-4 bg-white/70 backdrop-blur-md shadow-md rounded-xl items-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to="/apply" className={`${linkClasses} text-blue-600`}>
        Home
      </Link>

      {(role === 'manager' || role === 'admin') && (
        <Link to="/manager/review" className={`${linkClasses} text-green-600`}>
            Review Applications
        </Link>
        )}


      {role === 'admin' && (
        <>
          <Link to="/admin/dashboard" className={`${linkClasses} text-red-600`}>
            Dashboard
          </Link>
          <Link to="/admin/logs" className={`${linkClasses} text-purple-600`}>
            Audit Logs
          </Link>
        </>
      )}

      <motion.button
        onClick={handleLogout}
        className="ml-auto px-5 py-2 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 font-medium rounded-lg shadow hover:shadow-lg transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Logout
      </motion.button>
    </motion.nav>
  );
}
