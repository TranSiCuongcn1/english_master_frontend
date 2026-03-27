import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTests } from '../data/tests';
import { useTimer } from '../hooks/useTimer';
import QuestionCard from '../components/QuestionCard';
import { Clock, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './TestTaking.module.css';

const TestTaking: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const test = mockTests.find((t) => t.id === testId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const { formatTime, secondsLeft, start } = useTimer(test?.durationMinutes || 30, () => {
    handleSubmit();
  });

  useEffect(() => {
    start();
  }, [start]);

  if (!test) {
    return <div>Test not found</div>;
  }

  const handleSelectAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [test.questions[currentQuestionIndex].id]: answer,
    });
  };

  const goToNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the test?')) {
      // Save results to local storage or state management
      const result = {
        testId: test.id,
        answers,
        timeTakenSeconds: (test.durationMinutes * 60) - secondsLeft,
        date: new Date().toISOString(),
      };
      localStorage.setItem(`result_${test.id}`, JSON.stringify(result));
      navigate(`/results/${test.id}`);
    }
  };

  const currentQuestion = test.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className={styles.testTaking}>
      <header className={styles.testHeader}>
        <div className={styles.headerMain}>
          <h1 className={styles.testTitle}>{test.title}</h1>
          <div className={styles.timer}>
            <Clock size={20} />
            <span>{formatTime()}</span>
          </div>
        </div>
        <div className={styles.progressBarContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${(answeredCount / test.questions.length) * 100}%` }}
          ></div>
        </div>
      </header>

      <div className={styles.mainLayout}>
        <div className={styles.questionSection}>
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.id]}
            onSelectAnswer={handleSelectAnswer}
            index={currentQuestionIndex}
          />
          
          <div className={styles.navigationButtons}>
            <button 
              className={styles.navButton} 
              onClick={goToPrev} 
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            
            {currentQuestionIndex === test.questions.length - 1 ? (
              <button className={styles.submitButton} onClick={handleSubmit}>
                <Send size={20} />
                Submit Test
              </button>
            ) : (
              <button className={styles.navButton} onClick={goToNext}>
                Next
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h3>Questions</h3>
            <span>{answeredCount}/{test.questions.length} answered</span>
          </div>
          <div className={styles.questionGrid}>
            {test.questions.map((q, idx) => (
              <button
                key={q.id}
                className={`${styles.gridItem} ${
                  currentQuestionIndex === idx ? styles.active : ''
                } ${answers[q.id] ? styles.answered : ''}`}
                onClick={() => setCurrentQuestionIndex(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TestTaking;
