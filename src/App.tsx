import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
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
import './index.css';

// Component to handle layout logic
const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Các Route cần bảo vệ - Phải đăng nhập mới được xem */}
      <Route path="/tests" element={<ProtectedRoute><TestsHub /></ProtectedRoute>} />
      <Route path="/lessons" element={<ProtectedRoute><LessonsHub /></ProtectedRoute>} />
      <Route path="/lessons/vocabulary" element={<ProtectedRoute><Vocabulary /></ProtectedRoute>} />
      <Route path="/lessons/grammar" element={<ProtectedRoute><Grammar /></ProtectedRoute>} />
      <Route path="/lessons/reading-practice" element={<ProtectedRoute><ReadingPractice /></ProtectedRoute>} />
      <Route path="/flashcards" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
      <Route path="/category/:categoryId" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
      <Route path="/test/:testId" element={<ProtectedRoute><TestTaking /></ProtectedRoute>} />
      <Route path="/results/:testId" element={<ProtectedRoute><Results /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
      <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    </Routes>
  );

  if (isAdminPage) {
    return routes;
  }

  return <Layout>{routes}</Layout>;
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
