import { BookOpen, GraduationCap, Layout, Settings as SettingsIcon } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSettingsClick: () => void;
}

export const Navigation = ({ activeTab, onTabChange, onSettingsClick }: NavigationProps) => {
  const tabs = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: GraduationCap },
    { id: 'reference', label: 'Reference', icon: Layout },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center py-2 px-4 ${
                activeTab === id
                  ? 'text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="mt-1 text-sm">{label}</span>
            </button>
          ))}
          <button
            onClick={onSettingsClick}
            className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-gray-700"
          >
            <SettingsIcon className="w-6 h-6" />
            <span className="mt-1 text-sm">Settings</span>
          </button>
        </div>
      </div>
    </nav>
  );
};