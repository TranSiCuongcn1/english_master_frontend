export type QuestionType = 'multiple-choice' | 'text';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  part?: number; // e.g., TOEIC Part 1, Part 2
}

export interface Test {
  id: string;
  title: string;
  description: string;
  category: 'TOEIC' | 'IELTS' | 'HSK' | 'JLPT' | 'General';
  year: number; // Thêm trường năm
  durationMinutes: number;
  totalQuestions: number;
  questions: Question[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  example?: string;
  category: string;
}

export interface VocabularyTopic {
  id: string;
  title: string;
  description: string;
  words: {
    word: string;
    type: string;
    meaning: string;
    example: string;
  }[];
}

export interface GrammarTopic {
  id: string;
  title: string;
  content: string;
  examples: string[];
}

export interface ReadingPassage {
  id: string;
  title: string;
  text: string;
  questions: Question[];
}

export interface User {
  name: string;
  email: string;
  password?: string;
  role?: 'user' | 'admin';
}

export interface UserFlashcard {
  id: string;
  front: string;
  back: string;
  example?: string;
  userEmail: string;
  createdAt: string;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface TestResult {
  testId: string;
  score: number;
  totalQuestions: number;
  timeTakenSeconds: number;
  answers: UserAnswer[];
  date: string;
  userEmail?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  date: string;
  isRead: boolean;
}

export interface LeaderboardEntry {
  userEmail: string;
  userName: string;
  totalTests: number;
  avgAccuracy: number;
  totalScore: number;
}
