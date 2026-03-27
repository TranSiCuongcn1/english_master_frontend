import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  BookOpen, 
  GraduationCap, 
  Languages 
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/flashcards', icon: <CreditCard size={20} />, label: 'Flashcards' },
    { to: '/category/toeic', icon: <BookOpen size={20} />, label: 'TOEIC' },
    { to: '/category/ielts', icon: <GraduationCap size={20} />, label: 'IELTS' },
    { to: '/category/hsk', icon: <Languages size={20} />, label: 'HSK' },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
