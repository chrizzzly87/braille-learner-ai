import React from 'react';

interface TimerProps {
  isRunning: boolean;
  time: number;
  onTick: () => void;
}

export const Timer = ({ isRunning, time, onTick }: TimerProps) => {
  React.useEffect(() => {
    let interval: number;
    
    if (isRunning) {
      interval = setInterval(onTick, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, onTick]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-lg font-mono">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};