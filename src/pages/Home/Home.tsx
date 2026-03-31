import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, 
  BookOpen,
  ArrowRight,
  Star,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';
import styles from './Home.module.css';
import type { TestResult, User } from '../../types';
import { mockTests } from '../../data/tests';

const Home: React.FC = () => {
  const [user] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [recentResults] = useState<TestResult[]>(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) return [];
    
    const results: TestResult[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('result_')) {
        results.push(JSON.parse(localStorage.getItem(key)!));
      }
    }
    return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 2);
  });

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Zap size={14} fill="currentColor" />
            <span>New: TOEIC 2026 Practice Added</span>
          </div>
          <h1 className={styles.title}>
            Master English with <span className={styles.gradientText}>Confidence</span>
          </h1>
          <p className={styles.subtitle}>
            Personalized learning paths for TOEIC, IELTS, and professional communication. 
            Join thousands of learners achieving their goals today.
          </p>
          <div className={styles.heroActions}>
            <Link to="/tests" className={styles.primaryBtn}>
              Start Testing <ArrowRight size={20} />
            </Link>
            <Link to="/lessons" className={styles.secondaryBtn}>
              Browse Lessons
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.floatingCard + ' ' + styles.card1}>
            <CheckCircle size={20} color="var(--success-color)" />
            <span>95% Accuracy Rate</span>
          </div>
          <div className={styles.floatingCard + ' ' + styles.card2}>
            <Star size={20} color="#fbbf24" fill="#fbbf24" />
            <span>Top Rated App</span>
          </div>
          <div className={styles.heroImagePlaceholder}>
            <BookOpen size={120} className={styles.mainIllustration} />
          </div>
        </div>
      </section>

      {/* User Status / Continue Learning */}
      {user && recentResults.length > 0 && (
        <section className={styles.continueSection}>
          <div className={styles.sectionHeader}>
            <h3>Continue Learning</h3>
            <Link to="/profile">View History <ArrowRight size={16} /></Link>
          </div>
          <div className={styles.recentGrid}>
            {recentResults.map((r, i) => {
              const test = mockTests.find(t => t.id === r.testId);
              return (
                <Link to={`/results/${r.testId}`} key={i} className={styles.recentCard}>
                  <div className={styles.recentInfo}>
                    <h4>{test?.title}</h4>
                    <p><Clock size={14} /> Taken on {new Date(r.date).toLocaleDateString()}</p>
                  </div>
                  <div className={styles.recentScore}>
                    {Math.round((r.score / r.totalQuestions) * 100)}%
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Features - Reverted to old beautiful style */}
      <section className={styles.features}>
        <div className={styles.landingGrid}>
          <Link to="/tests" className={styles.heroCard}>
            <div className={`${styles.heroIcon} ${styles.testIcon}`}>
              <ClipboardCheck size={48} />
            </div>
            <div className={styles.heroContent}>
              <h2>Practice Tests</h2>
              <p>Ready to challenge yourself? Take mock exams for TOEIC, IELTS, HSK, and more.</p>
              <div className={styles.heroLink}>
                Browse Tests <ArrowRight size={20} />
              </div>
            </div>
          </Link>

          <Link to="/lessons" className={styles.heroCard}>
            <div className={`${styles.heroIcon} ${styles.lessonIcon}`}>
              <BookOpen size={48} />
            </div>
            <div className={styles.heroContent}>
              <h2>Learning Material</h2>
              <p>Improve your skills with daily lessons, flashcards, grammar, and vocabulary.</p>
              <div className={styles.heroLink}>
                Start Learning <ArrowRight size={20} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>500+</span>
          <span className={styles.statDesc}>Practice Tests</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>10k+</span>
          <span className={styles.statDesc}>Active Learners</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>98%</span>
          <span className={styles.statDesc}>Success Rate</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>24/7</span>
          <span className={styles.statDesc}>Expert Support</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
