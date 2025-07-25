import React, { useEffect } from 'react';
import { X, Clock, Plus, Palette, Type, RotateCcw, ArrowUpDown, HelpCircle, Clock12 } from 'lucide-react';
import { Theme } from '../types';

interface HelpModalProps {
  onClose: () => void;
  theme: Theme;
}

const HelpModal: React.FC<HelpModalProps> = ({ onClose, theme }) => {
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const themeClasses = {
    light: 'bg-white text-gray-900 border border-gray-200',
    dark: 'bg-gray-800 text-white border border-gray-700',
    oled: 'bg-black text-white border border-gray-800',
    blue: 'bg-blue-50 text-blue-900 border border-blue-200',
    green: 'bg-green-50 text-green-900 border border-green-200',
    purple: 'bg-purple-50 text-purple-900 border border-purple-200',
    red: 'bg-red-50 text-red-900 border border-red-200',
    orange: 'bg-orange-50 text-orange-900 border border-orange-200',
    yellow: 'bg-yellow-50 text-yellow-900 border border-yellow-200',
    pink: 'bg-pink-50 text-pink-900 border border-pink-200',
    indigo: 'bg-indigo-50 text-indigo-900 border border-indigo-200',
    teal: 'bg-teal-50 text-teal-900 border border-teal-200',
    cyan: 'bg-cyan-50 text-cyan-900 border border-cyan-200',
    emerald: 'bg-emerald-50 text-emerald-900 border border-emerald-200',
    lime: 'bg-lime-50 text-lime-900 border border-lime-200',
    amber: 'bg-amber-50 text-amber-900 border border-amber-200',
    rose: 'bg-rose-50 text-rose-900 border border-rose-200'
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className={`${themeClasses[theme]} rounded-lg shadow-xl max-w-lg w-full max-h-96 flex flex-col`}>
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
          <h2 className="text-lg font-semibold">How to Use Easy Time Zone</h2>
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
            aria-label="Close help modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
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
                theme === 'oled' ? 'text-blue-400' :
                'text-blue-500'
              }`} />
              <div>
                <h3 className="font-semibold mb-1">Time Zone Cards</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' :
                  theme === 'oled' ? 'text-gray-400' :
                  'text-gray-600'
                }`}>
                  Click any card to make it your base zone. Base zones show with a blue border.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Plus className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
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
                theme === 'oled' ? 'text-blue-400' :
                'text-blue-500'
              }`} />
              <div>
                <h3 className="font-semibold mb-1">Add Time Zones</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' :
                  theme === 'oled' ? 'text-gray-400' :
                  'text-gray-600'
                }`}>
                  Click + to add zones. Search by abbreviation (EST, PST, CST).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <X className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
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
                theme === 'oled' ? 'text-blue-400' :
                'text-blue-500'
              }`} />
              <div>
                <h3 className="font-semibold mb-1">Remove Time Zones</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' :
                  theme === 'oled' ? 'text-gray-400' :
                  'text-gray-600'
                }`}>
                  Hover over the top-right corner of any card to see the × button.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
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
                theme === 'oled' ? 'text-blue-400' :
                'text-blue-500'
              }`} />
              <div>
                <h3 className="font-semibold mb-1">Set Custom Time</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' :
                  theme === 'oled' ? 'text-gray-400' :
                  'text-gray-600'
                }`}>
                  Click "Set Time" or click any time display to enter a custom time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock12 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
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
                theme === 'oled' ? 'text-blue-400' :
                'text-blue-500'
              }`} />
              <div>
                <h3 className="font-semibold mb-1">Time Format Toggle</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' :
                  theme === 'oled' ? 'text-gray-400' :
                  'text-gray-600'
                }`}>
                  Click the clock icon in the bottom toolbar to switch between 12-hour (2:30 PM) and 24-hour (14:30) time formats.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ArrowUpDown className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
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
                theme === 'oled' ? 'text-blue-400' :
                'text-blue-500'
              }`} />
              <div>
                <h3 className="font-semibold mb-1">Sort Time Zones</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' :
                  theme === 'oled' ? 'text-gray-400' :
                  'text-gray-600'
                }`}>
                  Click the sort icon in the bottom toolbar to arrange zones by time (earliest to latest).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Palette className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
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
                theme === 'oled' ? 'text-blue-400' :
                'text-blue-500'
              }`} />
              <div>
                <h3 className="font-semibold mb-1">Change Theme</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' :
                  theme === 'oled' ? 'text-gray-400' :
                  'text-gray-600'
                }`}>
                  Click the palette icon in the bottom toolbar to choose from 17 different color themes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Type className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
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
                theme === 'oled' ? 'text-blue-400' :
                'text-blue-500'
              }`} />
              <div>
                <h3 className="font-semibold mb-1">Change Font</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' :
                  theme === 'oled' ? 'text-gray-400' :
                  'text-gray-600'
                }`}>
                  Click the font icon in the bottom toolbar to select from various font families.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RotateCcw className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
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
                theme === 'oled' ? 'text-blue-400' :
                'text-blue-500'
              }`} />
              <div>
                <h3 className="font-semibold mb-1">Reset to Defaults</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' :
                  theme === 'oled' ? 'text-gray-400' :
                  'text-gray-600'
                }`}>
                  Click the reset icon in the bottom toolbar to restore all settings to their defaults.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;