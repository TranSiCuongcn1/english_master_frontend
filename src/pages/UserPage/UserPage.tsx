import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  History, 
  LogOut, 
  ShieldCheck, 
  Trophy, 
  Clock, 
  Target,
  ChevronRight,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  BookOpen,
  Save
} from 'lucide-react';
import styles from './UserPage.module.css';
import type { User, TestResult, UserFlashcard } from '../../types';
import { mockTests } from '../../data/tests';

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'security' | 'my-cards'>('dashboard');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);
  const [userCards, setUserCards] = useState<UserFlashcard[]>([]);
  
  // Flashcard form states
  const [showCardForm, setShowCardForm] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '', example: '' });

  // Form states
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(user);
    setCurrentUser(parsedUser);
    setName(parsedUser.name);

    // Load results
    const allResults: TestResult[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('result_')) {
        allResults.push(JSON.parse(localStorage.getItem(key)!));
      }
    }
    setResults(allResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

    // Load personal flashcards
    const storedCards = JSON.parse(localStorage.getItem(`cards_${parsedUser.email}`) || '[]');
    setUserCards(storedCards);
  }, [navigate]);

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const card: UserFlashcard = {
      id: Date.now().toString(),
      front: newCard.front,
      back: newCard.back,
      example: newCard.example,
      userEmail: currentUser.email,
      createdAt: new Date().toISOString()
    };

    const updated = [card, ...userCards];
    setUserCards(updated);
    localStorage.setItem(`cards_${currentUser.email}`, JSON.stringify(updated));
    setNewCard({ front: '', back: '', example: '' });
    setShowCardForm(false);
    setMessage({ type: 'success', text: 'New card added to your library!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const deleteCard = (id: string) => {
    if (!currentUser) return;
    const updated = userCards.filter(c => c.id !== id);
    setUserCards(updated);
    localStorage.setItem(`cards_${currentUser.email}`, JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
    window.location.reload();
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    
    if (userIndex !== -1) {
      users[userIndex].name = name;
      localStorage.setItem('users', JSON.stringify(users));
      
      const updatedUser = { ...currentUser, name };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    
    if (userIndex !== -1) {
      if (users[userIndex].password !== currentPassword) {
        setMessage({ type: 'error', text: 'Current password is incorrect' });
        return;
      }
      
      if (newPassword !== confirmPassword) {
        setMessage({ type: 'error', text: 'New passwords do not match' });
        return;
      }

      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const stats = {
    totalTests: results.length,
    avgScore: results.length > 0 
      ? Math.round(results.reduce((acc, r) => acc + (r.score / r.totalQuestions), 0) / results.length * 100)
      : 0,
    totalTime: Math.round(results.reduce((acc, r) => acc + r.timeTakenSeconds, 0) / 60)
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.userBrief}>
          <div className={styles.avatar}>
            {currentUser?.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <h3>{currentUser?.name}</h3>
            <p>{currentUser?.email}</p>
          </div>
        </div>

        <nav className={styles.sideNav}>
          <button 
            className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.active : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <History size={20} />
            Learning Dashboard
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'my-cards' ? styles.active : ''}`}
            onClick={() => setActiveTab('my-cards')}
          >
            <BookOpen size={20} />
            My Private Flashcards
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <Settings size={20} />
            Personal Info
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'security' ? styles.active : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <ShieldCheck size={20} />
            Security
          </button>
          <hr className={styles.divider} />
          <button className={`${styles.navItem} ${styles.logout}`} onClick={handleLogout}>
            <LogOut size={20} />
            Log Out
          </button>
        </nav>
      </aside>

      <main className={styles.content}>
        {message.text && (
          <div className={`${styles.alert} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className={styles.dashboard}>
            <h2 className={styles.pageTitle}>Learning Progress</h2>
            
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>
                  <Target size={24} />
                </div>
                <div className={styles.statData}>
                  <span className={styles.statValue}>{stats.totalTests}</span>
                  <span className={styles.statLabel}>Tests Completed</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <Trophy size={24} />
                </div>
                <div className={styles.statData}>
                  <span className={styles.statValue}>{stats.avgScore}%</span>
                  <span className={styles.statLabel}>Average Accuracy</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <Clock size={24} />
                </div>
                <div className={styles.statData}>
                  <span className={styles.statValue}>{stats.totalTime}m</span>
                  <span className={styles.statLabel}>Study Time</span>
                </div>
              </div>
            </div>

            <div className={styles.historySection}>
              <h3 className={styles.sectionTitle}>Recent Activities</h3>
              <div className={styles.historyList}>
                {results.length > 0 ? results.map((result, idx) => {
                  const test = mockTests.find(t => t.id === result.testId);
                  return (
                    <div key={idx} className={styles.historyItem} onClick={() => navigate(`/results/${result.testId}`)}>
                      <div className={styles.historyInfo}>
                        <h4>{test?.title || 'Unknown Test'}</h4>
                        <span>{new Date(result.date).toLocaleDateString()}</span>
                      </div>
                      <div className={styles.historyResult}>
                        <span className={styles.historyScore}>{Math.round((result.score / result.totalQuestions) * 100)}%</span>
                        <ChevronRight size={18} />
                      </div>
                    </div>
                  );
                }) : (
                  <div className={styles.emptyState}>
                    <p>No tests completed yet. Start learning now!</p>
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
                  <div className={styles.inputGroup}>
                    <label>Word / Phrase (Front)</label>
                    <input 
                      value={newCard.front} 
                      onChange={e => setNewCard({...newCard, front: e.target.value})} 
                      placeholder="e.g. Persistence" required 
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Meaning (Back)</label>
                    <input 
                      value={newCard.back} 
                      onChange={e => setNewCard({...newCard, back: e.target.value})} 
                      placeholder="e.g. Sự kiên trì" required 
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Usage Example</label>
                  <textarea 
                    value={newCard.example} 
                    onChange={e => setNewCard({...newCard, example: e.target.value})} 
                    placeholder="e.g. Success requires a great deal of persistence."
                    rows={2}
                  />
                </div>
                <button type="submit" className={styles.saveCardBtn}>
                  <Save size={18} /> Save to Private Library
                </button>
              </form>
            )}

            <div className={styles.userCardsGrid}>
              {userCards.map(card => (
                <div key={card.id} className={styles.privateCard}>
                  <div className={styles.cardHeader}>
                    <h4>{card.front}</h4>
                    <button className={styles.deleteCardBtn} onClick={() => deleteCard(card.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className={styles.cardContent}>
                    <p className={styles.backLabel}>Meaning:</p>
                    <p className={styles.backValue}>{card.back}</p>
                    {card.example && (
                      <div className={styles.exampleBox}>
                        <span>"{card.example}"</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {userCards.length === 0 && !showCardForm && (
                <div className={styles.emptyCards}>
                  <BookOpen size={64} />
                  <p>Your private library is empty. Start adding cards to practice!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className={styles.profileSection}>
            <h2 className={styles.pageTitle}>Personal Information</h2>
            <form onSubmit={handleUpdateProfile} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" value={currentUser?.email || ''} disabled className={styles.disabledInput} />
                <p className={styles.inputHint}>Email cannot be changed.</p>
              </div>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your Name"
                  required
                />
              </div>
              <button type="submit" className={styles.primaryBtn}>Save Changes</button>
            </form>
          </div>
        )}

        {activeTab === 'security' && (
          <div className={styles.profileSection}>
            <h2 className={styles.pageTitle}>Security Settings</h2>
            <form onSubmit={handleChangePassword} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Current Password</label>
                <div className={styles.passwordWrapper}>
                  <input 
                    type={showPass ? 'text' : 'password'} 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className={styles.togglePass}>
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <button type="submit" className={styles.primaryBtn}>Update Password</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserPage;
