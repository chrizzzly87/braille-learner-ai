import React from 'react';
import { Settings as SettingsType, DEFAULT_SETTINGS } from '../types';
import { X } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings = ({ isOpen, onClose }: SettingsProps) => {
  const [settings, setSettings] = React.useState<SettingsType>(() => {
    const stored = localStorage.getItem('brailleSettings');
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  });

  const handleSettingChange = (key: keyof SettingsType, value: string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('brailleSettings', JSON.stringify(newSettings));
  };

  const handleResetHighScores = () => {
    if (window.confirm('Are you sure you want to reset all high scores? This action cannot be undone.')) {
      localStorage.removeItem('brailleHighScores');
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Braille System
            </label>
            <select
              value={settings.brailleSystem}
              onChange={(e) => handleSettingChange('brailleSystem', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="international">International Braille</option>
              <option value="unified">Unified English Braille</option>
              <option value="ueb">UEB (Unified English Braille)</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              onClick={handleResetHighScores}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Reset High Scores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};