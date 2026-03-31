import React, { useState, useEffect } from 'react';
import { Book, ChevronRight, Search, Loader2 } from 'lucide-react';
import styles from './Vocabulary.module.css';
import vocabularyApi from '../../api/vocabularyApi';
import type { VocabularyTopic } from '../../types';

const Vocabulary: React.FC = () => {
  const [topics, setTopics] = useState<VocabularyTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    vocabularyApi.getTopics()
      .then(res => setTopics(res.data))
      .catch(() => setTopics([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.headerMain}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Vocabulary Topics</h1>
            <p className={styles.subtitle}>Master new words by category and context.</p>
          </div>
          <div className={styles.searchWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input type="text" placeholder="Search topics..." className={styles.searchInput} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
      </header>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '12px', color: 'var(--text-secondary)' }}>
          <Loader2 size={28} style={{ animation: 'spin 1s linear infinite' }} /><span>Loading...</span>
        </div>
      ) : (
        <div className={styles.topicGrid}>
          {filteredTopics.length > 0 ? filteredTopics.map(topic => (
            <div key={topic.id} className={styles.topicCard}>
              <div className={styles.topicHeader}>
                <div className={styles.topicIcon}><Book size={24} /></div>
                <h2 className={styles.topicTitle}>{topic.title}</h2>
              </div>
              <p className={styles.topicDesc}>{topic.description}</p>
              <div className={styles.wordList}>
                {topic.words.slice(0, 3).map((w, idx) => (
                  <div key={idx} className={styles.wordItem}>
                    <span className={styles.wordName}>{w.word}</span>
                    <span className={styles.wordType}>{w.type}</span>
                  </div>
                ))}
                {topic.words.length > 3 && <div className={styles.moreWords}>+{topic.words.length - 3} more words</div>}
              </div>
              <button className={styles.studyBtn}>Study This Topic <ChevronRight size={18} /></button>
            </div>
          )) : (
            <div className={styles.noResults}><p>No vocabulary topics found matching "{searchTerm}"</p></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Vocabulary;
