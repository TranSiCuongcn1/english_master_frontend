import type { Test, Flashcard, VocabularyTopic, GrammarTopic, ReadingPassage, ShortStory } from '../types';

export const mockTests: Test[] = [
  {
    id: 'toeic-listening-01',
    title: 'TOEIC Listening Practice - Part 1',
    description: 'Practice describing photographs with real-world scenarios.',
    category: 'TOEIC',
    year: 2026,
    durationMinutes: 15,
    totalQuestions: 2,
    questions: [
      {
        id: 'tl1-1',
        type: 'multiple-choice',
        text: 'Look at the picture and choose the best description.',
        options: [
          'They are sitting at a desk.',
          'They are walking in the park.',
          'They are eating in a restaurant.',
          'They are standing in a line.'
        ],
        correctAnswer: 'They are sitting at a desk.',
        explanation: 'The photo shows two people working at their office desks.',
        part: 1,
        skill: 'Listening',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'tl1-2',
        type: 'multiple-choice',
        text: 'What is the woman doing?',
        options: [
          'She is reading a book.',
          'She is drinking coffee.',
          'She is typing on a keyboard.',
          'She is talking on the phone.'
        ],
        correctAnswer: 'She is typing on a keyboard.',
        explanation: 'In the picture, the woman is clearly focused on her laptop screen and typing.',
        part: 1,
        skill: 'Listening',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Placeholder
        imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
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
        part: 5,
        skill: 'Grammar'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        text: 'Ms. Lee has been working --- than anyone else in the department.',
        options: ['hard', 'harder', 'hardest', 'hardly'],
        correctAnswer: 'harder',
        explanation: 'Comparative degree is needed here because of "than".',
        part: 5,
        skill: 'Grammar'
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        text: 'The new policy will be --- starting next Monday.',
        options: ['effective', 'effect', 'effectively', 'effectiveness'],
        correctAnswer: 'effective',
        explanation: 'The adjective "effective" follows the verb "be".',
        part: 5,
        skill: 'Vocabulary'
      },
      {
        id: 'q4',
        type: 'multiple-choice',
        text: 'Please --- your application by the end of the day.',
        options: ['submit', 'submits', 'submitting', 'submitted'],
        correctAnswer: 'submit',
        explanation: 'Imperative sentence starts with a base verb.',
        part: 5,
        skill: 'Grammar'
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        text: 'The results of the study were --- than we had anticipated.',
        options: ['better', 'good', 'best', 'well'],
        correctAnswer: 'better',
        explanation: 'Comparative "better" is used with "than".',
        part: 5,
        skill: 'Grammar'
      }
    ]
  }
];

// ... rest of the mock data stays the same (ShortStories, Flashcards, Vocabulary, Grammar, Reading)
// I will keep them but ensure they follow the updated structure if needed.
export const mockShortStories: ShortStory[] = [
  {
    id: 'story-1',
    title: 'The Lost Key',
    author: 'John Doe',
    content: 'Once upon a time, there was a small boy named Tim who found a mysterious golden key in his garden...',
    summary: 'A short story about a boy finding a mysterious key.',
    level: 'Beginner',
    category: 'Adventure',
    createdAt: '2026-03-20T10:00:00Z'
  }
];

export const mockFlashcards: Flashcard[] = [
  {
    id: 'f1',
    front: 'Postpone',
    back: 'Trì hoãn, hoãn lại',
    example: 'The meeting was postponed due to rain.',
    category: 'TOEIC'
  }
];

export const mockVocabulary: VocabularyTopic[] = [
  {
    id: 'business-comm',
    title: 'Business Communication',
    description: 'Essential words for office and business meetings.',
    words: [
      { word: 'Collaborate', type: 'verb', meaning: 'To work together with others', example: 'We need to collaborate on this project.' }
    ]
  }
];

export const mockGrammar: GrammarTopic[] = [
  {
    id: 'present-perfect',
    title: 'Present Perfect Tense',
    content: 'The present perfect is used for actions that happened at an unspecified time in the past.',
    examples: ['I have lived here for ten years.']
  }
];

export const mockReading: ReadingPassage[] = [
  {
    id: 'r1',
    title: 'The Future of AI',
    text: 'Artificial Intelligence is changing the way we work and live...',
    difficulty: 'Medium',
    questions: [
      {
        id: 'rq1',
        type: 'multiple-choice',
        text: 'What is the main topic of the passage?',
        options: ['Self-driving cars', 'Artificial Intelligence', 'Virtual assistants', 'Future of work'],
        correctAnswer: 'Artificial Intelligence',
        explanation: 'The passage discusses how AI is impacting various aspects of life.',
        skill: 'Reading'
      }
    ]
  }
];
