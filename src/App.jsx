// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import JobApplicationForm from './pages/JobApplicationForm';
import LoginPage from './pages/LoginPage';
import SuccessPage from './pages/SuccessPage';
import StartOrResume from './pages/StartOrResume';
import ManagerReview from './pages/ManagerReview';
import AdminDashboard from './pages/AdminDashboard';
import AuditLogsPage from './pages/AuditLogsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AbilityProvider } from './context/AbilityContext';
import Navbar from './components/layout/Navbar';
import './App.css';

function LayoutWithNavbar({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === '/'; // hide on login
  return (
    <div>
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AbilityProvider>
        <LayoutWithNavbar>
          <Routes>
            {/* Login */}
            <Route path="/" element={<LoginPage />} />

            {/* User Job Application Form */}
            <Route path="/apply" element={<StartOrResume />} />
            <Route path="/apply/*" element={<JobApplicationForm />} />

            {/* Manager + Admin */}
            <Route
              path="/manager/review"
              element={
                <ProtectedRoute action="read" subject="Application">
                  <ManagerReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute action="manage" subject="all">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/logs"
              element={
                <ProtectedRoute action="manage" subject="all">
                  <AuditLogsPage />
                </ProtectedRoute>
              }
            />

            {/* Success */}
            <Route path="/success" element={<SuccessPage />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </LayoutWithNavbar>
      </AbilityProvider>
    </Router>
  );
}
