import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FormComponent from './components/FormComponent';
import AdminPanel from './components/AdminPanel'; // Import your new AdminPanel component
import FacultyPanel from './components/FacultyPanel'; // Import your new FacultyPanel component
import './App.css'; // Import your CSS file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/:userType" element={<FormComponent />} />
        <Route path="/panel/admin" element={<AdminPanel />} /> {/* Admin Panel route */}
        <Route path="/panel/faculty" element={<FacultyPanel />} /> {/* Faculty Panel route */}
      </Routes>
    </Router>
  );
}

export default App;
