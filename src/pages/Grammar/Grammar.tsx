import React from 'react';
import { Link } from 'react-router-dom';
import { mockGrammar } from '../../data/tests';
import { ArrowLeft, Edit3, ChevronDown } from 'lucide-react';
import styles from './Grammar.module.css';

const Grammar: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/lessons" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Lessons
        </Link>
        <h1 className={styles.title}>Grammar Guide</h1>
        <p className={styles.subtitle}>Essential rules explained with clear examples.</p>
      </header>

      <div className={styles.grammarList}>
        {mockGrammar.map((topic) => (
          <div key={topic.id} className={styles.grammarCard}>
            <div className={styles.cardHeader}>
              <div className={styles.topicInfo}>
                <Edit3 className={styles.topicIcon} size={24} />
                <h2 className={styles.topicTitle}>{topic.title}</h2>
              </div>
              <ChevronDown size={20} />
            </div>
            
            <div className={styles.cardBody}>
              <p className={styles.content}>{topic.content}</p>
              
              <div className={styles.exampleSection}>
                <h3>Examples:</h3>
                <ul className={styles.exampleList}>
                  {topic.examples.map((ex: string, idx: number) => (
                    <li key={idx}>{ex}</li>
                  ))}
                </ul>
              </div>
              
              <button className={styles.practiceBtn}>Take Grammar Quiz</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grammar;
