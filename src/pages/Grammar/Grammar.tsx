import React, { useState, useEffect } from 'react';
import { Edit3, ChevronDown, Search, Loader2 } from 'lucide-react';
import styles from './Grammar.module.css';
import grammarApi from '../../api/grammarApi';
import type { GrammarTopic } from '../../types';

const Grammar: React.FC = () => {
  const [topics, setTopics] = useState<GrammarTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    grammarApi.getTopics()
      .then(res => setTopics(res.data))
      .catch(() => setTopics([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredGrammar = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.headerMain}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Grammar Guide</h1>
            <p className={styles.subtitle}>Essential rules explained with clear examples.</p>
          </div>
          <div className={styles.searchWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input type="text" placeholder="Search grammar topics..." className={styles.searchInput} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
      </header>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '12px', color: 'var(--text-secondary)' }}>
          <Loader2 size={28} style={{ animation: 'spin 1s linear infinite' }} /><span>Loading...</span>
        </div>
      ) : (
        <div className={styles.grammarList}>
          {filteredGrammar.length > 0 ? filteredGrammar.map(topic => (
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
                    {topic.examples.map((ex: string, idx: number) => <li key={idx}>{ex}</li>)}
                  </ul>
                </div>
                <button className={styles.practiceBtn}>Take Grammar Quiz</button>
              </div>
            </div>
          )) : (
            <div className={styles.noResults}><p>No grammar topics found matching "{searchTerm}"</p></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Grammar;
