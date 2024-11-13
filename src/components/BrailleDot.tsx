interface BrailleDotProps {
  active: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

export const BrailleDot = ({ active, onClick, interactive = false }: BrailleDotProps) => {
  return (
    <div
      onClick={interactive ? onClick : undefined}
      className={`
        w-4 h-4 rounded-full border-2 
        ${active ? 'bg-black border-black' : 'bg-white border-black'} 
        ${interactive ? 'cursor-pointer hover:opacity-80' : ''}
        transition-all duration-200
      `}
    />
  );
};