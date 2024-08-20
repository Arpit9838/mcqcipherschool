// frontend/src/components/TestDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TestDetails = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`/tests/${testId}`);
        setTest(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTest();
  }, [testId]);

  useEffect(() => {
    if (test) {
      // Initialize answers with empty values
      const initialAnswers = {};
      test.questions.forEach((question) => {
        initialAnswers[question._id] = '';
      });
      setAnswers(initialAnswers);
    }
  }, [test]);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswer(answer);
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmitTest = async () => {
    try {
      await axios.post(`/tests/${testId}/answers`, {
        questions: test.questions.map((question) => question._id),
        answers: Object.values(answers),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Error submitting test');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setCameraStream(stream);
      setShowCamera(true);
    } catch (err) {
      console.error(err);
      setError('Error accessing camera');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      setShowCamera(false);
    }
  };

  const handleFinishTest = () => {
    stopCamera();
    navigate('/tests/finish');
  };

  if (!test) {
    return <div>Loading...</div>;
  }

  const currentQuestion = test.questions[currentQuestionIndex];

  return (
    <div>
      <h2>{test.name}</h2>
      {error && <p className="error">{error}</p>}
      {isSubmitted ? (
        <div>
          <h3>Test Submitted!</h3>
          <p>You will receive your score via email.</p>
          <button onClick={handleFinishTest}>Finish Test</button>
        </div>
      ) : (
        <>
          {showCamera ? (
            <div>
              <video
                srcObject={cameraStream}
                autoPlay
                playsInline
                muted
              />
              <button onClick={stopCamera}>Stop Camera</button>
            </div>
          ) : (
            <button onClick={startCamera}>Start Camera</button>
          )}
          <div>
            <h3>Question {currentQuestionIndex + 1} of {test.questions.length}</h3>
            <p>{currentQuestion.questionText}</p>
            <ul>
              {currentQuestion.options.map((option) => (
                <li key={option}>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerChange(currentQuestion._id, option)}
                  />
                  {option}
                </li>
              ))}
            </ul>
            <button onClick={handlePreviousQuestion}>Previous</button>
            <button onClick={handleNextQuestion}>Next</button>
            <button onClick={handleSubmitTest}>Submit Test</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TestDetails;