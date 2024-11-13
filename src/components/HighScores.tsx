import { HighScore, QuizMode } from '../types';

interface HighScoresProps {
  scores: HighScore[];
  currentMode: QuizMode;
}

export const HighScores = ({ scores, currentMode }: HighScoresProps) => {
  const filteredScores = scores
    .filter(score => score.mode === currentMode)
    .slice(0, 5);

  if (filteredScores.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">High Scores</h3>
      <div className="space-y-2">
        {filteredScores.map((score, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 p-3 rounded"
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
  );
};