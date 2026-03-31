import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import type { Question } from '../../types';
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Reset state and stop audio when question changes or unmounts
  React.useEffect(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [question.id]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.cardHeader}>
        {question.part && (
          <span className={styles.partBadge}>Part {question.part}</span>
        )}
        <span className={`${styles.skillBadge} ${styles[question.skill.toLowerCase()]}`}>
          {question.skill}
        </span>
      </div>

      <div className={styles.cardBody}>
        {/* Cột trái: Media, Question Text & Question Number */}
        <div className={styles.leftColumn}>
          <div className={styles.mediaContainer}>
            {question.passageText && (
              <div className={styles.passageContainer}>
                <h4>Reading Passage</h4>
                <div className={styles.passageContent}>
                  {question.passageText.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            {question.imageUrl && (
              <div className={styles.imageContainer}>
                <img src={question.imageUrl} alt={`Question ${index + 1}`} className={styles.questionImage} />
              </div>
            )}

            {question.audioUrl && (
              <div className={styles.audioPlayer}>
                <button className={styles.audioButton} onClick={toggleAudio}>
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  <span>{isPlaying ? 'Playing...' : 'Click to Listen'}</span>
                </button>
                <div className={styles.audioInfo}>
                  <Volume2 size={16} />
                  <span>Audio for Q{index + 1}</span>
                </div>
                <audio 
                  ref={audioRef} 
                  src={question.audioUrl} 
                  onEnded={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                />
              </div>
            )}
          </div>
          
          <p className={styles.questionText}>{question.text}</p>
          
          <div className={styles.questionNumberLabel}>
            Question {index + 1}
          </div>
        </div>

        {/* Cột phải: Only Options */}
        <div className={styles.rightColumn}>
          <div className={styles.optionsList}>
            {question.options?.map((option: string, idx: number) => {
              const isSelected = selectedAnswer === option;
              const label = String.fromCharCode(65 + idx);
              
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
      </div>
    </div>
  );
};

export default QuestionCard;
