import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CreditCard,
  Type,
  PenTool,
  ArrowRight,
  BookMarked,
  ArrowLeft
} from 'lucide-react';
import styles from '../Home/Home.module.css';

const LessonsHub: React.FC = () => {
  const navigate = useNavigate();
  const categories = [
    { 
      id: 'flashcards', 
      name: 'Flashcards', 
      desc: 'Learn vocabulary faster with interactive cards', 
      icon: <CreditCard size={40} />, 
      color: '#8e24aa' 
    },
    { 
      id: 'vocabulary', 
      name: 'Vocabulary', 
      desc: 'Topic-based word lists and exercises', 
      icon: <Type size={40} />, 
      color: '#00bcd4' 
    },
    { 
      id: 'grammar', 
      name: 'Grammar', 
      desc: 'Master essential grammar rules', 
      icon: <PenTool size={40} />, 
      color: '#607d8b' 
    },
    { 
      id: 'reading-practice', 
      name: 'Short Stories', 
      desc: 'Improve reading skills with daily stories', 
      icon: <BookMarked size={40} />, 
      color: '#ff5722' 
    },
  ];

  return (
    <div className={styles.home}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <ArrowLeft size={20} />
        Back
      </button>
      <header className={styles.header}>
        <h1 className={styles.title}>Learning Material</h1>
        <p className={styles.subtitle}>Daily lessons to improve your language skills.</p>
      </header>

      <div className={styles.categoryGrid}>
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            to={cat.id === 'flashcards' ? '/flashcards' : `/lessons/${cat.id}`} 
            className={styles.categoryCard}
            style={{ '--accent-color': cat.color } as React.CSSProperties}
          >
            <div className={styles.iconWrapper}>
              {cat.icon}
            </div>
            <div className={styles.cardInfo}>
              <h2 className={styles.catName}>{cat.name}</h2>
              <p className={styles.catDesc}>{cat.desc}</p>
            </div>
            <div className={styles.arrow}>
              <ArrowRight size={24} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LessonsHub;
