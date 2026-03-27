import React from 'react';
import { Link } from 'react-router-dom';
import { mockReading } from '../../data/tests';
import { ArrowLeft, BookOpen, Clock, ChevronRight } from 'lucide-react';
import styles from './ReadingPractice.module.css';

const ReadingPractice: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/lessons" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Lessons
        </Link>
        <h1 className={styles.title}>Reading Practice</h1>
        <p className={styles.subtitle}>Improve your comprehension skills with curated articles.</p>
      </header>

      <div className={styles.readingGrid}>
        {mockReading.map((article) => (
          <div key={article.id} className={styles.articleCard}>
            <div className={styles.articleHeader}>
              <h2 className={styles.articleTitle}>{article.title}</h2>
              <div className={styles.articleMeta}>
                <Clock size={16} />
                <span>5 min read</span>
              </div>
            </div>
            
            <p className={styles.excerpt}>{article.text.substring(0, 150)}...</p>
            
            <div className={styles.articleFooter}>
              <span className={styles.questionCount}>
                <BookOpen size={16} />
                {article.questions.length} questions
              </span>
              <button className={styles.readBtn}>
                Read Article
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingPractice;
