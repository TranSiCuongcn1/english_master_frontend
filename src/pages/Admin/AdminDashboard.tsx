import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Search,
  ArrowLeft,
  BookOpen,
  Bell,
  CheckCircle2,
  X,
  Filter,
  Save,
  PlusCircle,
  Edit,
  Sparkles,
  Zap,
  Cpu,
  BrainCircuit,
  TrendingUp,
  Award,
  Type,
  Layout,
  Mail,
  Calendar,
  ChevronRight
} from 'lucide-react';
import styles from './AdminDashboard.module.css';
import type { User, Test, TestResult, Question, Notification, VocabularyTopic, GrammarTopic, Flashcard } from '../../types';
import { mockTests, mockVocabulary, mockGrammar, mockFlashcards } from '../../data/tests';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'tests' | 'lessons' | 'notifications'>('stats');
  
  const [users, setUsers] = useState<User[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [results, setResults] = useState<TestResult[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const [vocabData, setVocabData] = useState<VocabularyTopic[]>([]);
  const [grammarData, setGrammarData] = useState<GrammarTopic[]>([]);
  const [flashcardData, setFlashcardData] = useState<Flashcard[]>([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [catFilter, setCatFilter] = useState<string>('All');
  const [yearFilter, setYearFilter] = useState<string>('All');
  const [lessonType, setLessonType] = useState<'vocabulary' | 'grammar' | 'flashcards'>('vocabulary');

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [modalType, setModalType] = useState<'test' | 'vocabulary' | 'grammar' | 'flashcard' | 'notification'>('test');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form States
  const [newTest, setNewTest] = useState<Partial<Test>>({ title: '', category: 'TOEIC', year: 2026, durationMinutes: 45, questions: [] });
  const [newNotif, setNewNotif] = useState({ title: '', message: '', type: 'info' as any });
  const [currentVocab, setCurrentVocab] = useState<Partial<VocabularyTopic>>({ title: '', description: '', words: [] });
  const [currentGrammar, setCurrentGrammar] = useState<Partial<GrammarTopic>>({ title: '', content: '', examples: [] });
  const [currentFlashcard, setCurrentFlashcard] = useState<Partial<Flashcard>>({ front: '', back: '', example: '', category: 'General' });

  useEffect(() => {
    const current = localStorage.getItem('currentUser');
    if (!current) { navigate('/login'); return; }
    const parsed = JSON.parse(current);
    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = allUsers.find(u => u.email === parsed.email);
    if (user?.role !== 'admin') { navigate('/'); return; }

    setUsers(allUsers);
    setTests([...mockTests, ...JSON.parse(localStorage.getItem('custom_tests') || '[]')]);
    setVocabData([...mockVocabulary, ...JSON.parse(localStorage.getItem('custom_vocab') || '[]')]);
    setGrammarData([...mockGrammar, ...JSON.parse(localStorage.getItem('custom_grammar') || '[]')]);
    setFlashcardData([...mockFlashcards, ...JSON.parse(localStorage.getItem('custom_flashcards') || '[]')]);

    const allResults: TestResult[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('result_')) { allResults.push(JSON.parse(localStorage.getItem(key)!)); }
    }
    setResults(allResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setNotifications(JSON.parse(localStorage.getItem('notifications') || '[]'));
  }, [navigate]);

  const stats = {
    totalUsers: users.length,
    activeLearners: [...new Set(results.map(r => r.userEmail))].length,
    avgCompletionRate: results.length > 0 ? Math.min(100, Math.round((results.length / (users.length * 3 || 1)) * 100)) : 0,
    avgScore: results.length > 0 ? Math.round(results.reduce((acc, r) => acc + (r.score / r.totalQuestions), 0) / results.length * 100) : 0,
    topLearners: Object.entries(results.reduce((acc: any, curr) => {
      const email = curr.userEmail || 'unknown';
      acc[email] = (acc[email] || 0) + 1;
      return acc;
    }, {})).sort(([,a]: any, [,b]: any) => b - a).slice(0, 5)
  };

  // MODAL OPENERS
  const openAddTest = () => {
    setNewTest({ title: '', category: 'TOEIC', year: 2026, durationMinutes: 45, questions: [] });
    setModalMode('add'); setModalType('test'); setEditingId(null); setShowModal(true);
  };

  const openEditTest = (test: Test) => {
    setNewTest(test); setEditingId(test.id); setModalMode('edit'); setModalType('test'); setShowModal(true);
  };

  const openAddLesson = () => {
    const type = lessonType === 'vocabulary' ? 'vocabulary' : lessonType === 'grammar' ? 'grammar' : 'flashcard';
    setModalType(type); setModalMode('add'); setEditingId(null); setShowModal(true);
  };

  const openEditLesson = (item: any, type: any) => {
    setEditingId(item.id); setModalMode('edit'); setModalType(type);
    if (type === 'vocabulary') setCurrentVocab(item);
    if (type === 'grammar') setCurrentGrammar(item);
    if (type === 'flashcard') setCurrentFlashcard(item);
    setShowModal(true);
  };

  const deleteUser = (email: string) => {
    if (window.confirm(`Permanently delete account ${email}?`)) {
      const updated = users.filter(u => u.email !== email);
      setUsers(updated);
      localStorage.setItem('users', JSON.stringify(updated));
    }
  };

  // SAVE HANDLERS
  const handleSaveTest = (e: React.FormEvent) => {
    e.preventDefault();
    const testData: Test = { ...newTest as Test, id: modalMode === 'edit' && editingId ? editingId : `test-${Date.now()}`, totalQuestions: newTest.questions?.length || 0 };
    const customTests = JSON.parse(localStorage.getItem('custom_tests') || '[]');
    if (modalMode === 'edit') {
      setTests(tests.map(t => t.id === editingId ? testData : t));
      localStorage.setItem('custom_tests', JSON.stringify(customTests.map((t: any) => t.id === editingId ? testData : t)));
    } else {
      setTests([...tests, testData]);
      localStorage.setItem('custom_tests', JSON.stringify([...customTests, testData]));
      const notif = { id: Date.now().toString(), title: 'New Exam Published!', message: `The exam "${testData.title}" is now live. Check it out!`, type: 'success' as any, date: new Date().toISOString(), isRead: false };
      const updatedNotifs = [notif, ...notifications];
      setNotifications(updatedNotifs);
      localStorage.setItem('notifications', JSON.stringify(updatedNotifs));
    }
    setShowModal(false);
  };

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    let data: any; let storageKey: string; let stateSet: any; let currentData: any;
    if (modalType === 'vocabulary') { data = { ...currentVocab, id: modalMode === 'edit' ? editingId : `v-${Date.now()}` }; storageKey = 'custom_vocab'; stateSet = setVocabData; currentData = vocabData; }
    else if (modalType === 'grammar') { data = { ...currentGrammar, id: modalMode === 'edit' ? editingId : `g-${Date.now()}` }; storageKey = 'custom_grammar'; stateSet = setGrammarData; currentData = grammarData; }
    else { data = { ...currentFlashcard, id: modalMode === 'edit' ? editingId : `f-${Date.now()}` }; storageKey = 'custom_flashcards'; stateSet = setFlashcardData; currentData = flashcardData; }
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (modalMode === 'edit') {
      stateSet(currentData.map((v: any) => v.id === editingId ? data : v));
      localStorage.setItem(storageKey, JSON.stringify(stored.map((v: any) => v.id === editingId ? data : v)));
    } else {
      stateSet([...currentData, data]);
      localStorage.setItem(storageKey, JSON.stringify([...stored, data]));
    }
    setShowModal(false);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updatedQs = [...(newTest.questions || [])];
    updatedQs[index] = { ...updatedQs[index], [field]: value };
    setNewTest(prev => ({ ...prev, questions: updatedQs }));
  };

  const filteredTests = tests.filter(t => 
    (catFilter === 'All' || t.category === catFilter) &&
    (yearFilter === 'All' || t.year.toString() === yearFilter) &&
    (t.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}><ShieldCheck size={32} className={styles.adminIcon} /><h2>Admin Pro</h2></div>
        <nav className={styles.nav}>
          <button className={`${styles.navItem} ${activeTab === 'stats' ? styles.active : ''}`} onClick={() => setActiveTab('stats')}><BarChart3 size={20} /> <span>User Analytics</span></button>
          <button className={`${styles.navItem} ${activeTab === 'users' ? styles.active : ''}`} onClick={() => setActiveTab('users')}><Users size={20} /> <span>Learners Base</span></button>
          <button className={`${styles.navItem} ${activeTab === 'tests' ? styles.active : ''}`} onClick={() => setActiveTab('tests')}><FileText size={20} /> <span>Test Center</span></button>
          <button className={`${styles.navItem} ${activeTab === 'lessons' ? styles.active : ''}`} onClick={() => setActiveTab('lessons')}><BookOpen size={20} /> <span>Courseware</span></button>
          <button className={`${styles.navItem} ${activeTab === 'notifications' ? styles.active : ''}`} onClick={() => setActiveTab('notifications')}><Bell size={20} /> <span>Broadcasting</span></button>
        </nav>
        <button className={styles.backBtn} onClick={() => navigate('/')}><ArrowLeft size={18} /> <span>Exit Admin</span></button>
      </aside>

      <main className={styles.content}>
        {activeTab === 'stats' && (
          <div className={styles.analyticsPanel}>
            <div className={styles.headerRow}><h1 className={styles.pageTitle}>User Intelligence</h1><div className={styles.aiStatusBadge}><Cpu size={16} /> <span>Ready for AI Integration</span></div></div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}><div className={styles.iconBox} style={{background: '#eff6ff', color: '#2563eb'}}><Users size={28}/></div><div className={styles.statInfo}><span className={styles.statValue}>{stats.totalUsers}</span><span className={styles.statLabel}>Registrations</span></div></div>
              <div className={styles.statCard}><div className={styles.iconBox} style={{background: '#ecfdf5', color: '#10b981'}}><TrendingUp size={28}/></div><div className={styles.statInfo}><span className={styles.statValue}>{stats.activeLearners}</span><span className={styles.statLabel}>Active Students</span></div></div>
              <div className={styles.statCard}><div className={styles.iconBox} style={{background: '#fffbeb', color: '#f59e0b'}}><Zap size={28}/></div><div className={styles.statInfo}><span className={styles.statValue}>{stats.avgCompletionRate}%</span><span className={styles.statLabel}>Avg. Engagement</span></div></div>
              <div className={styles.statCard}><div className={styles.iconBox} style={{background: '#fef2f2', color: '#ef4444'}}><Award size={28}/></div><div className={styles.statInfo}><span className={styles.statValue}>{stats.avgScore}%</span><span className={styles.statLabel}>Skill Mastery</span></div></div>
            </div>
            <div className={styles.analyticsGrid}>
              <div className={styles.whitePanel}><h3 className={styles.panelTitle}>Top Performing Learners</h3><div className={styles.topLearnerList}>{stats.topLearners.map(([email, count]: any, idx) => (<div key={email} className={styles.learnerRankItem}><span className={styles.rankNum}>#{idx + 1}</span><div className={styles.learnerMain}><strong>{email}</strong><span>{count} exams taken</span></div><div className={styles.rankBadge}><Zap size={14}/> Top Pro</div></div>))}</div></div>
              <div className={styles.aiPanel}><div className={styles.aiHeader}><BrainCircuit size={36} className={styles.aiIcon} /><h3>AI-Powered Insights</h3></div><p className={styles.aiDesc}>Analyze weak points and predict future performance based on behavioral patterns.</p><div className={styles.aiConnectBox}><div className={styles.dashedCircle}><Cpu size={28} /></div><button className={styles.connectBtn}>Connect Intelligence</button></div></div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className={styles.usersPanel}>
            <div className={styles.panelHeader}><h1 className={styles.pageTitle}>Learner Accounts</h1></div>
            <div className={styles.filterBar}><div className={styles.searchBar}><Search size={18} /><input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div></div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead><tr><th>Student Info</th><th>Email Address</th><th>Account Role</th><th>Actions</th></tr></thead>
                <tbody>{users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())).map(user => (
                  <tr key={user.email}>
                    <td><div className={styles.userCellInfo}><div className={styles.userAvatarSmall}>{user.name.charAt(0)}</div><strong>{user.name}</strong></div></td>
                    <td><div className={styles.mailCell}><Mail size={14}/> {user.email}</div></td>
                    <td><span className={`${styles.roleBadge} ${styles[user.role || 'user']}`}>{user.role || 'user'}</span></td>
                    <td><button className={styles.deleteBtn} onClick={() => deleteUser(user.email)} disabled={user.role === 'admin'}><Trash2 size={18} /></button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tests' && (
          <div className={styles.testsPanel}>
            <div className={styles.panelHeader}><h1 className={styles.pageTitle}>Practice Exams</h1><button className={styles.sparkleBtn} onClick={openAddTest}><PlusCircle size={18} /> Create Practice Exam</button></div>
            <div className={styles.filterBar}>
              <div className={styles.searchBar}><Search size={18} /><input type="text" placeholder="Search exams..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
              <div className={styles.filterGroup}><Filter size={18} /><select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}><option value="All">Categories</option><option value="TOEIC">TOEIC</option><option value="IELTS">IELTS</option></select><select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}><option value="All">Years</option><option value="2025">2025</option><option value="2026">2026</option></select></div>
            </div>
            <div className={styles.testList}>{filteredTests.map(test => (
              <div key={test.id} className={styles.testRow}><div className={styles.testMetaInfo}><div className={styles.testIconBox}>{test.category.charAt(0)}</div><div><h4>{test.title}</h4><p>{test.category} • {test.year} • {test.questions.length} Qs</p></div></div><div className={styles.actions}><button className={styles.editBtn} onClick={() => openEditTest(test)}><Edit size={18}/> Edit</button><button className={styles.deleteBtn} onClick={() => {if(window.confirm('Delete exam?')) setTests(tests.filter(t => t.id !== test.id))}}><Trash2 size={18}/></button></div></div>
            ))}</div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className={styles.lessonsPanel}>
            <div className={styles.panelHeader}><h1 className={styles.pageTitle}>Courseware</h1><button className={styles.sparkleBtnCyan} onClick={openAddLesson}><PlusCircle size={18} /> New Material</button></div>
            <div className={styles.lessonTabs}><button className={lessonType === 'vocabulary' ? styles.activeLessonTab : ''} onClick={() => setLessonType('vocabulary')}>Vocabulary</button><button className={lessonType === 'grammar' ? styles.activeLessonTab : ''} onClick={() => setLessonType('grammar')}>Grammar</button><button className={lessonType === 'flashcards' ? styles.activeLessonTab : ''} onClick={() => setLessonType('flashcards')}>Flashcards</button></div>
            <div className={styles.lessonGrid}>
              {(lessonType === 'vocabulary' ? vocabData : lessonType === 'grammar' ? grammarData : flashcardData).map((item: any) => (
                <div key={item.id} className={styles.lessonItem}>
                  <div className={styles.lessonIconSmall}>{lessonType === 'vocabulary' ? <Type size={20}/> : <Layout size={20}/>}</div>
                  <div className={styles.lessonInfoText}><strong>{item.title || item.front}</strong><span>{lessonType === 'vocabulary' ? `${item.words?.length || 0} items` : 'Live Material'}</span></div>
                  <div className={styles.lessonActions}><button className={styles.tinyEdit} onClick={() => openEditLesson(item, lessonType === 'flashcards' ? 'flashcard' : lessonType)}><Edit size={16}/></button><button className={styles.tinyDelete}><Trash2 size={16}/></button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className={styles.notifPanel}>
            <div className={styles.panelHeader}><h1 className={styles.pageTitle}>System Alerts</h1><button className={styles.sparkleBtnOrange} onClick={() => {setModalType('notification'); setModalMode('add'); setShowModal(true)}}><Bell size={18} /> Send System Alert</button></div>
            <div className={styles.notifListFull}>{notifications.map(n => (
              <div key={n.id} className={styles.notifCardFull}><div className={`${styles.notifTypeIcon} ${styles[n.type]}`}><Bell size={24}/></div><div className={styles.notifBody}><div className={styles.notifHeader}><h4>{n.title}</h4><span>{new Date(n.date).toLocaleString()}</span></div><p>{n.message}</p></div><button className={styles.deleteBtn} onClick={() => setNotifications(notifications.filter(i => i.id !== n.id))}><Trash2 size={18}/></button></div>
            ))}</div>
          </div>
        )}
      </main>

      {/* REFINED MODAL SYSTEM */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modal} ${modalType === 'test' ? styles.largeModal : ''}`}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleRow}>{modalType === 'test' ? <FileText className={styles.modalIcon}/> : <Sparkles className={styles.modalIcon}/>}<h3>{modalMode === 'edit' ? 'Update' : 'Create New'} {modalType.toUpperCase()}</h3></div>
              <button className={styles.closeModal} onClick={() => setShowModal(false)}><X size={24}/></button>
            </div>
            <form className={styles.scrollableForm} onSubmit={modalType === 'test' ? handleSaveTest : modalType === 'notification' ? (e) => { e.preventDefault(); pushNotification(newNotif.title, newNotif.message, newNotif.type); setShowModal(false); } : handleSaveLesson}>
              {modalType === 'test' && (
                <div className={styles.formContent}>
                  <div className={styles.formSection}>
                    <h4>Exam Configuration</h4>
                    <div className={styles.inputGroup}><label>Test Title</label><input value={newTest.title} onChange={e => setNewTest({...newTest, title: e.target.value})} required placeholder="e.g., TOEIC Mock #05" /></div>
                    <div className={styles.formRow3}>
                      <div className={styles.inputGroup}><label>Category</label><select value={newTest.category} onChange={e => setNewTest({...newTest, category: e.target.value as any})}><option value="TOEIC">TOEIC</option><option value="IELTS">IELTS</option></select></div>
                      <div className={styles.inputGroup}><label>Year</label><input type="number" value={newTest.year} onChange={e => setNewTest({...newTest, year: parseInt(e.target.value)})} /></div>
                      <div className={styles.inputGroup}><label>Time (Min)</label><input type="number" value={newTest.durationMinutes} onChange={e => setNewTest({...newTest, durationMinutes: parseInt(e.target.value)})} /></div>
                    </div>
                  </div>
                  <div className={styles.formSection}>
                    <div className={styles.headerRow}><h4>Questions Bank ({newTest.questions?.length})</h4><button type="button" className={styles.sparkleBtn} style={{padding: '8px 16px', fontSize: '0.85rem'}} onClick={() => {const newQ = { id: `q-${Date.now()}`, type: 'multiple-choice' as any, text: '', options: ['', '', '', ''], correctAnswer: '', explanation: '' }; setNewTest(prev => ({ ...prev, questions: [...(prev.questions || []), newQ] }))}}><Plus size={14}/> Add New Question</button></div>
                    <div className={styles.qList}>{newTest.questions?.map((q, idx) => (
                      <div key={idx} className={styles.qCard}>
                        <div className={styles.qCardHeader}><span>QUESTION #{idx + 1}</span><button type="button" onClick={() => {const updated = [...(newTest.questions || [])]; updated.splice(idx, 1); setNewTest({...newTest, questions: updated})}}><Trash2 size={16}/></button></div>
                        <div className={styles.inputGroup}><label>Content</label><textarea value={q.text} onChange={e => updateQuestion(idx, 'text', e.target.value)} rows={2} /></div>
                        <div className={styles.formRow3}>{q.options?.map((opt, oIdx) => (<div key={oIdx} className={styles.inputGroup}><label>Option {String.fromCharCode(65 + oIdx)}</label><input value={opt} onChange={e => {const opts = [...(q.options || [])]; opts[oIdx] = e.target.value; updateQuestion(idx, 'options', opts)}} /></div>))}</div>
                        <div className={styles.formRow3} style={{gridTemplateColumns: '1fr 2fr'}}><div className={styles.inputGroup}><label>Correct Key</label><input value={q.correctAnswer} onChange={e => updateQuestion(idx, 'correctAnswer', e.target.value)} placeholder="A, B, C or D" /></div><div className={styles.inputGroup}><label>Explain</label><input value={q.explanation} onChange={e => updateQuestion(idx, 'explanation', e.target.value)} /></div></div>
                      </div>
                    ))}</div>
                  </div>
                </div>
              )}
              {/* Other types remain simple for now but polished */}
              {(modalType === 'vocabulary' || modalType === 'grammar' || modalType === 'flashcard') && (
                <div className={styles.formSection}>
                  <div className={styles.inputGroup}><label>Title / Front</label><input value={modalType === 'vocabulary' ? currentVocab.title : modalType === 'grammar' ? currentGrammar.title : currentFlashcard.front} onChange={e => {
                    if(modalType === 'vocabulary') setCurrentVocab({...currentVocab, title: e.target.value});
                    if(modalType === 'grammar') setCurrentGrammar({...currentGrammar, title: e.target.value});
                    if(modalType === 'flashcard') setCurrentFlashcard({...currentFlashcard, front: e.target.value});
                  }} required /></div>
                  <div className={styles.inputGroup}><label>Detailed Content / Back Side</label><textarea rows={8} value={modalType === 'vocabulary' ? currentVocab.description : modalType === 'grammar' ? currentGrammar.content : currentFlashcard.back} onChange={e => {
                    if(modalType === 'vocabulary') setCurrentVocab({...currentVocab, description: e.target.value});
                    if(modalType === 'grammar') setCurrentGrammar({...currentGrammar, content: e.target.value});
                    if(modalType === 'flashcard') setCurrentFlashcard({...currentFlashcard, back: e.target.value});
                  }} required /></div>
                </div>
              )}
              {modalType === 'notification' && (
                <div className={styles.formSection}>
                  <div className={styles.inputGroup}><label>Alert Headline</label><input value={newNotif.title} onChange={e => setNewNotif({...newNotif, title: e.target.value})} required /></div>
                  <div className={styles.inputGroup}><label>Broadcast Message</label><textarea rows={5} value={newNotif.message} onChange={e => setNewNotif({...newNotif, message: e.target.value})} required /></div>
                  <div className={styles.inputGroup}><label>Priority Level</label><select value={newNotif.type} onChange={e => setNewNotif({...newNotif, type: e.target.value as any})}><option value="info">General Info</option><option value="success">Success / Promo</option><option value="warning">System Warning</option></select></div>
                </div>
              )}
              <div className={styles.modalFooter}><button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>Discard Changes</button><button type="submit" className={styles.saveBtn}><Save size={18}/> {modalMode === 'edit' ? 'Update Database' : 'Publish to Users'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
