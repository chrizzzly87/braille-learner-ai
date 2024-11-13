import { useState, useEffect, useCallback } from 'react';
import { Trophy } from 'lucide-react';
import { brailleAlphabet } from '../data/brailleData';
import { BrailleCell } from './BrailleCell';
import { QuizQuestion, QuizMode, HighScore } from '../types';
import { generateQuizQuestions } from '../data/brailleData';
import { Timer } from './Timer';
import { HighScoresModal } from './HighScoresModal';

const QUESTIONS_PER_QUIZ = 10;

export const Quiz = () => {
  const [mode, setMode] = useState<QuizMode>('letter');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [showHighScores, setShowHighScores] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [userPattern, setUserPattern] = useState<boolean[]>(Array(6).fill(false));

  useEffect(() => {
    const storedScores = localStorage.getItem('brailleHighScores');
    if (storedScores) {
      setHighScores(JSON.parse(storedScores));
    }
    const newQuestions = generateQuizQuestions(mode);
    setQuestions(newQuestions.slice(0, QUESTIONS_PER_QUIZ));
  }, [mode]);

  const startGame = () => {
    setGameStarted(true);
    setIsTimerRunning(true);
  };

  const saveHighScore = useCallback(() => {
    const newScore: HighScore = {
      mode,
      score,
      totalQuestions: QUESTIONS_PER_QUIZ,
      timeInSeconds,
      date: new Date().toISOString(),
    };

    const updatedScores = [...highScores, newScore]
      .sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return a.timeInSeconds - b.timeInSeconds;
      })
      .slice(0, 10);

    setHighScores(updatedScores);
    localStorage.setItem('brailleHighScores', JSON.stringify(updatedScores));
  }, [mode, score, timeInSeconds, highScores]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setUserPattern(Array(6).fill(false));
      } else {
        setIsTimerRunning(false);
        setShowResult(true);
        saveHighScore();
      }
    }, 1500);
  };

  const handleDotToggle = (index: number) => {
    if (mode !== 'reverse' || isAnswered) return;
    
    const newPattern = [...userPattern];
    newPattern[index] = !newPattern[index];
    setUserPattern(newPattern);
  };

  const checkReverseAnswer = () => {
    const correctPattern = brailleAlphabet[questions[currentQuestion].question];
    const isCorrect = userPattern.every((dot, index) => dot === correctPattern[index]);
    handleAnswer(isCorrect ? questions[currentQuestion].question : '');
  };

  const resetQuiz = () => {
    const newQuestions = generateQuizQuestions(mode);
    setQuestions(newQuestions.slice(0, QUESTIONS_PER_QUIZ));
    setGameStarted(false);
    setShowResult(false);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeInSeconds(0);
    setIsTimerRunning(false);
    setUserPattern(Array(6).fill(false));
  };

  if (showResult) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-xl mb-2">
            Score: {score}/{QUESTIONS_PER_QUIZ}
          </p>
          <p className="text-lg mb-8">
            Time: {Math.floor(timeInSeconds / 60)}m {timeInSeconds % 60}s
          </p>

          <button
            onClick={resetQuiz}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 mt-6"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setMode('letter');
              resetQuiz();
            }}
            className={`px-4 sm:px-6 py-2 rounded-lg ${
              mode === 'letter' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Letters
          </button>
          <button
            onClick={() => {
              setMode('word');
              resetQuiz();
            }}
            className={`px-4 sm:px-6 py-2 rounded-lg ${
              mode === 'word' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Words
          </button>
          <button
            onClick={() => {
              setMode('reverse');
              resetQuiz();
            }}
            className={`px-4 sm:px-6 py-2 rounded-lg ${
              mode === 'reverse' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Reverse
          </button>
        </div>
        <div className="flex items-center gap-2">
          {gameStarted && (
            <Timer
              isRunning={isTimerRunning}
              time={timeInSeconds}
              onTick={() => setTimeInSeconds((t) => t + 1)}
            />
          )}
          <button
            onClick={() => setShowHighScores(true)}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Show high scores"
          >
            <Trophy className="w-6 h-6" />
          </button>
        </div>
      </div>

      {!gameStarted ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
          <button
            onClick={startGame}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-4">
            <span className="text-lg font-semibold">
              Score: {score}/{currentQuestion + 1}
            </span>
          </div>

          {mode === 'reverse' ? (
            <div className="flex flex-col items-center gap-6">
              <span className="text-4xl font-bold">
                {questions[currentQuestion].question.toUpperCase()}
              </span>
              <BrailleCell
                pattern={userPattern}
                interactive={!isAnswered}
                onDotClick={handleDotToggle}
              />
              <button
                onClick={checkReverseAnswer}
                disabled={isAnswered}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                Check Answer
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-8">
                {mode === 'letter' ? (
                  <BrailleCell
                    pattern={brailleAlphabet[questions[currentQuestion].question]}
                  />
                ) : (
                  <div className="flex gap-4">
                    {questions[currentQuestion].question.split('').map((letter, index) => (
                      <BrailleCell key={index} pattern={brailleAlphabet[letter]} />
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => {
                  let buttonStyle = 'bg-white border-2 border-black';
                  if (isAnswered) {
                    if (option === questions[currentQuestion].correct) {
                      buttonStyle = 'bg-green-500 text-white border-2 border-green-500';
                    } else if (option === selectedAnswer) {
                      buttonStyle = 'bg-red-500 text-white border-2 border-red-500';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={isAnswered}
                      className={`${buttonStyle} px-6 py-3 rounded-lg transition-colors duration-200`}
                    >
                      {option.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <div className="mt-6 text-center text-gray-600">
            Question {currentQuestion + 1} of {QUESTIONS_PER_QUIZ}
          </div>
        </div>
      )}

      <HighScoresModal
        isOpen={showHighScores}
        onClose={() => setShowHighScores(false)}
        scores={highScores}
      />
    </div>
  );
};