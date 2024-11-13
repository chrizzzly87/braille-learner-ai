import { BrailleDot } from './BrailleDot';

interface BrailleCellProps {
  pattern: boolean[];
  interactive?: boolean;
  onDotClick?: (index: number) => void;
}

export const BrailleCell = ({ pattern, interactive = false, onDotClick }: BrailleCellProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {pattern.map((active, index) => (
        <BrailleDot
          key={index}
          active={active}
          interactive={interactive}
          onClick={() => onDotClick?.(index)}
        />
      ))}
    </div>
  );
};