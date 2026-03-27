import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  Languages, 
  Library,
  ArrowRight
} from 'lucide-react';
import styles from './Home.module.css';

const TestsHub: React.FC = () => {
  const categories = [
    { 
      id: 'toeic', 
      name: 'TOEIC', 
      desc: 'Test of English for International Communication', 
      icon: <BookOpen size={40} />, 
      color: '#1a73e8' 
    },
    { 
      id: 'ielts', 
      name: 'IELTS', 
      desc: 'International English Language Testing System', 
      icon: <GraduationCap size={40} />, 
      color: '#e53935' 
    },
    { 
      id: 'hsk', 
      name: 'HSK', 
      desc: 'Hanyu Shuiping Kaoshi (Chinese Proficiency Test)', 
      icon: <Languages size={40} />, 
      color: '#fb8c00' 
    },
    { 
      id: 'jlpt', 
      name: 'JLPT', 
      desc: 'Japanese-Language Proficiency Test', 
      icon: <Library size={40} />, 
      color: '#43a047' 
    },
  ];

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.title}>Practice Tests</h1>
        <p className={styles.subtitle}>Choose a certification to start your mock exam.</p>
      </header>

      <div className={styles.categoryGrid}>
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            to={`/category/${cat.id}`} 
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

export default TestsHub;
