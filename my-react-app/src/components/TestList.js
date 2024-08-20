// frontend/src/components/TestList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TestList = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('/tests');
        setTests(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTests();
  }, []);

  return (
    <div>
      <h2>Available Tests</h2>
      <ul>
        {tests.map((test) => (
          <li key={test._id}>
            <Link to={`/tests/${test._id}`}>{test.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/tests/create">Create New Test</Link>
    </div>
  );
};

export default TestList;