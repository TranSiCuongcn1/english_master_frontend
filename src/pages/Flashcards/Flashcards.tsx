import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCw, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Flashcards.module.css';
import flashcardApi from '../../api/flashcardApi';
import type { Flashcard } from '../../types';

const Flashcards: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    flashcardApi.getAll()
      .then(res => setFlashcards(res.data))
      .catch(() => setFlashcards([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(flashcards.map(c => c.category).filter(Boolean))];

  const filteredCards = selectedCategory === 'All'
    ? flashcards
    : flashcards.filter(c => c.category === selectedCategory);

  const currentCard = filteredCards[currentIndex];

  const handleNext = () => { setIsFlipped(false); setCurrentIndex(prev => (prev + 1) % filteredCards.length); };
  const handlePrev = () => { setIsFlipped(false); setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length); };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '12px', color: 'var(--text-secondary)' }}>
      <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
      <span>Loading flashcards...</span>
    </div>
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/lessons" className={styles.backLink}><ArrowLeft size={20} /> Back to Lessons</Link>
        <h1 className={styles.title}>Flashcards</h1>
        <p className={styles.subtitle}>Master your vocabulary with interactive cards.</p>
        <div className={styles.categoryFilter}>
          {categories.map(cat => (
            <button key={cat} className={`${styles.catBtn} ${selectedCategory === cat ? styles.activeCat : ''}`} onClick={() => handleCategoryChange(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.cardContainer}>
        {filteredCards.length > 0 && currentCard ? (
          <>
            <div className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
              <div className={styles.cardFront}>
                <span className={styles.categoryBadge}>{currentCard.category}</span>
                <h2 className={styles.word}>{currentCard.front}</h2>
                <div className={styles.hint}>Click to see meaning</div>
              </div>
              <div className={styles.cardBack}>
                <h2 className={styles.meaning}>{currentCard.back}</h2>
                {currentCard.example && (
                  <div className={styles.example}><strong>Example:</strong><p>{currentCard.example}</p></div>
                )}
                <div className={styles.hint}>Click to see word</div>
              </div>
            </div>

            <div className={styles.controls}>
              <button onClick={handlePrev} className={styles.navBtn}><ChevronLeft size={24} /></button>
              <span className={styles.progress}>{currentIndex + 1} / {filteredCards.length}</span>
              <button onClick={handleNext} className={styles.navBtn}><ChevronRight size={24} /></button>
            </div>

            <button className={styles.shuffleBtn} onClick={() => setCurrentIndex(Math.floor(Math.random() * filteredCards.length))}>
              <RotateCw size={20} /> Shuffle Cards
            </button>
          </>
        ) : (
          <div className={styles.emptyState}>No flashcards found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
