import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User as UserIcon, LogOut, Sun, Moon, LayoutDashboard, Trophy, Search } from 'lucide-react';
import styles from './Navbar.module.css';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import NotificationDropdown from '../Notifications/NotificationDropdown';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link to="/" className={styles.logo}>
          <BookOpen className={styles.logoIcon} />
          <span>English<span className={styles.logoHighlight}>Master</span></span>
        </Link>

        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for tests, lessons..."
            className={styles.navbarSearch}
          />
        </div>

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
