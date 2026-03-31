import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, ArrowRight, BookOpen } from 'lucide-react';
import styles from '../Login/Login.module.css';
import authApi from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authApi.register({ name, email, password });
      login(response.data);
      navigate('/');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
            <BookOpen size={32} className={styles.logoIcon} />
          </div>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Start your learning journey today</p>
        </div>

        {error && <div style={{ color: 'var(--error-color)', textAlign: 'center', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSignup} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Full Name</label>
            <div className={styles.inputWrapper}>
              <UserIcon className={styles.inputIcon} size={20} />
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

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
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Already have an account? <Link to="/login">Log in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
