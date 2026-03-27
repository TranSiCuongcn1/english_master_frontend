import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tests" element={<TestsHub />} />
          <Route path="/lessons" element={<LessonsHub />} />
          <Route path="/lessons/vocabulary" element={<Vocabulary />} />
          <Route path="/lessons/grammar" element={<Grammar />} />
          <Route path="/lessons/reading-practice" element={<ReadingPractice />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/test/:testId" element={<TestTaking />} />
          <Route path="/results/:testId" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
