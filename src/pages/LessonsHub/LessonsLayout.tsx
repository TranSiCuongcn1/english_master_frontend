import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Type, 
  PenTool, 
  BookMarked, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import styles from './LessonsLayout.module.css';

interface LessonsLayoutProps {
  children: React.ReactNode;
}

const LessonsLayout: React.FC<LessonsLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  // Reset scroll position when content changes (switching tabs)
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  }, [children]);

  const menuItems = [
    { 
      path: '/flashcards', 
      label: 'Flashcards', 
      icon: <CreditCard size={20} />,
      color: '#8e24aa'
    },
    { 
      path: '/lessons/vocabulary', 
      label: 'Vocabulary', 
      icon: <Type size={20} />,
      color: '#00bcd4'
    },
    { 
      path: '/lessons/grammar', 
      label: 'Grammar', 
      icon: <PenTool size={20} />,
      color: '#607d8b'
    },
    { 
      path: '/lessons/reading-practice', 
      label: 'Short Stories', 
      icon: <BookMarked size={20} />,
      color: '#ff5722'
    },
  ];

  // Nếu đang ở trang /lessons (Hub), chúng ta có thể hiển thị một giao diện khác hoặc đơn giản là mặc định vào mục đầu tiên
  // Ở đây tôi giữ cho Sidebar luôn xuất hiện khi vào bất kỳ trang bài học nào.

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <button onClick={() => navigate('/')} className={styles.backBtn}>
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>

        <div className={styles.sidebarHeader}>
          <h2>Learning Hub</h2>
          <p>Master your skills</p>
        </div>

        <nav className={styles.sideNav}>
          {menuItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
              style={({ isActive }) => (isActive ? { '--accent-color': item.color } as React.CSSProperties : {})}
            >
              <div className={styles.iconBox} style={{ color: item.color }}>
                {item.icon}
              </div>
              <span>{item.label}</span>
              <ChevronRight size={16} className={styles.arrow} />
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.progressCard}>
            <h4>Daily Goal</h4>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '65%' }}></div>
            </div>
            <span>65% completed</span>
          </div>
        </div>
      </aside>

      <main className={styles.content}>
        <div ref={scrollAreaRef} className={styles.scrollArea}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default LessonsLayout;
