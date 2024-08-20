// frontend/src/components/FinishTest.js
import React from 'react';
import { Link } from 'react-router-dom';

const FinishTest = () => {
  return (
    <div>
      <h2>Test Finished</h2>
      <p>Thank you for taking the test. You will receive your score via email.</p>
      <Link to="/tests">Go to Tests</Link>
    </div>
  );
};

export default FinishTest;