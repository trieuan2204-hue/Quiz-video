import { QuizData } from './OptimizedQuizVideo';

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  category: 'education' | 'entertainment' | 'sports' | 'general' | 'custom';
  thumbnail: string;
  quizData: QuizData;
  tags: string[];
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'general-knowledge',
    name: 'General Knowledge',
    description: 'Classic trivia questions for all audiences',
    category: 'general',
    thumbnail: '🧠',
    tags: ['trivia', 'popular', 'viral'],
    quizData: {
      quiz_title: 'General Knowledge Quiz',
      questions: [
        {
          question: 'An _____ a day keeps the doctor away',
          choices: { A: 'egg', B: 'orange', C: 'apple', D: 'avocado' },
          correct: 'C',
          explanation: 'Apples contain Vitamin C and dietary fiber which boost overall immune health!',
        },
        {
          question: 'What is the capital of France?',
          choices: { A: 'London', B: 'Paris', C: 'Berlin', D: 'Rome' },
          correct: 'B',
          explanation: 'Paris has been the capital of France since 987 AD and is home to iconic landmarks like the Eiffel Tower.',
        },
        {
          question: 'What is the largest planet in our solar system?',
          choices: { A: 'Saturn', B: 'Neptune', C: 'Jupiter', D: 'Mars' },
          correct: 'C',
          explanation: 'Jupiter is the largest planet in our solar system, with a mass of 1.898 × 10^27 kg!',
        },
      ],
    },
  },
  {
    id: 'history-facts',
    name: 'History Facts',
    description: 'Engage viewers with fascinating historical facts',
    category: 'education',
    thumbnail: '📚',
    tags: ['history', 'educational', 'engaging'],
    quizData: {
      quiz_title: 'History Challenge',
      questions: [
        {
          question: 'In what year did the Titanic sink?',
          choices: { A: '1912', B: '1915', C: '1898', D: '1920' },
          correct: 'A',
          explanation: 'The RMS Titanic sank on April 15, 1912, after hitting an iceberg in the North Atlantic Ocean.',
        },
        {
          question: 'Who was the first President of the United States?',
          choices: { A: 'Thomas Jefferson', B: 'George Washington', C: 'John Adams', D: 'Benjamin Franklin' },
          correct: 'B',
          explanation: 'George Washington served as the first President of the United States from 1789 to 1797.',
        },
        {
          question: 'Which ancient wonder still stands today?',
          choices: { A: 'Colossus of Rhodes', B: 'Hanging Gardens', C: 'Great Pyramid of Giza', D: 'Lighthouse of Alexandria' },
          correct: 'C',
          explanation: 'The Great Pyramid of Giza is the only surviving ancient wonder of the world, built around 2560 BC.',
        },
      ],
    },
  },
  {
    id: 'sports-trivia',
    name: 'Sports Trivia',
    description: 'Challenge sports fans with exciting questions',
    category: 'sports',
    thumbnail: '⚽',
    tags: ['sports', 'competitive', 'viral'],
    quizData: {
      quiz_title: 'Sports Champion Quiz',
      questions: [
        {
          question: 'How many players are on a soccer field per team?',
          choices: { A: '9', B: '10', C: '11', D: '12' },
          correct: 'C',
          explanation: 'A soccer team has 11 players on the field: 1 goalkeeper, 10 outfield players.',
        },
        {
          question: 'In which year did the first FIFA World Cup take place?',
          choices: { A: '1930', B: '1950', C: '1962', D: '1974' },
          correct: 'A',
          explanation: 'The first FIFA World Cup was held in Uruguay in 1930, with 13 nations participating.',
        },
        {
          question: 'How many points is a touchdown worth in American Football?',
          choices: { A: '5 points', B: '6 points', C: '7 points', D: '8 points' },
          correct: 'B',
          explanation: 'A touchdown is worth 6 points in American Football. Teams can earn extra points with conversions.',
        },
      ],
    },
  },
  {
    id: 'movie-magic',
    name: 'Movie Magic',
    description: 'Test your knowledge of films and cinema',
    category: 'entertainment',
    thumbnail: '🎬',
    tags: ['movies', 'entertainment', 'trending'],
    quizData: {
      quiz_title: 'Movie Night Quiz',
      questions: [
        {
          question: 'What year was the first Star Wars film released?',
          choices: { A: '1975', B: '1977', C: '1979', D: '1981' },
          correct: 'B',
          explanation: 'A New Hope, the first Star Wars film, was released on May 25, 1977.',
        },
        {
          question: 'Which actor played James Bond first?',
          choices: { A: 'Roger Moore', B: 'Sean Connery', C: 'Pierce Brosnan', D: 'Daniel Craig' },
          correct: 'B',
          explanation: 'Sean Connery was the first actor to play James Bond, starting with "Dr. No" in 1962.',
        },
        {
          question: 'What is the highest-grossing film of all time?',
          choices: { A: 'Avatar', B: 'Avengers: Endgame', C: 'Avatar: The Way of Water', D: 'Titanic' },
          correct: 'C',
          explanation: 'Avatar: The Way of Water is the highest-grossing film, earning over $2.3 billion worldwide.',
        },
      ],
    },
  },
  {
    id: 'tech-savvy',
    name: 'Tech Trivia',
    description: 'Challenge tech enthusiasts with modern tech questions',
    category: 'education',
    thumbnail: '💻',
    tags: ['technology', 'tech', 'trending'],
    quizData: {
      quiz_title: 'Tech Challenge',
      questions: [
        {
          question: 'What year was the first iPhone released?',
          choices: { A: '2005', B: '2007', C: '2009', D: '2010' },
          correct: 'B',
          explanation: 'The first iPhone was released on June 29, 2007, revolutionizing the mobile industry.',
        },
        {
          question: 'Who founded Microsoft?',
          choices: { A: 'Steve Jobs', B: 'Elon Musk', C: 'Bill Gates', D: 'Mark Zuckerberg' },
          correct: 'C',
          explanation: 'Bill Gates co-founded Microsoft with Paul Allen in 1975.',
        },
        {
          question: 'What does AI stand for?',
          choices: { A: 'Automated Intelligence', B: 'Artificial Intelligence', C: 'Advanced Internet', D: 'Automated Internet' },
          correct: 'B',
          explanation: 'AI stands for Artificial Intelligence, the simulation of human intelligence by machines.',
        },
      ],
    },
  },
  {
    id: 'music-beats',
    name: 'Music Knowledge',
    description: 'Test your music knowledge with pop culture questions',
    category: 'entertainment',
    thumbnail: '🎵',
    tags: ['music', 'entertainment', 'viral'],
    quizData: {
      quiz_title: 'Music Quiz',
      questions: [
        {
          question: 'Who is known as the "King of Pop"?',
          choices: { A: 'Elvis Presley', B: 'Michael Jackson', C: 'Prince', D: 'David Bowie' },
          correct: 'B',
          explanation: 'Michael Jackson earned the title "King of Pop" for his revolutionary music and dance moves.',
        },
        {
          question: 'What year did The Beatles break up?',
          choices: { A: '1968', B: '1969', C: '1970', D: '1972' },
          correct: 'C',
          explanation: 'The Beatles officially disbanded in 1970 after 10 years of revolutionizing music.',
        },
        {
          question: 'Which artist has won the most Grammy Awards?',
          choices: { A: 'Beyoncé', B: 'Taylor Swift', C: 'The Beatles', D: 'Elvis Presley' },
          correct: 'A',
          explanation: 'Beyoncé holds the record for the most Grammy Awards with 32 wins as of 2023.',
        },
      ],
    },
  },
];

export const getPresetById = (id: string): PresetTemplate | undefined => {
  return PRESET_TEMPLATES.find((template) => template.id === id);
};

export const getPresetsByCategory = (
  category: PresetTemplate['category']
): PresetTemplate[] => {
  return PRESET_TEMPLATES.filter((template) => template.category === category);
};

export const searchPresets = (query: string): PresetTemplate[] => {
  const lowercaseQuery = query.toLowerCase();
  return PRESET_TEMPLATES.filter(
    (template) =>
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.description.toLowerCase().includes(lowercaseQuery) ||
      template.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};
