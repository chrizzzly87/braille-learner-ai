import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LearnMode } from './components/LearnMode';
import { Quiz } from './components/QuizMode';
import { Reference } from './components/Reference';
import { Settings } from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('learn');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">Braille Master</h1>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-8">
        {activeTab === 'learn' && <LearnMode />}
        {activeTab === 'quiz' && <Quiz />}
        {activeTab === 'reference' && <Reference />}
      </main>

      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default App;