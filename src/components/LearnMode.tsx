import { useState } from 'react';
import { brailleAlphabet } from '../data/brailleData';
import { BrailleCell } from './BrailleCell';

export const LearnMode = () => {
  const [selectedLetter, setSelectedLetter] = useState('a');

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Learn Braille</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex justify-center items-center mb-6">
          <div className="text-6xl font-bold mr-8">{selectedLetter.toUpperCase()}</div>
          <BrailleCell pattern={brailleAlphabet[selectedLetter]} />
        </div>
        
        <p className="text-center text-gray-600 mb-4">
          Click on any letter below to learn its Braille pattern
        </p>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {Object.keys(brailleAlphabet).map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`
              p-4 text-xl font-semibold rounded-lg
              ${selectedLetter === letter
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-100'}
              transition-colors duration-200
            `}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};