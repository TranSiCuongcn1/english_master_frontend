import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import TestTaking from './pages/TestTaking/TestTaking';
import Results from './pages/Results/Results';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import TestsHub from './pages/TestsHub/TestsHub';
import LessonsHub from './pages/LessonsHub/LessonsHub';
import Flashcards from './pages/Flashcards/Flashcards';
import Vocabulary from './pages/Vocabulary/Vocabulary';
import Grammar from './pages/Grammar/Grammar';
import ReadingPractice from './pages/ReadingPractice/ReadingPractice';
import UserPage from './pages/UserPage/UserPage';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import LessonsLayout from './pages/LessonsHub/LessonsLayout';
import './index.css';

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLessonsPage = location.pathname.startsWith('/lessons') || location.pathname === '/flashcards';

  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/tests" element={<ProtectedRoute><TestsHub /></ProtectedRoute>} />

      <Route path="/lessons" element={<ProtectedRoute><LessonsLayout><LessonsHub /></LessonsLayout></ProtectedRoute>} />
      <Route path="/lessons/vocabulary" element={<ProtectedRoute><LessonsLayout><Vocabulary /></LessonsLayout></ProtectedRoute>} />
      <Route path="/lessons/grammar" element={<ProtectedRoute><LessonsLayout><Grammar /></LessonsLayout></ProtectedRoute>} />
      <Route path="/lessons/reading-practice" element={<ProtectedRoute><LessonsLayout><ReadingPractice /></LessonsLayout></ProtectedRoute>} />
      <Route path="/flashcards" element={<ProtectedRoute><LessonsLayout><Flashcards /></LessonsLayout></ProtectedRoute>} />

      <Route path="/category/:categoryId" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
      <Route path="/test/:testId" element={<ProtectedRoute><TestTaking /></ProtectedRoute>} />
      <Route path="/results/:testId" element={<ProtectedRoute><Results /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
      <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    </Routes>
  );

  if (isAdminPage) return routes;

  if (isLessonsPage) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {routes}
        </div>
      </div>
    );
  }

  return <Layout>{routes}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
