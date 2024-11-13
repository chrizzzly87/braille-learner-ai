export interface BrailleLetter {
  letter: string;
  pattern: boolean[];
  description?: string;
}

export type QuizMode = 'letter' | 'word' | 'reverse';

export interface QuizQuestion {
  type: QuizMode;
  question: string;
  options: string[];
  correct: string;
  pattern?: boolean[];
}

export interface HighScore {
  mode: QuizMode;
  score: number;
  totalQuestions: number;
  timeInSeconds: number;
  date: string;
}

export interface Settings {
  language: 'en' | 'es' | 'fr';
  brailleSystem: 'international' | 'unified' | 'ueb';
}

export const DEFAULT_SETTINGS: Settings = {
  language: 'en',
  brailleSystem: 'international',
};