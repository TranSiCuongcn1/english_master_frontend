import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User as UserIcon, LogOut, Sun, Moon, LayoutDashboard, Trophy } from 'lucide-react';
import styles from './Navbar.module.css';
import type { User } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import NotificationDropdown from '../Notifications/NotificationDropdown';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) return null;
    
    // Check if user is admin based on email (logic for mock app)
    const parsed = JSON.parse(savedUser);
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const fullUser = users.find(u => u.email === parsed.email);
    return fullUser || parsed;
  });
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/login');
    window.location.reload();
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link to="/" className={styles.logo}>
          <BookOpen className={styles.logoIcon} />
          <span>English<span className={styles.logoHighlight}>Master</span></span>
        </Link>
        <div className={styles.navLinks}>
          <Link to="/tests" className={styles.navLink}>Tests</Link>
          <Link to="/lessons" className={styles.navLink}>Lessons</Link>
          
          <Link to="/leaderboard" className={styles.iconBtn} title="Leaderboard">
            <Trophy size={20} />
          </Link>
          
          <button onClick={toggleTheme} className={styles.themeToggle} title="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {user && <NotificationDropdown />}

          {user ? (
            <div className={styles.userSection}>
              {isAdmin && (
                <Link to="/admin" className={styles.adminLink} title="Admin Panel">
                  <LayoutDashboard size={20} />
                </Link>
              )}
              <Link to="/profile" className={styles.userName}>Hi, {user.name.split(' ')[0]}</Link>
              <button onClick={handleLogout} className={styles.logoutBtn} title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className={styles.navLink}>
              <UserIcon size={20} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
