import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTimer } from '../../hooks/useTimer';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import { Clock, Send, ChevronLeft, ChevronRight, Bookmark, Loader2 } from 'lucide-react';
import styles from './TestTaking.module.css';
import type { Test } from '../../types';
import testApi from '../../api/testApi';
import resultApi from '../../api/resultApi';

const TestTaking: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const secondsLeftRef = useRef(0);

  useEffect(() => {
    if (!testId) return;
    testApi.getById(testId)
      .then(res => setTest(res.data))
      .catch(() => setError('Failed to load test. Please try again.'))
      .finally(() => setLoading(false));
  }, [testId]);

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      newSet.has(questionId) ? newSet.delete(questionId) : newSet.add(questionId);
      return newSet;
    });
  };

  const handleFinalSubmit = useCallback(async (isAutoSubmit = false) => {
    if (!test) return;
    if (!isAutoSubmit && !window.confirm('Are you sure you want to submit the test?')) return;

    try {
      const answersPayload = test.questions.map(q => ({
        questionId: q.id,
        selectedAnswer: answers[q.id] || '',
      }));

      const timeTaken = (test.durationMinutes * 60) - secondsLeftRef.current;
      await resultApi.submit({ testId: test.id, timeTakenSeconds: timeTaken, answers: answersPayload });
      navigate(`/results/${test.id}`);
    } catch {
      alert('Failed to submit test. Please try again.');
    }
  }, [test, answers, navigate]);

  const { formatTime, secondsLeft, start } = useTimer(test?.durationMinutes || 30, () => {
    handleFinalSubmit(true);
  });

  useEffect(() => { secondsLeftRef.current = secondsLeft; }, [secondsLeft]);
  useEffect(() => { if (test) start(); }, [test, start]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '12px', color: 'var(--text-secondary)' }}>
      <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
      <span>Loading test...</span>
    </div>
  );

  if (error || !test) return (
    <div style={{ textAlign: 'center', padding: '60px', color: 'var(--error-color)' }}>
      <p>{error || 'Test not found'}</p>
    </div>
  );

  const handleSelectAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [test.questions[currentQuestionIndex].id]: answer }));
  };

  const currentQuestion = test.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className={styles.testTaking}>
      <header className={styles.testHeader}>
        <div className={styles.headerMain}>
          <div className={styles.titleInfo}>
            <h1 className={styles.testTitle}>{test.title}</h1>
            <span className={styles.categoryBadge}>{test.category}</span>
          </div>
          <div className={styles.timer}>
            <Clock size={20} />
            <span className={secondsLeft < 300 ? styles.timerWarning : ''}>{formatTime()}</span>
          </div>
        </div>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${(answeredCount / test.questions.length) * 100}%` }} />
        </div>
      </header>

      <div className={styles.mainLayout}>
        <div className={styles.questionSection}>
          <div className={styles.questionActions}>
            <button
              className={`${styles.flagButton} ${flaggedQuestions.has(currentQuestion.id) ? styles.flagged : ''}`}
              onClick={() => toggleFlag(currentQuestion.id)}
            >
              <Bookmark size={20} fill={flaggedQuestions.has(currentQuestion.id) ? 'currentColor' : 'none'} />
              {flaggedQuestions.has(currentQuestion.id) ? 'Flagged' : 'Flag Question'}
            </button>
          </div>

          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.id]}
            onSelectAnswer={handleSelectAnswer}
            index={currentQuestionIndex}
          />

          <div className={styles.navigationButtons}>
            <button className={styles.navButton} onClick={() => setCurrentQuestionIndex(i => i - 1)} disabled={currentQuestionIndex === 0}>
              <ChevronLeft size={20} /> Previous
            </button>
            <div className={styles.navCenter}>
              <span>{currentQuestionIndex + 1} of {test.questions.length}</span>
            </div>
            {currentQuestionIndex === test.questions.length - 1 ? (
              <button className={styles.submitButton} onClick={() => handleFinalSubmit(false)}>
                <Send size={20} /> Submit Test
              </button>
            ) : (
              <button className={styles.navButton} onClick={() => setCurrentQuestionIndex(i => i + 1)}>
                Next <ChevronRight size={20} />
              </button>
            )}
          </div>

          <div className={styles.bottomNavigation}>
            <div className={styles.gridHeader}>
              <h3>Review Questions</h3>
              <span>{answeredCount}/{test.questions.length} Answered</span>
            </div>
            <div className={styles.questionGrid}>
              {test.questions.map((q, idx) => (
                <button
                  key={q.id}
                  className={`${styles.gridItem} ${currentQuestionIndex === idx ? styles.active : ''} ${answers[q.id] ? styles.answered : ''} ${flaggedQuestions.has(q.id) ? styles.gridFlagged : ''}`}
                  onClick={() => setCurrentQuestionIndex(idx)}
                >
                  {idx + 1}
                  {flaggedQuestions.has(q.id) && <div className={styles.flagDot} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTaking;
