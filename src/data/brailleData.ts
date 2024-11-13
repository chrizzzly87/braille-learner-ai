import { QuizQuestion, QuizMode } from '../types';

// Number prefix (⠼) - dots 3,4,5,6
export const numberPrefix: boolean[] = [false, false, true, true, true, true];

export const brailleAlphabet: Record<string, boolean[]> = {
  'a': [true, false, false, false, false, false],   // ⠁ dot 1
  'b': [true, false, true, false, false, false],    // ⠃ dots 1-2
  'c': [true, true, false, false, false, false],    // ⠉ dots 1-4
  'd': [true, true, false, true, false, false],     // ⠙ dots 1-4-5
  'e': [true, false, false, true, false, false],    // ⠑ dots 1-5
  'f': [true, true, true, false, false, false],     // ⠋ dots 1-2-4
  'g': [true, true, true, true, false, false],      // ⠛ dots 1-2-4-5
  'h': [true, false, true, true, false, false],     // ⠓ dots 1-2-5
  'i': [false, true, true, false, false, false],    // ⠊ dots 2-4
  'j': [false, true, true, true, false, false],     // ⠚ dots 2-4-5
  'k': [true, false, false, false, true, false],    // ⠅ dots 1-3
  'l': [true, false, true, false, true, false],     // ⠇ dots 1-2-3
  'm': [true, true, false, false, true, false],     // ⠍ dots 1-3-4
  'n': [true, true, false, true, true, false],      // ⠝ dots 1-3-4-5
  'o': [true, false, false, true, true, false],     // ⠕ dots 1-3-5
  'p': [true, true, true, false, true, false],      // ⠏ dots 1-2-3-4
  'q': [true, true, true, true, true, false],       // ⠟ dots 1-2-3-4-5
  'r': [true, false, true, true, true, false],      // ⠗ dots 1-2-3-5
  's': [false, true, true, false, true, false],     // ⠎ dots 2-3-4
  't': [false, true, true, true, true, false],      // ⠞ dots 2-3-4-5
  'u': [true, false, false, false, true, true],     // ⠥ dots 1-3-6
  'v': [true, false, true, false, true, true],      // ⠧ dots 1-2-3-6
  'w': [false, true, true, true, false, true],      // ⠺ dots 2-4-5-6
  'x': [true, true, false, false, true, true],      // ⠭ dots 1-3-4-6
  'y': [true, true, false, true, true, true],       // ⠽ dots 1-3-4-5-6
  'z': [true, false, false, true, true, true]       // ⠵ dots 1-3-5-6
};

export const brailleNumbers: Record<string, boolean[]> = {
  '1': brailleAlphabet['a'],
  '2': brailleAlphabet['b'],
  '3': brailleAlphabet['c'],
  '4': brailleAlphabet['d'],
  '5': brailleAlphabet['e'],
  '6': brailleAlphabet['f'],
  '7': brailleAlphabet['g'],
  '8': brailleAlphabet['h'],
  '9': brailleAlphabet['i'],
  '0': brailleAlphabet['j']
};

export const braillePunctuation: Record<string, boolean[]> = {
  '.': [false, true, false, false, true, true],     // ⠲ dots 2-5-6
  ',': [false, true, false, false, false, false],   // ⠂ dot 2
  '?': [false, true, false, false, true, false],    // ⠢ dots 2-6
  '!': [false, true, true, false, true, false],     // ⠖ dots 2-3-5
  "'": [false, false, true, false, false, false],   // ⠄ dot 3
  '-': [false, false, true, false, false, true]     // ⠤ dots 3-6
};

export const generateQuizQuestions = (mode: QuizMode): QuizQuestion[] => {
  const letters = Object.keys(brailleAlphabet);
  const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
  
  if (mode === 'letter' || mode === 'reverse') {
    return shuffledLetters.map(letter => ({
      type: mode,
      question: letter,
      options: mode === 'letter' ? 
        [...shuffledLetters].sort(() => Math.random() - 0.5).slice(0, 4) : 
        [],
      correct: letter,
      pattern: mode === 'reverse' ? brailleAlphabet[letter] : undefined
    }));
  }

  // Word mode questions
  const words = ['learn', 'world', 'brain', 'speak', 'touch', 'light', 'dream', 'space'];
  return words.map(word => ({
    type: 'word',
    question: word,
    options: [...words].sort(() => Math.random() - 0.5).slice(0, 4),
    correct: word
  }));
};