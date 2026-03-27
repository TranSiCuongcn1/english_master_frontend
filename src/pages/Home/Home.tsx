import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to EnglishMaster</h1>
        <p className={styles.subtitle}>Choose your path to excellence.</p>
      </header>

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
    </div>
  );
};

export default Home;
