import type { Test, Flashcard } from '../types';

export const mockTests: Test[] = [
  // ... existing tests
  {
    id: 'toeic-reading-01',
    title: 'TOEIC Reading Practice 01',
    description: 'Focus on Part 5 & 6: Sentence Completion and Text Completion.',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 45,
    totalQuestions: 10,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        text: 'The manager decided to --- the meeting because of the inclement weather.',
        options: ['postpone', 'postpones', 'postponing', 'postponed'],
        correctAnswer: 'postpone',
        explanation: 'After "decided to", use the base form of the verb.',
        part: 5
      }
    ]
  },
  {
    id: 'toeic-02',
    title: 'TOEIC Practice Test 02',
    description: 'Grammar and Vocabulary focus.',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 45,
    totalQuestions: 1,
    questions: []
  },
  {
    id: 'toeic-03',
    title: 'TOEIC Practice Test 03',
    description: 'Listening and Reading comprehension.',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 45,
    totalQuestions: 1,
    questions: []
  },
  {
    id: 'toeic-04',
    title: 'TOEIC Practice Test 04',
    description: 'Full mock exam.',
    category: 'TOEIC',
    year: 2023,
    durationMinutes: 120,
    totalQuestions: 1,
    questions: []
  },
  {
    id: 'toeic-05',
    title: 'TOEIC Practice Test 05',
    description: 'Short practice.',
    category: 'TOEIC',
    year: 2022,
    durationMinutes: 30,
    totalQuestions: 1,
    questions: []
  },
  {
    id: 'toeic-06',
    title: 'TOEIC Practice Test 06',
    description: 'Grammar focus.',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 45,
    totalQuestions: 1,
    questions: []
  },
  {
    id: 'toeic-07',
    title: 'TOEIC Practice Test 07',
    description: 'Reading focus.',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 45,
    totalQuestions: 1,
    questions: []
  },
  {
    id: 'toeic-08',
    title: 'TOEIC Practice Test 08',
    description: 'Vocabulary focus.',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 45,
    totalQuestions: 1,
    questions: []
  },
  {
    id: 'toeic-09',
    title: 'TOEIC Practice Test 09',
    description: 'Sentence completion.',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 45,
    totalQuestions: 1,
    questions: []
  },
  {
    id: 'toeic-10',
    title: 'TOEIC Practice Test 10',
    description: 'Text completion.',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 45,
    totalQuestions: 1,
    questions: []
  },
  {
    id: 'toeic-11',
    title: 'TOEIC Practice Test 11 (Page 2)',
    description: 'This test should appear on the second page.',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 45,
    totalQuestions: 1,
    questions: []
  },
  {
    id: 'toeic-12',
    title: 'TOEIC Practice Test 12 (Page 2)',
    description: 'Another test on page 2.',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 45,
    totalQuestions: 1,
    questions: []
  },
  {
    id: 'ielts-reading-01',
    title: 'IELTS Reading Mock Test',
    description: 'Academic Reading - Passage 1: The History of Modern Architecture.',
    category: 'IELTS',
    year: 2026,
    durationMinutes: 60,
    totalQuestions: 5,
    questions: [
      {
        id: 'i1',
        type: 'multiple-choice',
        text: 'What was the primary material used in early modern architecture?',
        options: ['Concrete', 'Steel', 'Wood', 'Glass'],
        correctAnswer: 'Steel',
        explanation: 'Steel was the major innovation that allowed for vertical construction.',
        part: 1
      },
      {
        id: 'i2',
        type: 'multiple-choice',
        text: 'Which architect is mentioned as a pioneer of the International Style?',
        options: ['Le Corbusier', 'Frank Lloyd Wright', 'Gaudi', 'Zaha Hadid'],
        correctAnswer: 'Le Corbusier',
        explanation: 'Le Corbusier is central to the development of the International Style.',
        part: 1
      }
    ]
  },
  {
    id: 'hsk-1-01',
    title: 'HSK 1 Mock Test',
    description: 'Chinese Language Proficiency Test Level 1.',
    category: 'HSK',
    year: 2025,
    durationMinutes: 35,
    totalQuestions: 2,
    questions: [
      {
        id: 'h1',
        type: 'multiple-choice',
        text: 'Meaning of "你好" (Nǐ hǎo)?',
        options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'],
        correctAnswer: 'Hello',
        explanation: '"你好" is the standard greeting in Chinese.',
        part: 1
      },
      {
        id: 'h2',
        type: 'multiple-choice',
        text: 'Identify the character for "Teacher":',
        options: ['学生', '老师', '医生', '朋友'],
        correctAnswer: '老师',
        explanation: '"老师" (Lǎoshī) means teacher.',
        part: 1
      }
    ]
  }
];

export const mockFlashcards: Flashcard[] = [
  // ... existing flashcards
  {
    id: 'f1',
    front: 'Postpone',
    back: 'Trì hoãn, hoãn lại',
    example: 'The meeting was postponed due to rain.',
    category: 'TOEIC'
  },
  {
    id: 'f2',
    front: 'Responsible',
    back: 'Chịu trách nhiệm',
    example: 'You are responsible for this project.',
    category: 'TOEIC'
  },
  {
    id: 'f3',
    front: '老师 (Lǎoshī)',
    back: 'Teacher (Giáo viên)',
    example: '她是我的老师。 (She is my teacher.)',
    category: 'HSK'
  }
];

export const mockVocabulary: any[] = [
  {
    id: 'business-comm',
    title: 'Business Communication',
    description: 'Essential words for office and business meetings.',
    words: [
      { word: 'Collaborate', type: 'verb', meaning: 'To work together with others', example: 'We need to collaborate on this project.' },
      { word: 'Agenda', type: 'noun', meaning: 'A list of items to be discussed at a meeting', example: 'What is on the agenda for today?' }
    ]
  },
  {
    id: 'travel-tourism',
    title: 'Travel & Tourism',
    description: 'Words you need when traveling abroad.',
    words: [
      { word: 'Itinerary', type: 'noun', meaning: 'A planned route or journey', example: 'We have a very busy itinerary for our trip.' },
      { word: 'Accommodation', type: 'noun', meaning: 'A place to live or stay', example: 'The hotel provides great accommodation.' }
    ]
  }
];

export const mockGrammar: any[] = [
  {
    id: 'present-perfect',
    title: 'Present Perfect Tense',
    content: 'The present perfect is used for actions that happened at an unspecified time in the past or began in the past and continue to the present.',
    examples: [
      'I have lived here for ten years.',
      'She has already finished her homework.'
    ]
  },
  {
    id: 'conditionals',
    title: 'Conditional Sentences',
    content: 'Conditionals are used to speculate about what could happen, what might have happened, and what we wish would happen.',
    examples: [
      'If it rains, we will stay at home.',
      'If I were you, I would take that job.'
    ]
  }
];

export const mockReading: any[] = [
  {
    id: 'r1',
    title: 'The Future of AI',
    text: 'Artificial Intelligence is changing the way we work and live. From self-driving cars to virtual assistants, AI is everywhere...',
    questions: [
      {
        id: 'rq1',
        type: 'multiple-choice',
        text: 'What is the main topic of the passage?',
        options: ['Self-driving cars', 'Artificial Intelligence', 'Virtual assistants', 'Future of work'],
        correctAnswer: 'Artificial Intelligence',
        explanation: 'The passage discusses how AI is impacting various aspects of life.'
      }
    ]
  }
];
