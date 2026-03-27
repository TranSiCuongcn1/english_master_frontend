import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockFlashcards } from '../data/tests';
import { ArrowLeft, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Flashcards.module.css';

const Flashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const currentCard = mockFlashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % mockFlashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + mockFlashcards.length) % mockFlashcards.length);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/lessons" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Lessons
        </Link>
        <h1 className={styles.title}>Flashcards</h1>
        <p className={styles.subtitle}>Tap the card to flip and see the meaning.</p>
      </header>

      <div className={styles.cardContainer}>
        <div 
          className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={styles.cardFront}>
            <span className={styles.categoryBadge}>{currentCard.category}</span>
            <h2 className={styles.word}>{currentCard.front}</h2>
            <div className={styles.hint}>Click to see meaning</div>
          </div>
          <div className={styles.cardBack}>
            <h2 className={styles.meaning}>{currentCard.back}</h2>
            {currentCard.example && (
              <div className={styles.example}>
                <strong>Example:</strong>
                <p>{currentCard.example}</p>
              </div>
            )}
            <div className={styles.hint}>Click to see word</div>
          </div>
        </div>

        <div className={styles.controls}>
          <button onClick={handlePrev} className={styles.navBtn}>
            <ChevronLeft size={24} />
          </button>
          <span className={styles.progress}>
            {currentIndex + 1} / {mockFlashcards.length}
          </span>
          <button onClick={handleNext} className={styles.navBtn}>
            <ChevronRight size={24} />
          </button>
        </div>
        
        <button 
          className={styles.shuffleBtn}
          onClick={() => setCurrentIndex(Math.floor(Math.random() * mockFlashcards.length))}
        >
          <RotateCw size={20} />
          Shuffle Cards
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
