import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2, XCircle, RotateCcw, Home as HomeIcon, Trophy, Target,
  AlertCircle, Play, Pause, Volume2, ChevronDown, ChevronUp, Loader2
} from 'lucide-react';
import styles from './Results.module.css';
import type { TestResult, Test } from '../../types';
import resultApi from '../../api/resultApi';
import testApi from '../../api/testApi';

const Results: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();

  const [test, setTest] = useState<Test | null>(null);
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!testId) return;
    Promise.all([
      testApi.getById(testId),
      resultApi.getByTestId(testId),
    ]).then(([testRes, resultRes]) => {
      setTest(testRes.data);
      setResult(resultRes.data);
    }).finally(() => setLoading(false));
  }, [testId]);

  const toggleExpand = (id: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleToggleAudio = (url: string) => {
    if (playingAudio === url) {
      audioRef.current?.pause();
      setPlayingAudio(null);
    } else {
      setPlayingAudio(url);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    }
  };

  const skillStats = useMemo(() => {
    if (!test || !result) return {};
    const stats: Record<string, { correct: number; total: number }> = {};
    test.questions.forEach(q => {
      if (!stats[q.skill]) stats[q.skill] = { correct: 0, total: 0 };
      stats[q.skill].total += 1;
      const userAnswer = result.answers.find(a => a.questionId === q.id);
      if (userAnswer?.isCorrect) stats[q.skill].correct += 1;
    });
    return stats;
  }, [test, result]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '12px', color: 'var(--text-secondary)' }}>
      <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
      <span>Loading results...</span>
    </div>
  );

  if (!test || !result) return (
    <div className={styles.results}>
      <div className={styles.errorContainer}>
        <AlertCircle size={48} color="var(--error-color)" />
        <h2>Result not found.</h2>
        <Link to="/" className={styles.homeButton}><HomeIcon size={20} /> Back to Home</Link>
      </div>
    </div>
  );

  const scorePercentage = Math.round((result.score / result.totalQuestions) * 100);

  return (
    <div className={styles.results}>
      <section className={styles.analyticsSection}>
        <div className={styles.mainScore}>
          <div className={styles.scoreCircle}>
            <Trophy size={48} className={styles.trophyIcon} />
            <div className={styles.scoreInfo}>
              <span className={styles.scoreValue}>{scorePercentage}%</span>
              <span className={styles.scoreLabel}>Final Score</span>
            </div>
          </div>
          <div className={styles.quickStats}>
            <div className={styles.quickStat}>
              <Target size={20} />
              <div><strong>{result.score}/{result.totalQuestions}</strong><span>Correct Answers</span></div>
            </div>
            <div className={styles.quickStat}>
              <RotateCcw size={20} />
              <div><strong>{Math.floor(result.timeTakenSeconds / 60)}m {result.timeTakenSeconds % 60}s</strong><span>Time Spent</span></div>
            </div>
          </div>
        </div>

        <div className={styles.skillGrid}>
          {Object.entries(skillStats).map(([skill, data]) => {
            const percent = Math.round((data.correct / data.total) * 100);
            return (
              <div key={skill} className={styles.skillCard}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>{skill}</span>
                  <span className={styles.skillPercent}>{percent}%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={`${styles.progressBar} ${styles[skill.toLowerCase()]}`} style={{ width: `${percent}%` }} />
                </div>
                <span className={styles.skillCount}>{data.correct}/{data.total} Correct</span>
              </div>
            );
          })}
        </div>
      </section>

      <div className={styles.actions}>
        <Link to={`/test/${test.id}`} className={styles.retryButton}><RotateCcw size={20} /> Try Again</Link>
        <Link to="/" className={styles.homeButton}><HomeIcon size={20} /> Go Home</Link>
      </div>

      <section className={styles.reviewSection}>
        <div className={styles.reviewTitleRow}>
          <h2>Answer Review</h2>
        </div>
        <div className={styles.questionList}>
          {test.questions.map((q, idx) => {
            const userAnswerObj = result.answers.find(a => a.questionId === q.id);
            const userAnswer = userAnswerObj?.selectedAnswer || '';
            const isCorrect = userAnswerObj?.isCorrect || false;
            const isExpanded = expandedQuestions.has(q.id);

            return (
              <div key={q.id} className={`${styles.reviewCard} ${isCorrect ? styles.correct : styles.incorrect}`}>
                <div className={styles.reviewMain} onClick={() => toggleExpand(q.id)}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.statusGroup}>
                      {isCorrect ? <CheckCircle2 size={24} className={styles.successIcon} /> : <XCircle size={24} className={styles.errorIcon} />}
                      <span className={styles.questionNumber}>Question {idx + 1}</span>
                    </div>
                    <div className={styles.metaGroup}>
                      <span className={`${styles.skillBadge} ${styles[q.skill.toLowerCase()]}`}>{q.skill}</span>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                  <p className={styles.questionTextPreview}>{q.text}</p>
                </div>

                {isExpanded && (
                  <div className={styles.reviewDetails}>
                    {q.imageUrl && <div className={styles.reviewImage}><img src={q.imageUrl} alt="Context" /></div>}
                    {q.audioUrl && (
                      <div className={styles.reviewAudio}>
                        <button className={styles.miniAudioBtn} onClick={e => { e.stopPropagation(); handleToggleAudio(q.audioUrl!); }}>
                          {playingAudio === q.audioUrl ? <Pause size={16} /> : <Play size={16} />}
                          <span>Listen Again</span>
                        </button>
                        <Volume2 size={16} style={{ color: 'var(--text-secondary)' }} />
                      </div>
                    )}
                    <div className={styles.answerComparison}>
                      <div className={`${styles.answerBox} ${isCorrect ? styles.correctBox : styles.wrongBox}`}>
                        <span className={styles.boxLabel}>Your Answer</span>
                        <span className={styles.boxValue}>{userAnswer || 'No response'}</span>
                      </div>
                      {!isCorrect && (
                        <div className={`${styles.answerBox} ${styles.correctBox}`}>
                          <span className={styles.boxLabel}>Correct Answer</span>
                          <span className={styles.boxValue}>{q.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                    <div className={styles.explanationSection}>
                      <h4>Explanation</h4>
                      <p>{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <audio ref={audioRef} onEnded={() => setPlayingAudio(null)} style={{ display: 'none' }} />
    </div>
  );
};

export default Results;
