// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobApplicationForm from './pages/JobApplicationForm';
import LoginPage from './pages/LoginPage';
import SuccessPage from './pages/SuccessPage';
import StartOrResume from './pages/StartOrResume';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/apply" element={<StartOrResume />} />  {/* Show this first */}
        <Route path="/apply/*" element={<JobApplicationForm />} /> {/* Form steps */}
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
