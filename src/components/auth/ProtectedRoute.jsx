// src/components/auth/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAbility } from '../../context/AbilityContext';

export default function ProtectedRoute({ children, action, subject }) {
  const ability = useAbility();
  const role = useSelector((state) => state.form.role);

  if (!ability.can(action, subject)) {
    return <Navigate to="/403" />;
  }

  return children;
}
