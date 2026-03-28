import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, BookOpen } from 'lucide-react';
import styles from './Login.module.css';
import type { User } from '../../types';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Đảm bảo luôn có các tài khoản mặc định nếu danh sách trống
    const defaultUsers = [
      { name: 'Regular User', email: 'user@example.com', password: 'user123', role: 'user' },
      { name: 'System Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' }
    ];

    if (users.length === 0) {
      users = defaultUsers as any;
      localStorage.setItem('users', JSON.stringify(users));
    }

    const user = users.find((u: User) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ 
        name: user.name, 
        email: user.email,
        role: (user as any).role || 'user' 
      }));
      navigate('/');
      window.location.reload();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
            <BookOpen size={32} className={styles.logoIcon} />
          </div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Log in to continue your learning journey</p>
        </div>

        {error && <div style={{ color: 'var(--error-color)', textAlign: 'center', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="password">Password</label>
              <a href="#" className={styles.forgotPass}>Forgot?</a>
            </div>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Log In
            <ArrowRight size={20} />
          </button>
        </form>

        <div className={styles.footer}>
          <p>Don't have an account? <Link to="/signup">Sign up for free</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
