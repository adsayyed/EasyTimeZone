import React, { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import { Theme } from '../types';

interface TimeInputModalProps {
  onTimeSubmit: (timeString: string) => void;
  onClose: () => void;
  theme: Theme;
  targetZone?: string | null;
}

const TimeInputModal: React.FC<TimeInputModalProps> = ({
  onTimeSubmit,
  onClose,
  theme,
  targetZone
}) => {
  const [timeInput, setTimeInput] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!timeInput.trim()) {
      setError('Please enter a time');
      return;
    }

    // Basic validation for time format
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$|^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(timeInput.trim())) {
      setError('Please enter a valid time (e.g., "2:30 PM" or "14:30")');
      return;
    }

    onTimeSubmit(timeInput.trim());
  };

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
      <div className={`${themeClasses[theme]} rounded-lg shadow-xl max-w-md w-full`}>
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
          <div className="flex items-center gap-2">
            <Clock size={20} className={`${
              theme === 'blue' ? 'text-blue-600' :
              theme === 'oled' ? 'text-blue-400' :
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
              ''
            }`} />
            <h2 className="text-lg font-semibold">
              Set Custom Time{targetZone ? ` for ${targetZone.split('/').pop()?.replace(/_/g, ' ')}` : ''}
            </h2>
          </div>
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
            aria-label="Close time input modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="time-input" className="block text-sm font-medium mb-2">
              Enter time (12-hour or 24-hour format){targetZone ? ` for ${targetZone.split('/').pop()?.replace(/_/g, ' ')}` : ''}
            </label>
            <input
              id="time-input"
              type="text"
              value={timeInput}
              onChange={(e) => {
                setTimeInput(e.target.value);
                setError('');
              }}
              placeholder="e.g., 2:30 PM or 14:30"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' :
                theme === 'oled'
                  ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-400 focus:ring-blue-500' :
                theme === 'blue'
                  ? 'bg-blue-100 border-blue-300 text-blue-900 placeholder-blue-500 focus:ring-blue-500' :
                theme === 'green'
                  ? 'bg-green-100 border-green-300 text-green-900 placeholder-green-500 focus:ring-green-500' :
                theme === 'purple'
                  ? 'bg-purple-100 border-purple-300 text-purple-900 placeholder-purple-500 focus:ring-purple-500' :
                theme === 'red'
                  ? 'bg-red-100 border-red-300 text-red-900 placeholder-red-500 focus:ring-red-500' :
                theme === 'orange'
                  ? 'bg-orange-100 border-orange-300 text-orange-900 placeholder-orange-500 focus:ring-orange-500' :
                theme === 'yellow'
                  ? 'bg-yellow-100 border-yellow-300 text-yellow-900 placeholder-yellow-500 focus:ring-yellow-500' :
                theme === 'pink'
                  ? 'bg-pink-100 border-pink-300 text-pink-900 placeholder-pink-500 focus:ring-pink-500' :
                theme === 'indigo'
                  ? 'bg-indigo-100 border-indigo-300 text-indigo-900 placeholder-indigo-500 focus:ring-indigo-500' :
                theme === 'teal'
                  ? 'bg-teal-100 border-teal-300 text-teal-900 placeholder-teal-500 focus:ring-teal-500' :
                theme === 'cyan'
                  ? 'bg-cyan-100 border-cyan-300 text-cyan-900 placeholder-cyan-500 focus:ring-cyan-500' :
                theme === 'emerald'
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900 placeholder-emerald-500 focus:ring-emerald-500' :
                theme === 'lime'
                  ? 'bg-lime-100 border-lime-300 text-lime-900 placeholder-lime-500 focus:ring-lime-500' :
                theme === 'amber'
                  ? 'bg-amber-100 border-amber-300 text-amber-900 placeholder-amber-500 focus:ring-amber-500' :
                theme === 'rose'
                  ? 'bg-rose-100 border-rose-300 text-rose-900 placeholder-rose-500 focus:ring-rose-500' :
                  'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
              }`}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <div className={`text-xs mb-4 ${
            theme === 'dark' ? 'text-gray-400' :
            theme === 'oled' ? 'text-gray-400' :
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
            'text-gray-500'
          }`}>
            <p>Examples:</p>
            <ul className="list-disc list-inside ml-2 mt-1">
              <li>12-hour: "2:30 PM", "11:45 AM"</li>
              <li>24-hour: "14:30", "23:45"</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg border transition-colors hover:scale-105 ${
                theme === 'dark' 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' :
                theme === 'oled'
                  ? 'border-gray-800 text-gray-300 hover:bg-gray-900' :
                theme === 'blue'
                  ? 'border-blue-300 text-blue-700 hover:bg-blue-100' :
                theme === 'green'
                  ? 'border-green-300 text-green-700 hover:bg-green-100' :
                theme === 'purple'
                  ? 'border-purple-300 text-purple-700 hover:bg-purple-100' :
                theme === 'red'
                  ? 'border-red-300 text-red-700 hover:bg-red-100' :
                theme === 'orange'
                  ? 'border-orange-300 text-orange-700 hover:bg-orange-100' :
                theme === 'yellow'
                  ? 'border-yellow-300 text-yellow-700 hover:bg-yellow-100' :
                theme === 'pink'
                  ? 'border-pink-300 text-pink-700 hover:bg-pink-100' :
                theme === 'indigo'
                  ? 'border-indigo-300 text-indigo-700 hover:bg-indigo-100' :
                theme === 'teal'
                  ? 'border-teal-300 text-teal-700 hover:bg-teal-100' :
                theme === 'cyan'
                  ? 'border-cyan-300 text-cyan-700 hover:bg-cyan-100' :
                theme === 'emerald'
                  ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-100' :
                theme === 'lime'
                  ? 'border-lime-300 text-lime-700 hover:bg-lime-100' :
                theme === 'amber'
                  ? 'border-amber-300 text-amber-700 hover:bg-amber-100' :
                theme === 'rose'
                  ? 'border-rose-300 text-rose-700 hover:bg-rose-100' :
                  'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors hover:scale-105 ${
                theme === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                theme === 'oled' ? 'bg-blue-600 hover:bg-blue-700' :
                theme === 'green' ? 'bg-green-600 hover:bg-green-700' :
                theme === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                theme === 'red' ? 'bg-red-600 hover:bg-red-700' :
                theme === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                theme === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-700' :
                theme === 'pink' ? 'bg-pink-600 hover:bg-pink-700' :
                theme === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-700' :
                theme === 'teal' ? 'bg-teal-600 hover:bg-teal-700' :
                theme === 'cyan' ? 'bg-cyan-600 hover:bg-cyan-700' :
                theme === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                theme === 'lime' ? 'bg-lime-600 hover:bg-lime-700' :
                theme === 'amber' ? 'bg-amber-600 hover:bg-amber-700' :
                theme === 'rose' ? 'bg-rose-600 hover:bg-rose-700' :
                'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Set Time
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeInputModal;