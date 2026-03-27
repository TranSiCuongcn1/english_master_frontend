import React from 'react';
import type { Question } from '../types';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | undefined;
  onSelectAnswer: (answer: string) => void;
  index: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  index,
}) => {
  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <span className={styles.questionNumber}>Question {index + 1}</span>
        {question.part && (
          <span className={styles.partBadge}>Part {question.part}</span>
        )}
      </div>
      
      <p className={styles.questionText}>{question.text}</p>
      
      <div className={styles.optionsList}>
        {question.options?.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const label = String.fromCharCode(65 + idx); // A, B, C, D...
          
          return (
            <button
              key={idx}
              className={`${styles.optionButton} ${isSelected ? styles.selected : ''}`}
              onClick={() => onSelectAnswer(option)}
            >
              <span className={styles.optionLabel}>{label}</span>
              <span className={styles.optionContent}>{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
