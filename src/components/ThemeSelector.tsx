import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Theme } from '../types';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onClose: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
  onClose
}) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const themes = [
    { id: 'light' as Theme, name: 'Light', preview: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200' },
    { id: 'dark' as Theme, name: 'Dark', preview: 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700' },
    { id: 'oled' as Theme, name: 'OLED Black', preview: 'bg-black border-gray-800' },
    { id: 'blue' as Theme, name: 'Ocean Blue', preview: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200' },
    { id: 'green' as Theme, name: 'Forest Green', preview: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' },
    { id: 'purple' as Theme, name: 'Royal Purple', preview: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200' },
    { id: 'red' as Theme, name: 'Crimson Red', preview: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200' },
    { id: 'orange' as Theme, name: 'Sunset Orange', preview: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200' },
    { id: 'yellow' as Theme, name: 'Golden Yellow', preview: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200' },
    { id: 'pink' as Theme, name: 'Rose Pink', preview: 'bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200' },
    { id: 'indigo' as Theme, name: 'Deep Indigo', preview: 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200' },
    { id: 'teal' as Theme, name: 'Ocean Teal', preview: 'bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200' },
    { id: 'cyan' as Theme, name: 'Sky Cyan', preview: 'bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200' },
    { id: 'emerald' as Theme, name: 'Emerald Green', preview: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200' },
    { id: 'lime' as Theme, name: 'Electric Lime', preview: 'bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200' },
    { id: 'amber' as Theme, name: 'Warm Amber', preview: 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200' },
    { id: 'rose' as Theme, name: 'Soft Rose', preview: 'bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200' },
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className={`rounded-lg shadow-xl max-w-sm w-full max-h-96 flex flex-col ${
        currentTheme === 'dark' ? 'bg-gray-800 text-white border border-gray-700' :
        currentTheme === 'oled' ? 'bg-black text-white border border-gray-800' :
        currentTheme === 'blue' ? 'bg-blue-50 text-blue-900 border border-blue-200' :
        currentTheme === 'green' ? 'bg-green-50 text-green-900 border border-green-200' :
        currentTheme === 'purple' ? 'bg-purple-50 text-purple-900 border border-purple-200' :
        currentTheme === 'red' ? 'bg-red-50 text-red-900 border border-red-200' :
        currentTheme === 'orange' ? 'bg-orange-50 text-orange-900 border border-orange-200' :
        currentTheme === 'yellow' ? 'bg-yellow-50 text-yellow-900 border border-yellow-200' :
        currentTheme === 'pink' ? 'bg-pink-50 text-pink-900 border border-pink-200' :
        currentTheme === 'indigo' ? 'bg-indigo-50 text-indigo-900 border border-indigo-200' :
        currentTheme === 'teal' ? 'bg-teal-50 text-teal-900 border border-teal-200' :
        currentTheme === 'cyan' ? 'bg-cyan-50 text-cyan-900 border border-cyan-200' :
        currentTheme === 'emerald' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' :
        currentTheme === 'lime' ? 'bg-lime-50 text-lime-900 border border-lime-200' :
        currentTheme === 'amber' ? 'bg-amber-50 text-amber-900 border border-amber-200' :
        currentTheme === 'rose' ? 'bg-rose-50 text-rose-900 border border-rose-200' :
        'bg-white text-gray-900 border border-gray-200'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${
          currentTheme === 'dark' ? 'border-gray-700' :
          currentTheme === 'oled' ? 'border-gray-800' :
          currentTheme === 'blue' ? 'border-blue-200' :
          currentTheme === 'green' ? 'border-green-200' :
          currentTheme === 'purple' ? 'border-purple-200' :
          currentTheme === 'red' ? 'border-red-200' :
          currentTheme === 'orange' ? 'border-orange-200' :
          currentTheme === 'yellow' ? 'border-yellow-200' :
          currentTheme === 'pink' ? 'border-pink-200' :
          currentTheme === 'indigo' ? 'border-indigo-200' :
          currentTheme === 'teal' ? 'border-teal-200' :
          currentTheme === 'cyan' ? 'border-cyan-200' :
          currentTheme === 'emerald' ? 'border-emerald-200' :
          currentTheme === 'lime' ? 'border-lime-200' :
          currentTheme === 'amber' ? 'border-amber-200' :
          currentTheme === 'rose' ? 'border-rose-200' :
          'border-gray-200'
        }`}>
          <h2 className="text-lg font-semibold">Choose Theme</h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              currentTheme === 'dark' ? 'hover:bg-gray-700' :
              currentTheme === 'oled' ? 'hover:bg-gray-900' :
              currentTheme === 'blue' ? 'hover:bg-blue-100' :
              currentTheme === 'green' ? 'hover:bg-green-100' :
              currentTheme === 'purple' ? 'hover:bg-purple-100' :
              currentTheme === 'red' ? 'hover:bg-red-100' :
              currentTheme === 'orange' ? 'hover:bg-orange-100' :
              currentTheme === 'yellow' ? 'hover:bg-yellow-100' :
              currentTheme === 'pink' ? 'hover:bg-pink-100' :
              currentTheme === 'indigo' ? 'hover:bg-indigo-100' :
              currentTheme === 'teal' ? 'hover:bg-teal-100' :
              currentTheme === 'cyan' ? 'hover:bg-cyan-100' :
              currentTheme === 'emerald' ? 'hover:bg-emerald-100' :
              currentTheme === 'lime' ? 'hover:bg-lime-100' :
              currentTheme === 'amber' ? 'hover:bg-amber-100' :
              currentTheme === 'rose' ? 'hover:bg-rose-100' :
              'hover:bg-gray-100'
            }`}
            aria-label="Close theme selector"
          >
            <X size={20} />
          </button>
        </div>

        {/* Theme Options */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                onThemeChange(theme.id);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-3 border rounded-lg transition-colors ${
                currentTheme === 'dark' 
                  ? 'border-gray-600 hover:bg-gray-700' :
                currentTheme === 'oled'
                  ? 'border-gray-800 hover:bg-gray-900' :
                currentTheme === 'blue'
                  ? 'border-blue-200 hover:bg-blue-100' :
                currentTheme === 'green'
                  ? 'border-green-200 hover:bg-green-100' :
                currentTheme === 'purple'
                  ? 'border-purple-200 hover:bg-purple-100' :
                currentTheme === 'red'
                  ? 'border-red-200 hover:bg-red-100' :
                currentTheme === 'orange'
                  ? 'border-orange-200 hover:bg-orange-100' :
                currentTheme === 'yellow'
                  ? 'border-yellow-200 hover:bg-yellow-100' :
                currentTheme === 'pink'
                  ? 'border-pink-200 hover:bg-pink-100' :
                currentTheme === 'indigo'
                  ? 'border-indigo-200 hover:bg-indigo-100' :
                currentTheme === 'teal'
                  ? 'border-teal-200 hover:bg-teal-100' :
                currentTheme === 'cyan'
                  ? 'border-cyan-200 hover:bg-cyan-100' :
                currentTheme === 'emerald'
                  ? 'border-emerald-200 hover:bg-emerald-100' :
                currentTheme === 'lime'
                  ? 'border-lime-200 hover:bg-lime-100' :
                currentTheme === 'amber'
                  ? 'border-amber-200 hover:bg-amber-100' :
                currentTheme === 'rose'
                  ? 'border-rose-200 hover:bg-rose-100' :
                  'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded border-2 ${theme.preview}`}></div>
                <span className="font-medium">{theme.name}</span>
              </div>
              {currentTheme === theme.id && (
                <Check size={18} className={`${
                  currentTheme === 'oled' ? 'text-blue-400' :
                  currentTheme === 'blue' ? 'text-blue-600' :
                  currentTheme === 'green' ? 'text-green-600' :
                  currentTheme === 'purple' ? 'text-purple-600' :
                  currentTheme === 'red' ? 'text-red-600' :
                  currentTheme === 'orange' ? 'text-orange-600' :
                  currentTheme === 'yellow' ? 'text-yellow-600' :
                  currentTheme === 'pink' ? 'text-pink-600' :
                  currentTheme === 'indigo' ? 'text-indigo-600' :
                  currentTheme === 'teal' ? 'text-teal-600' :
                  currentTheme === 'cyan' ? 'text-cyan-600' :
                  currentTheme === 'emerald' ? 'text-emerald-600' :
                  currentTheme === 'lime' ? 'text-lime-600' :
                  currentTheme === 'amber' ? 'text-amber-600' :
                  currentTheme === 'rose' ? 'text-rose-600' :
                  'text-blue-500'
                }`} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;