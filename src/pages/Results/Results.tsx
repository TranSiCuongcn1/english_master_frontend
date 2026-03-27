import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockTests } from '../data/tests';
import { CheckCircle2, XCircle, RotateCcw, Home as HomeIcon } from 'lucide-react';
import styles from './Results.module.css';

const Results: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const test = mockTests.find((t) => t.id === testId);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem(`result_${testId}`);
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, [testId]);

  if (!test || !result) {
    return <div>Result not found.</div>;
  }

  const correctCount = test.questions.reduce((acc, q) => {
    return result.answers[q.id] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  const scorePercentage = Math.round((correctCount / test.questions.length) * 100);

  return (
    <div className={styles.results}>
      <header className={styles.header}>
        <div className={styles.scoreCard}>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreValue}>{scorePercentage}%</span>
            <span className={styles.scoreLabel}>Final Score</span>
          </div>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{correctCount}/{test.questions.length}</span>
              <span className={styles.statLabel}>Correct</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{Math.floor(result.timeTakenSeconds / 60)}m {result.timeTakenSeconds % 60}s</span>
              <span className={styles.statLabel}>Time Spent</span>
            </div>
          </div>
        </div>
        
        <div className={styles.actions}>
          <Link to={`/test/${test.id}`} className={styles.retryButton}>
            <RotateCcw size={20} />
            Try Again
          </Link>
          <Link to="/" className={styles.homeButton}>
            <HomeIcon size={20} />
            Back to Home
          </Link>
        </div>
      </header>

      <section className={styles.reviewSection}>
        <h2 className={styles.sectionTitle}>Question Review</h2>
        <div className={styles.questionList}>
          {test.questions.map((q, idx) => {
            const userAnswer = result.answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            
            return (
              <div key={q.id} className={`${styles.reviewCard} ${isCorrect ? styles.correct : styles.incorrect}`}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewStatus}>
                    {isCorrect ? (
                      <CheckCircle2 size={24} className={styles.successIcon} />
                    ) : (
                      <XCircle size={24} className={styles.errorIcon} />
                    )}
                    <span className={styles.questionNumber}>Question {idx + 1}</span>
                  </div>
                  {q.part && <span className={styles.partBadge}>Part {q.part}</span>}
                </div>
                
                <p className={styles.questionText}>{q.text}</p>
                
                <div className={styles.answerComparison}>
                  <div className={styles.answerItem}>
                    <span className={styles.answerLabel}>Your Answer:</span>
                    <span className={`${styles.answerValue} ${!isCorrect ? styles.wrongValue : ''}`}>
                      {userAnswer || 'No answer'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className={styles.answerItem}>
                      <span className={styles.answerLabel}>Correct Answer:</span>
                      <span className={`${styles.answerValue} ${styles.correctValue}`}>
                        {q.correctAnswer}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className={styles.explanation}>
                  <strong>Explanation:</strong>
                  <p>{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Results;
