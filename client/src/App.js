import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <div className="bg-gray-300 min-h-screen">
        <Routes>
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signup" />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
