import { brailleAlphabet, brailleNumbers, numberPrefix, braillePunctuation } from '../data/brailleData';
import { BrailleCell } from './BrailleCell';

export const Reference = () => {
  const letterGroups = [
    Object.entries(brailleAlphabet).slice(0, 10),  // a-j
    Object.entries(brailleAlphabet).slice(10, 20), // k-t
    Object.entries(brailleAlphabet).slice(20),     // u-z
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Braille Reference</h2>
      
      <div className="space-y-12">
        {/* Letters */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Letters</h3>
          {letterGroups.map((group, index) => (
            <div key={index} className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4 mb-8">
              {group.map(([letter, pattern]) => (
                <div
                  key={letter}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center min-w-[110px]"
                >
                  <span className="text-2xl font-bold mb-2">{letter.toUpperCase()}</span>
                  <BrailleCell pattern={pattern} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Numbers */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Numbers</h3>
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">Number Sign (⠼):</span>
              <BrailleCell pattern={numberPrefix} />
            </div>
            <p className="text-center text-gray-600 mt-2">
              Place this sign before numbers to indicate they are numerals
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
            {Object.entries(brailleNumbers).map(([number, pattern]) => (
              <div
                key={number}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center min-w-[110px]"
              >
                <span className="text-2xl font-bold mb-2">{number}</span>
                <div className="flex flex-col gap-2">
                  <BrailleCell pattern={numberPrefix} />
                  <BrailleCell pattern={pattern} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Punctuation */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Common Punctuation</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {Object.entries(braillePunctuation).map(([symbol, pattern]) => (
              <div
                key={symbol}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center min-w-[110px]"
              >
                <span className="text-2xl font-bold mb-2">{symbol}</span>
                <BrailleCell pattern={pattern} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};