import { X } from 'lucide-react';
import { HighScore, QuizMode } from '../types';

interface HighScoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  scores: HighScore[];
}

export const HighScoresModal = ({ isOpen, onClose, scores }: HighScoresModalProps) => {
  if (!isOpen) return null;

  const modes: QuizMode[] = ['letter', 'word', 'reverse'];
  const modeLabels = {
    letter: 'Letter Quiz',
    word: 'Word Quiz',
    reverse: 'Reverse Quiz'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">High Scores</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid gap-8">
          {modes.map(mode => {
            const modeScores = scores
              .filter(score => score.mode === mode)
              .sort((a, b) => {
                if (a.score !== b.score) return b.score - a.score;
                return a.timeInSeconds - b.timeInSeconds;
              })
              .slice(0, 5);

            return (
              <div key={mode}>
                <h3 className="text-xl font-semibold mb-4">{modeLabels[mode]}</h3>
                {modeScores.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid gap-2">
                      {modeScores.map((score, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-white p-3 rounded shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-bold">{index + 1}.</span>
                            <span>{score.score}/{score.totalQuestions}</span>
                            <span className="text-gray-500">
                              {Math.floor(score.timeInSeconds / 60)}m {score.timeInSeconds % 60}s
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(score.date).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No scores yet</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};