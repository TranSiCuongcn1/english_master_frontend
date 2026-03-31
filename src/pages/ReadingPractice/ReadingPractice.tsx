import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, ChevronRight, Search, Filter, Loader2 } from 'lucide-react';
import styles from './ReadingPractice.module.css';
import readingApi from '../../api/readingApi';
import type { ReadingPassage } from '../../types';

const ReadingPractice: React.FC = () => {
  const [passages, setPassages] = useState<ReadingPassage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  useEffect(() => {
    readingApi.getPassages()
      .then(res => setPassages(res.data))
      .catch(() => setPassages([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredArticles = passages.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || article.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.headerMain}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Reading Practice</h1>
            <p className={styles.subtitle}>Improve your comprehension skills with curated articles.</p>
          </div>
          <div className={styles.controls}>
            <div className={styles.searchWrapper}>
              <Search size={20} className={styles.searchIcon} />
              <input type="text" placeholder="Search articles..." className={styles.searchInput} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className={styles.filterWrapper}>
              <Filter size={18} className={styles.filterIcon} />
              <select className={styles.difficultySelect} value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value as 'All' | 'Easy' | 'Medium' | 'Hard')}>
                {['All', 'Easy', 'Medium', 'Hard'].map(d => <option key={d} value={d}>{d} Difficulty</option>)}
              </select>
            </div>
          </div>
        </div>
      </header>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '12px', color: 'var(--text-secondary)' }}>
          <Loader2 size={28} style={{ animation: 'spin 1s linear infinite' }} /><span>Loading...</span>
        </div>
      ) : (
        <div className={styles.readingGrid}>
          {filteredArticles.length > 0 ? filteredArticles.map(article => (
            <div key={article.id} className={styles.articleCard}>
              <div className={styles.articleHeader}>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <div className={styles.metaBadges}>
                  <div className={styles.articleMeta}><Clock size={14} /><span>{article.readingTime || 5} min</span></div>
                  <span className={`${styles.diffBadge} ${styles[article.difficulty.toLowerCase()]}`}>{article.difficulty}</span>
                </div>
              </div>
              <p className={styles.excerpt}>{article.text.substring(0, 150)}...</p>
              <div className={styles.articleFooter}>
                <span className={styles.questionCount}><BookOpen size={16} />{article.questions.length} questions</span>
                <button className={styles.readBtn}>Read Article <ChevronRight size={18} /></button>
              </div>
            </div>
          )) : (
            <div className={styles.noResults}><p>No articles found matching your criteria.</p></div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadingPractice;
