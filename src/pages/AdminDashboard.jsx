// src/pages/AdminDashboard.jsx
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRole } from '../app/slices/formSlice';

export default function AdminDashboard() {
  const users = useSelector((state) => state.form.users) || [];
  const dispatch = useDispatch();

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRole({ userId, newRole }));
    alert(`Role for user ${userId} updated to ${newRole}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="border p-4 rounded shadow">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Current Role:</strong> {user.role}</p>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                className="mt-2 border rounded p-1"
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
