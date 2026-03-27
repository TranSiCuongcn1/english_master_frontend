import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  UserPlus,
  Search,
  ArrowLeft
} from 'lucide-react';
import styles from './AdminDashboard.module.css';
import type { User, Test, TestResult } from '../../types';
import { mockTests } from '../../data/tests';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'tests'>('stats');
  const [users, setUsers] = useState<User[]>([]);
  const [tests, setTests] = useState<Test[]>(mockTests);
  const [results, setResults] = useState<TestResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check admin rights
    const current = localStorage.getItem('currentUser');
    if (!current) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(current);
    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = allUsers.find(u => u.email === parsed.email);
    
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    setUsers(allUsers);

    // Load results
    const allResults: TestResult[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('result_')) {
        allResults.push(JSON.parse(localStorage.getItem(key)!));
      }
    }
    setResults(allResults);
  }, [navigate]);

  const deleteUser = (email: string) => {
    if (window.confirm(`Are you sure you want to delete user ${email}?`)) {
      const updated = users.filter(u => u.email !== email);
      setUsers(updated);
      localStorage.setItem('users', JSON.stringify(updated));
    }
  };

  const deleteTest = (id: string) => {
    if (window.confirm(`Delete test ${id}? (Mock action)`)) {
      setTests(tests.filter(t => t.id !== id));
    }
  };

  const stats = {
    totalUsers: users.length,
    totalTests: tests.length,
    totalAttempts: results.length,
    avgScore: results.length > 0 
      ? Math.round(results.reduce((acc, r) => acc + (r.score / r.totalQuestions), 0) / results.length * 100)
      : 0
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <ShieldCheck size={24} className={styles.adminIcon} />
          <h2>Admin Hub</h2>
        </div>
        
        <nav className={styles.nav}>
          <button 
            className={`${styles.navItem} ${activeTab === 'stats' ? styles.active : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <BarChart3 size={20} />
            Statistics
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'users' ? styles.active : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} />
            Manage Users
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'tests' ? styles.active : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            <FileText size={20} />
            Manage Tests
          </button>
        </nav>

        <button className={styles.backBtn} onClick={() => navigate('/')}>
          <ArrowLeft size={18} />
          Back to Site
        </button>
      </aside>

      <main className={styles.content}>
        {activeTab === 'stats' && (
          <div className={styles.statsPanel}>
            <h1 className={styles.pageTitle}>System Statistics</h1>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <Users size={32} />
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{stats.totalUsers}</span>
                  <span className={styles.statLabel}>Total Students</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <FileText size={32} />
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{stats.totalTests}</span>
                  <span className={styles.statLabel}>Tests Created</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <UserPlus size={32} />
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{stats.totalAttempts}</span>
                  <span className={styles.statLabel}>Test Attempts</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <BarChart3 size={32} />
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{stats.avgScore}%</span>
                  <span className={styles.statLabel}>Avg. Accuracy</span>
                </div>
              </div>
            </div>

            <div className={styles.recentAttempts}>
              <h3>Recent Test Submissions</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Test ID</th>
                      <th>Score</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.slice(0, 5).map((r, i) => (
                      <tr key={i}>
                        <td>{r.userEmail}</td>
                        <td>{r.testId}</td>
                        <td>{Math.round((r.score / r.totalQuestions) * 100)}%</td>
                        <td>{new Date(r.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className={styles.usersPanel}>
            <div className={styles.panelHeader}>
              <h1 className={styles.pageTitle}>User Management</h1>
              <div className={styles.searchBar}>
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.email}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`${styles.roleBadge} ${styles[user.role || 'user']}`}>
                          {user.role || 'user'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className={styles.deleteBtn} 
                          onClick={() => deleteUser(user.email)}
                          disabled={user.role === 'admin'}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tests' && (
          <div className={styles.testsPanel}>
            <div className={styles.panelHeader}>
              <h1 className={styles.pageTitle}>Test Management</h1>
              <button className={styles.addBtn}>
                <Plus size={18} />
                Add New Test
              </button>
            </div>

            <div className={styles.testGrid}>
              {tests.map(test => (
                <div key={test.id} className={styles.testItem}>
                  <div className={styles.testInfo}>
                    <h4>{test.title}</h4>
                    <p>{test.category} • {test.questions.length} Qs</p>
                  </div>
                  <div className={styles.testActions}>
                    <button className={styles.editBtn}>Edit</button>
                    <button className={styles.deleteBtn} onClick={() => deleteTest(test.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
