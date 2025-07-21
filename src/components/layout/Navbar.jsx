import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/slices/formSlice';

export default function Navbar() {
  const role = useSelector((state) => state.form.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="flex gap-6 p-4 bg-gray-100 shadow items-center">
      <Link to="/apply" className="font-semibold text-blue-600">Home</Link>

      {role === 'manager' && (
        <Link to="/manager/review" className="text-green-600">Review Applications</Link>
      )}

      {role === 'admin' && (
        <>
          <Link to="/admin/dashboard" className="text-red-600">Dashboard</Link>
          <Link to="/admin/logs" className="text-purple-600">Audit Logs</Link>
        </>
      )}

      <button
        onClick={handleLogout}
        className="ml-auto bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
