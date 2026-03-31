import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings, History, LogOut, ShieldCheck, Trophy, Clock, Target,
  ChevronRight, Eye, EyeOff, Plus, Trash2, BookOpen, Save, Loader2
} from 'lucide-react';
import styles from './UserPage.module.css';
import type { TestResult } from '../../types';
import { useAuth } from '../../context/AuthContext';
import resultApi from '../../api/resultApi';
import flashcardApi from '../../api/flashcardApi';
import userApi from '../../api/userApi';

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'security' | 'my-cards'>('dashboard');

  const [results, setResults] = useState<TestResult[]>([]);
  const [userCards, setUserCards] = useState<{ id: string; front: string; back: string; example?: string }[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);
  const [loadingCards, setLoadingCards] = useState(true);

  const [showCardForm, setShowCardForm] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '', example: '' });

  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    resultApi.getMyResults()
      .then(res => setResults(res.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())))
      .catch(() => setResults([]))
      .finally(() => setLoadingResults(false));

    flashcardApi.getAll()
      .then(res => setUserCards(res.data.filter((c: { created_by?: string }) => !!c.created_by)))
      .catch(() => setUserCards([]))
      .finally(() => setLoadingCards(false));
  }, []);

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await flashcardApi.create(newCard);
      setUserCards(prev => [res.data, ...prev]);
      setNewCard({ front: '', back: '', example: '' });
      setShowCardForm(false);
      showMessage('success', 'New card added!');
    } catch {
      showMessage('error', 'Failed to add card.');
    }
  };

  const deleteCard = async (id: string) => {
    try {
      await flashcardApi.delete(id);
      setUserCards(prev => prev.filter(c => c.id !== id));
    } catch {
      showMessage('error', 'Failed to delete card.');
    }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userApi.updateProfile({ name });
      updateUser({ name });
      showMessage('success', 'Profile updated successfully!');
    } catch {
      showMessage('error', 'Failed to update profile.');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showMessage('error', 'New passwords do not match');
      return;
    }
    try {
      await userApi.changePassword({ currentPassword, newPassword });
      showMessage('success', 'Password updated successfully!');
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch {
      showMessage('error', 'Current password is incorrect');
    }
  };

  const stats = {
    totalTests: results.length,
    avgScore: results.length > 0
      ? Math.round(results.reduce((acc, r) => acc + (r.score / r.totalQuestions), 0) / results.length * 100)
      : 0,
    totalTime: Math.round(results.reduce((acc, r) => acc + r.timeTakenSeconds, 0) / 60),
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.userBrief}>
          <div className={styles.avatar}>{user?.name.charAt(0).toUpperCase()}</div>
          <div className={styles.userInfo}><h3>{user?.name}</h3><p>{user?.email}</p></div>
        </div>
        <nav className={styles.sideNav}>
          <button className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.active : ''}`} onClick={() => setActiveTab('dashboard')}>
            <History size={20} /> Learning Dashboard
          </button>
          <button className={`${styles.navItem} ${activeTab === 'my-cards' ? styles.active : ''}`} onClick={() => setActiveTab('my-cards')}>
            <BookOpen size={20} /> My Private Flashcards
          </button>
          <button className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`} onClick={() => setActiveTab('profile')}>
            <Settings size={20} /> Personal Info
          </button>
          <button className={`${styles.navItem} ${activeTab === 'security' ? styles.active : ''}`} onClick={() => setActiveTab('security')}>
            <ShieldCheck size={20} /> Security
          </button>
          <hr className={styles.divider} />
          <button className={`${styles.navItem} ${styles.logout}`} onClick={handleLogout}>
            <LogOut size={20} /> Log Out
          </button>
        </nav>
      </aside>

      <main className={styles.content}>
        {message.text && <div className={`${styles.alert} ${styles[message.type]}`}>{message.text}</div>}

        {activeTab === 'dashboard' && (
          <div className={styles.dashboard}>
            <h2 className={styles.pageTitle}>Learning Progress</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}><div className={styles.statIcon} style={{ background: 'rgba(37,99,235,0.1)', color: '#2563eb' }}><Target size={24} /></div><div className={styles.statData}><span className={styles.statValue}>{stats.totalTests}</span><span className={styles.statLabel}>Tests Completed</span></div></div>
              <div className={styles.statCard}><div className={styles.statIcon} style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}><Trophy size={24} /></div><div className={styles.statData}><span className={styles.statValue}>{stats.avgScore}%</span><span className={styles.statLabel}>Average Accuracy</span></div></div>
              <div className={styles.statCard}><div className={styles.statIcon} style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}><Clock size={24} /></div><div className={styles.statData}><span className={styles.statValue}>{stats.totalTime}m</span><span className={styles.statLabel}>Study Time</span></div></div>
            </div>
            <div className={styles.historySection}>
              <h3 className={styles.sectionTitle}>Recent Activities</h3>
              <div className={styles.historyList}>
                {loadingResults ? (
                  <div style={{ padding: '20px', textAlign: 'center' }}><Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} /></div>
                ) : results.length > 0 ? results.map((result, idx) => (
                  <div key={idx} className={styles.historyItem} onClick={() => navigate(`/results/${result.testId}`)}>
                    <div className={styles.historyInfo}>
                      <h4>Test #{result.testId.slice(-6)}</h4>
                      <span>{new Date(result.date).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.historyResult}>
                      <span className={styles.historyScore}>{Math.round((result.score / result.totalQuestions) * 100)}%</span>
                      <ChevronRight size={18} />
                    </div>
                  </div>
                )) : (
                  <div className={styles.emptyState}>
                    <p>No tests completed yet.</p>
                    <button onClick={() => navigate('/tests')} className={styles.primaryBtn}>Take a Test</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'my-cards' && (
          <div className={styles.cardsDashboard}>
            <div className={styles.tabHeader}>
              <h2 className={styles.pageTitle}>Personal Vocabulary Cards</h2>
              <button className={styles.addBtnSmall} onClick={() => setShowCardForm(!showCardForm)}>
                {showCardForm ? 'Cancel' : <><Plus size={18} /> Create New Card</>}
              </button>
            </div>
            {showCardForm && (
              <form className={styles.personalCardForm} onSubmit={handleAddCard}>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}><label>Word / Phrase (Front)</label><input value={newCard.front} onChange={e => setNewCard({ ...newCard, front: e.target.value })} placeholder="e.g. Persistence" required /></div>
                  <div className={styles.inputGroup}><label>Meaning (Back)</label><input value={newCard.back} onChange={e => setNewCard({ ...newCard, back: e.target.value })} placeholder="e.g. Sự kiên trì" required /></div>
                </div>
                <div className={styles.inputGroup}><label>Usage Example</label><textarea value={newCard.example} onChange={e => setNewCard({ ...newCard, example: e.target.value })} placeholder="e.g. Success requires persistence." rows={2} /></div>
                <button type="submit" className={styles.saveCardBtn}><Save size={18} /> Save to Private Library</button>
              </form>
            )}
            <div className={styles.userCardsGrid}>
              {loadingCards ? <div style={{ padding: '20px', textAlign: 'center' }}><Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} /></div>
                : userCards.map(card => (
                  <div key={card.id} className={styles.privateCard}>
                    <div className={styles.cardHeader}>
                      <h4>{card.front}</h4>
                      <button className={styles.deleteCardBtn} onClick={() => deleteCard(card.id)}><Trash2 size={16} /></button>
                    </div>
                    <div className={styles.cardContent}>
                      <p className={styles.backLabel}>Meaning:</p>
                      <p className={styles.backValue}>{card.back}</p>
                      {card.example && <div className={styles.exampleBox}><span>"{card.example}"</span></div>}
                    </div>
                  </div>
                ))}
              {!loadingCards && userCards.length === 0 && !showCardForm && (
                <div className={styles.emptyCards}><BookOpen size={64} /><p>Your private library is empty. Start adding cards to practice!</p></div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className={styles.profileSection}>
            <h2 className={styles.pageTitle}>Personal Information</h2>
            <form onSubmit={handleUpdateProfile} className={styles.form}>
              <div className={styles.inputGroup}><label>Email Address</label><input type="email" value={user?.email || ''} disabled className={styles.disabledInput} /><p className={styles.inputHint}>Email cannot be changed.</p></div>
              <div className={styles.inputGroup}><label>Full Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required /></div>
              <button type="submit" className={styles.primaryBtn}>Save Changes</button>
            </form>
          </div>
        )}

        {activeTab === 'security' && (
          <div className={styles.profileSection}>
            <h2 className={styles.pageTitle}>Security Settings</h2>
            <form onSubmit={handleChangePassword} className={styles.form}>
              <div className={styles.inputGroup}><label>Current Password</label><div className={styles.passwordWrapper}><input type={showPass ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="••••••••" required /><button type="button" onClick={() => setShowPass(!showPass)} className={styles.togglePass}>{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
              <div className={styles.inputGroup}><label>New Password</label><input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" required /></div>
              <div className={styles.inputGroup}><label>Confirm New Password</label><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" required /></div>
              <button type="submit" className={styles.primaryBtn}>Update Password</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserPage;
