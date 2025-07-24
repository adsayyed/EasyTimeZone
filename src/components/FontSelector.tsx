import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { FontSettings, Theme } from '../types';

interface FontSelectorProps {
  currentSettings: FontSettings;
  onSettingsChange: (settings: FontSettings) => void;
  onClose: () => void;
  theme: Theme;
}

const FontSelector: React.FC<FontSelectorProps> = ({
  currentSettings,
  onSettingsChange,
  onClose,
  theme
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

  const fontFamilies = [
    { id: 'inter' as const, name: 'Inter', example: 'font-sans', style: { fontFamily: 'Inter, sans-serif' } },
    { id: 'lato' as const, name: 'Lato', example: 'font-sans', style: { fontFamily: 'Lato, sans-serif' } },
    { id: 'merriweather' as const, name: 'Merriweather', example: 'font-serif', style: { fontFamily: 'Merriweather, serif' } },
    { id: 'mono' as const, name: 'Monospace', example: 'font-mono', style: { fontFamily: 'monospace' } },
    { id: 'montserrat' as const, name: 'Montserrat', example: 'font-sans', style: { fontFamily: 'Montserrat, sans-serif' } },
    { id: 'nunito' as const, name: 'Nunito', example: 'font-sans', style: { fontFamily: 'Nunito, sans-serif' } },
    { id: 'opensans' as const, name: 'Open Sans', example: 'font-sans', style: { fontFamily: 'Open Sans, sans-serif' } },
    { id: 'playfair' as const, name: 'Playfair Display', example: 'font-serif', style: { fontFamily: 'Playfair Display, serif' } },
    { id: 'poppins' as const, name: 'Poppins', example: 'font-sans', style: { fontFamily: 'Poppins, sans-serif' } },
    { id: 'raleway' as const, name: 'Raleway', example: 'font-sans', style: { fontFamily: 'Raleway, sans-serif' } },
    { id: 'roboto' as const, name: 'Roboto', example: 'font-sans', style: { fontFamily: 'Roboto, sans-serif' } },
    { id: 'sans' as const, name: 'Sans Serif', example: 'font-sans', style: { fontFamily: 'system-ui, sans-serif' } },
    { id: 'serif' as const, name: 'Serif', example: 'font-serif', style: { fontFamily: 'serif' } },
    { id: 'sourcesans' as const, name: 'Source Sans Pro', example: 'font-sans', style: { fontFamily: 'Source Sans Pro, sans-serif' } },
    { id: 'ubuntu' as const, name: 'Ubuntu', example: 'font-sans', style: { fontFamily: 'Ubuntu, sans-serif' } }
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const updateFamily = (family: FontSettings['family']) => {
    onSettingsChange({ family });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className={`rounded-lg shadow-xl max-w-sm w-full max-h-96 flex flex-col ${
        theme === 'dark' ? 'bg-gray-800 text-white border border-gray-700' :
        theme === 'oled' ? 'bg-black text-white border border-gray-800' :
        theme === 'blue' ? 'bg-blue-50 text-blue-900 border border-blue-200' :
        theme === 'green' ? 'bg-green-50 text-green-900 border border-green-200' :
        theme === 'purple' ? 'bg-purple-50 text-purple-900 border border-purple-200' :
        theme === 'red' ? 'bg-red-50 text-red-900 border border-red-200' :
        theme === 'orange' ? 'bg-orange-50 text-orange-900 border border-orange-200' :
        theme === 'yellow' ? 'bg-yellow-50 text-yellow-900 border border-yellow-200' :
        theme === 'pink' ? 'bg-pink-50 text-pink-900 border border-pink-200' :
        theme === 'indigo' ? 'bg-indigo-50 text-indigo-900 border border-indigo-200' :
        theme === 'teal' ? 'bg-teal-50 text-teal-900 border border-teal-200' :
        theme === 'cyan' ? 'bg-cyan-50 text-cyan-900 border border-cyan-200' :
        theme === 'emerald' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' :
        theme === 'lime' ? 'bg-lime-50 text-lime-900 border border-lime-200' :
        theme === 'amber' ? 'bg-amber-50 text-amber-900 border border-amber-200' :
        theme === 'rose' ? 'bg-rose-50 text-rose-900 border border-rose-200' :
        'bg-white text-gray-900 border border-gray-200'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${
          theme === 'dark' ? 'border-gray-700' :
          theme === 'oled' ? 'border-gray-800' :
          theme === 'blue' ? 'border-blue-200' :
          theme === 'green' ? 'border-green-200' :
          theme === 'purple' ? 'border-purple-200' :
          theme === 'red' ? 'border-red-200' :
          theme === 'orange' ? 'border-orange-200' :
          theme === 'yellow' ? 'border-yellow-200' :
          theme === 'pink' ? 'border-pink-200' :
          theme === 'indigo' ? 'border-indigo-200' :
          theme === 'teal' ? 'border-teal-200' :
          theme === 'cyan' ? 'border-cyan-200' :
          theme === 'emerald' ? 'border-emerald-200' :
          theme === 'lime' ? 'border-lime-200' :
          theme === 'amber' ? 'border-amber-200' :
          theme === 'rose' ? 'border-rose-200' :
          'border-gray-200'
        }`}>
          <h2 className="text-lg font-semibold">Font Settings</h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-700' :
              theme === 'oled' ? 'hover:bg-gray-900' :
              theme === 'blue' ? 'hover:bg-blue-100' :
              theme === 'green' ? 'hover:bg-green-100' :
              theme === 'purple' ? 'hover:bg-purple-100' :
              theme === 'red' ? 'hover:bg-red-100' :
              theme === 'orange' ? 'hover:bg-orange-100' :
              theme === 'yellow' ? 'hover:bg-yellow-100' :
              theme === 'pink' ? 'hover:bg-pink-100' :
              theme === 'indigo' ? 'hover:bg-indigo-100' :
              theme === 'teal' ? 'hover:bg-teal-100' :
              theme === 'cyan' ? 'hover:bg-cyan-100' :
              theme === 'emerald' ? 'hover:bg-emerald-100' :
              theme === 'lime' ? 'hover:bg-lime-100' :
              theme === 'amber' ? 'hover:bg-amber-100' :
              theme === 'rose' ? 'hover:bg-rose-100' :
              'hover:bg-gray-100'
            }`}
            aria-label="Close font selector"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Font Family */}
          <div>
            <h3 className="font-medium mb-3">Font</h3>
            <div className="space-y-2">
              {fontFamilies.map((family) => (
                <button
                  key={family.id}
                  onClick={() => updateFamily(family.id)}
                  className={`w-full flex items-center justify-between p-3 border rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'border-gray-600 hover:bg-gray-700' :
                    theme === 'oled'
                      ? 'border-gray-800 hover:bg-gray-900' :
                    theme === 'blue'
                      ? 'border-blue-200 hover:bg-blue-100' :
                    theme === 'green'
                      ? 'border-green-200 hover:bg-green-100' :
                    theme === 'purple'
                      ? 'border-purple-200 hover:bg-purple-100' :
                    theme === 'red'
                      ? 'border-red-200 hover:bg-red-100' :
                    theme === 'orange'
                      ? 'border-orange-200 hover:bg-orange-100' :
                    theme === 'yellow'
                      ? 'border-yellow-200 hover:bg-yellow-100' :
                    theme === 'pink'
                      ? 'border-pink-200 hover:bg-pink-100' :
                    theme === 'indigo'
                      ? 'border-indigo-200 hover:bg-indigo-100' :
                    theme === 'teal'
                      ? 'border-teal-200 hover:bg-teal-100' :
                    theme === 'cyan'
                      ? 'border-cyan-200 hover:bg-cyan-100' :
                    theme === 'emerald'
                      ? 'border-emerald-200 hover:bg-emerald-100' :
                    theme === 'lime'
                      ? 'border-lime-200 hover:bg-lime-100' :
                    theme === 'amber'
                      ? 'border-amber-200 hover:bg-amber-100' :
                    theme === 'rose'
                      ? 'border-rose-200 hover:bg-rose-100' :
                      'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{family.name}</span>
                    {currentSettings.family === family.id && (
                      <Check size={18} className={`${
                        theme === 'oled' ? 'text-blue-400' :
                        theme === 'blue' ? 'text-blue-600' :
                        theme === 'green' ? 'text-green-600' :
                        theme === 'purple' ? 'text-purple-600' :
                        theme === 'red' ? 'text-red-600' :
                        theme === 'orange' ? 'text-orange-600' :
                        theme === 'yellow' ? 'text-yellow-600' :
                        theme === 'pink' ? 'text-pink-600' :
                        theme === 'indigo' ? 'text-indigo-600' :
                        theme === 'teal' ? 'text-teal-600' :
                        theme === 'cyan' ? 'text-cyan-600' :
                        theme === 'emerald' ? 'text-emerald-600' :
                        theme === 'lime' ? 'text-lime-600' :
                        theme === 'amber' ? 'text-amber-600' :
                        theme === 'rose' ? 'text-rose-600' :
                        'text-blue-500'
                      }`} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontSelector;