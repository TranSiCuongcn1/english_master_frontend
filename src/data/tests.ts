import type { Test, Flashcard, VocabularyTopic, GrammarTopic, ReadingPassage } from '../types';

export const mockTests: Test[] = [
  {
    id: 'toeic-reading-01',
    title: 'TOEIC Reading Practice 01',
    description: 'Focus on Part 5 & 6: Sentence Completion and Text Completion.',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 45,
    totalQuestions: 5,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        text: 'The manager decided to --- the meeting because of the inclement weather.',
        options: ['postpone', 'postpones', 'postponing', 'postponed'],
        correctAnswer: 'postpone',
        explanation: 'After "decided to", use the base form of the verb.',
        part: 5
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        text: 'Ms. Lee has been working --- than anyone else in the department.',
        options: ['hard', 'harder', 'hardest', 'hardly'],
        correctAnswer: 'harder',
        explanation: 'Comparative degree is needed here because of "than".',
        part: 5
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        text: 'The new policy will be --- starting next Monday.',
        options: ['effective', 'effect', 'effectively', 'effectiveness'],
        correctAnswer: 'effective',
        explanation: 'The adjective "effective" follows the verb "be".',
        part: 5
      },
      {
        id: 'q4',
        type: 'multiple-choice',
        text: 'Please --- your application by the end of the day.',
        options: ['submit', 'submits', 'submitting', 'submitted'],
        correctAnswer: 'submit',
        explanation: 'Imperative sentence starts with a base verb.',
        part: 5
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        text: 'The results of the study were --- than we had anticipated.',
        options: ['better', 'good', 'best', 'well'],
        correctAnswer: 'better',
        explanation: 'Comparative "better" is used with "than".',
        part: 5
      }
    ]
  },
  {
    id: 'toeic-full-01',
    title: 'TOEIC Full Reading Test 2026',
    description: 'A comprehensive TOEIC Reading exam covering all parts (5, 6, and 7).',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 75,
    totalQuestions: 10,
    questions: [
      {
        id: 'tf1',
        type: 'multiple-choice',
        text: 'Employees are required to wear their ID badges at all ---.',
        options: ['times', 'time', 'timing', 'timely'],
        correctAnswer: 'times',
        explanation: '"At all times" is a fixed phrase meaning always.',
        part: 5
      },
      {
        id: 'tf2',
        type: 'multiple-choice',
        text: 'The company is looking for a candidate who is --- in three languages.',
        options: ['fluent', 'fluency', 'fluently', 'fluid'],
        correctAnswer: 'fluent',
        explanation: '"Fluent" is the adjective modifying the candidate.',
        part: 5
      },
      {
        id: 'tf3',
        type: 'multiple-choice',
        text: 'The seminar was --- cancelled due to low registration.',
        options: ['unavoidably', 'unavoidable', 'unavoidability', 'avoid'],
        correctAnswer: 'unavoidably',
        explanation: 'The adverb "unavoidably" modifies the verb "cancelled".',
        part: 5
      }
      // ... more questions would be here in a real app
    ]
  },
  {
    id: 'ielts-reading-01',
    title: 'IELTS Academic Reading Mock 01',
    description: 'Academic Reading - Passage 1: The Evolution of Language.',
    category: 'IELTS',
    year: 2026,
    durationMinutes: 60,
    totalQuestions: 5,
    questions: [
      {
        id: 'i1',
        type: 'multiple-choice',
        text: 'According to the text, language evolved primarily for:',
        options: ['Social bonding', 'Hunting coordination', 'Artistic expression', 'Trade'],
        correctAnswer: 'Social bonding',
        explanation: 'The first paragraph states language helped early humans maintain social groups.',
        part: 1
      },
      {
        id: 'i2',
        type: 'multiple-choice',
        text: 'Which theory suggests language is an innate human ability?',
        options: ['Chomskyan Theory', 'Behaviorism', 'Evolutionary Theory', 'Sociolinguistics'],
        correctAnswer: 'Chomskyan Theory',
        explanation: 'Noam Chomsky proposed that humans are born with an innate "language acquisition device".',
        part: 1
      }
    ]
  },
  {
    id: 'ielts-reading-02',
    title: 'IELTS Academic Reading Mock 02',
    description: 'Academic Reading - Passage 2: Sustainable Urban Planning.',
    category: 'IELTS',
    year: 2026,
    durationMinutes: 60,
    totalQuestions: 5,
    questions: [
      {
        id: 'ir2-1',
        type: 'multiple-choice',
        text: 'What is "compact city" development?',
        options: ['High-density residential areas', 'Small cities only', 'Underground construction', 'Floating cities'],
        correctAnswer: 'High-density residential areas',
        explanation: 'The text defines compact cities as those with high-density land use.',
        part: 2
      }
    ]
  }
];

export const mockFlashcards: Flashcard[] = [
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

export const mockVocabulary: VocabularyTopic[] = [
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

export const mockGrammar: GrammarTopic[] = [
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

export const mockReading: ReadingPassage[] = [
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
