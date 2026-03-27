import React from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className="container">
        <div className={styles.content}>
          {children}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; 2026 EnglishMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
