import React from 'react';
import { Link } from 'react-router-dom';
import { mockVocabulary } from '../data/tests';
import { ArrowLeft, Book, ChevronRight } from 'lucide-react';
import styles from './Vocabulary.module.css';

const Vocabulary: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/lessons" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Lessons
        </Link>
        <h1 className={styles.title}>Vocabulary Topics</h1>
        <p className={styles.subtitle}>Master new words by category and context.</p>
      </header>

      <div className={styles.topicGrid}>
        {mockVocabulary.map((topic) => (
          <div key={topic.id} className={styles.topicCard}>
            <div className={styles.topicHeader}>
              <div className={styles.topicIcon}>
                <Book size={24} />
              </div>
              <h2 className={styles.topicTitle}>{topic.title}</h2>
            </div>
            <p className={styles.topicDesc}>{topic.description}</p>
            
            <div className={styles.wordList}>
              {topic.words.slice(0, 3).map((w: any, idx: number) => (
                <div key={idx} className={styles.wordItem}>
                  <span className={styles.wordName}>{w.word}</span>
                  <span className={styles.wordType}>{w.type}</span>
                </div>
              ))}
              {topic.words.length > 3 && (
                <div className={styles.moreWords}>+{topic.words.length - 3} more words</div>
              )}
            </div>

            <button className={styles.studyBtn}>
              Study This Topic
              <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vocabulary;
