import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { updateUserRole } from '../app/slices/formSlice';
import { Users, Shield, Settings, ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';

export default function AdminDashboard() {
  const users = useSelector((state) => state.form.users) || [];
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(null);

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRole({ userId, newRole }));
    setNotification({ type: 'success', message: `Role updated to ${newRole}` });
    setTimeout(() => setNotification(null), 3000);
  };

  const roleColors = {
    user: 'bg-blue-50 border-blue-200 text-blue-800',
    manager: 'bg-purple-50 border-purple-200 text-purple-800',
    admin: 'bg-red-50 border-red-200 text-red-800'
  };

  const roleIcons = {
    user: Users,
    manager: Settings,
    admin: Shield
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Floating background blobs */}
      <motion.div
        className="absolute -top-32 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        className="relative max-w-3xl mx-auto p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage user roles and permissions</p>
          </div>
        </motion.div>

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
                notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white flex items-center gap-3`}
              initial={{ opacity: 0, y: -50, x: 100 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -50, x: 100 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Check className="w-5 h-5" />
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Users Card */}
        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {users.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700">No Users Found</h3>
              <p className="text-gray-500 text-sm mt-1">
                Users will appear here once they register.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {users.map((user) => {
                const RoleIcon = roleIcons[user.role];
                return (
                  <div
                    key={user.id}
                    className="p-4 bg-white/80 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-500">ID: {user.id}</p>
                      </div>
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${roleColors[user.role]}`}
                      >
                        <RoleIcon className="w-4 h-4" />
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Change Role
                      </label>
                      <div className="relative">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="user">👤 User</option>
                          <option value="manager">⚙️ Manager</option>
                          <option value="admin">🛡️ Admin</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
