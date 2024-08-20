import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TestList from './components/TestList';
import TestDetails from './components/TestDetails';
import FinishTest from './components/FinishTest';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/auth', {
        // headers: {
        //   Authorization: Bearer ${token},
        // },
      })
        .then(res => setUser(res.data.user))
        .catch(err => console.error('Error getting user:', err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        {user ? (
          <div>
            <nav>
              <ul>
                <li>
                  <a href="/tests">Tests</a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/tests" element={<TestList />} />
              <Route path="/tests/:testId" element={<TestDetails />} />
              <Route path="/finish" element={<FinishTest />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;