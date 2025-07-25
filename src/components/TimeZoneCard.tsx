import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TimeZone, Theme } from '../types';

interface TimeZoneCardProps {
  timeZone: TimeZone;
  isBase: boolean;
  onSetBase: () => void;
  onRemove: () => void;
  theme: Theme;
  canRemove: boolean;
  onTimeSubmit: (timeString: string) => void;
}

const TimeZoneCard: React.FC<TimeZoneCardProps> = ({
  timeZone,
  isBase,
  onSetBase,
  onRemove,
  theme,
  canRemove,
  onTimeSubmit
}) => {
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [timeInput, setTimeInput] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    if (!isBase && !isEditingTime) {
      onSetBase();
    }
  };

  const handleTimeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingTime(true);
    setTimeInput('');
    setError('');
  };

  const handleTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!timeInput.trim()) {
      setError('Please enter a time');
      return;
    }

    // Basic validation for time format
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$|^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(timeInput.trim())) {
      setError('Invalid format');
      return;
    }

    onTimeSubmit(timeInput.trim());
    setIsEditingTime(false);
    setTimeInput('');
    setError('');
  };

  const handleTimeCancel = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setIsEditingTime(false);
    setTimeInput('');
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleTimeCancel(e);
    }
  };

  const getCardClasses = () => {
    let baseClasses = "relative rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer select-none min-w-48 group";
    
    if (isBase) {
      const themeClasses = {
        light: 'bg-white text-gray-900 border-2 border-blue-500 ring-2 ring-blue-200',
        dark: 'bg-gray-800 text-white border-2 border-blue-600 ring-2 ring-blue-400/30',
        oled: 'bg-black text-white border-2 border-gray-600 ring-2 ring-gray-400/30',
        blue: 'bg-blue-100 text-blue-900 border-2 border-blue-600 ring-2 ring-blue-300',
        green: 'bg-green-100 text-green-900 border-2 border-green-600 ring-2 ring-green-300',
        purple: 'bg-purple-100 text-purple-900 border-2 border-purple-600 ring-2 ring-purple-300',
        red: 'bg-red-100 text-red-900 border-2 border-red-600 ring-2 ring-red-300',
        orange: 'bg-orange-100 text-orange-900 border-2 border-orange-600 ring-2 ring-orange-300',
        yellow: 'bg-yellow-100 text-yellow-900 border-2 border-yellow-600 ring-2 ring-yellow-300',
        pink: 'bg-pink-100 text-pink-900 border-2 border-pink-600 ring-2 ring-pink-300',
        indigo: 'bg-indigo-100 text-indigo-900 border-2 border-indigo-600 ring-2 ring-indigo-300',
        teal: 'bg-teal-100 text-teal-900 border-2 border-teal-600 ring-2 ring-teal-300',
        cyan: 'bg-cyan-100 text-cyan-900 border-2 border-cyan-600 ring-2 ring-cyan-300',
        emerald: 'bg-emerald-100 text-emerald-900 border-2 border-emerald-600 ring-2 ring-emerald-300',
        lime: 'bg-lime-100 text-lime-900 border-2 border-lime-600 ring-2 ring-lime-300',
        amber: 'bg-amber-100 text-amber-900 border-2 border-amber-600 ring-2 ring-amber-300',
        rose: 'bg-rose-100 text-rose-900 border-2 border-rose-600 ring-2 ring-rose-300'
      };
      return `${baseClasses} ${themeClasses[theme]}`;
    }
    
    const themeClasses = {
      light: 'bg-white text-gray-900 border border-gray-200 hover:border-gray-300',
      dark: 'bg-gray-800 text-white border border-gray-700 hover:border-gray-600',
      oled: 'bg-black text-white border border-gray-800 hover:border-gray-700',
      blue: 'bg-blue-50 text-blue-900 border border-blue-200 hover:border-blue-300',
      green: 'bg-green-50 text-green-900 border border-green-200 hover:border-green-300',
      purple: 'bg-purple-50 text-purple-900 border border-purple-200 hover:border-purple-300',
      red: 'bg-red-50 text-red-900 border border-red-200 hover:border-red-300',
      orange: 'bg-orange-50 text-orange-900 border border-orange-200 hover:border-orange-300',
      yellow: 'bg-yellow-50 text-yellow-900 border border-yellow-200 hover:border-yellow-300',
      pink: 'bg-pink-50 text-pink-900 border border-pink-200 hover:border-pink-300',
      indigo: 'bg-indigo-50 text-indigo-900 border border-indigo-200 hover:border-indigo-300',
      teal: 'bg-teal-50 text-teal-900 border border-teal-200 hover:border-teal-300',
      cyan: 'bg-cyan-50 text-cyan-900 border border-cyan-200 hover:border-cyan-300',
      emerald: 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:border-emerald-300',
      lime: 'bg-lime-50 text-lime-900 border border-lime-200 hover:border-lime-300',
      amber: 'bg-amber-50 text-amber-900 border border-amber-200 hover:border-amber-300',
      rose: 'bg-rose-50 text-rose-900 border border-rose-200 hover:border-rose-300',
      cyberpunk: 'bg-gray-800 text-white border border-cyan-500 hover:border-cyan-400'
    };
    
    return `${baseClasses} ${themeClasses[theme]}`;
  };

  const formatOffset = (offset: number) => {
    if (offset === 0) return '+0';
    return offset > 0 ? `+${offset}` : `${offset}`;
  };

  return (
    <div 
      className={`${getCardClasses()} w-full max-w-xs lg:max-w-56`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${timeZone.abbreviation} time zone. Current time: ${timeZone.currentTime}. ${isBase ? 'Base zone' : 'Click to set as base zone'}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Remove Button */}
      {canRemove && (
        <div 
          className="absolute top-4 right-2 w-10 h-10 flex items-center justify-center"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={`text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-125 flex items-center justify-center p-2 ${
              'opacity-100'
            }`}
            aria-label={`Remove ${timeZone.abbreviation} time zone`}
          >
            <X size={12} />
          </button>
        </div>
      )}

      <div>
        {/* Top Row: Abbreviation + Offset (left) */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-base sm:text-lg font-bold ${
              theme === 'dark' ? 'text-gray-200' : 
              theme === 'oled' ? 'text-white' :
              'text-gray-700'
            }`}>
              {timeZone.abbreviation}
            </span>
            <span className={`text-xs sm:text-sm font-medium ${
              theme === 'dark' ? 'text-gray-400' : 
              theme === 'oled' ? 'text-gray-300' :
              'text-gray-500'
            }`}>
              {formatOffset(timeZone.offset)}
            </span>
          </div>
          {/* Invisible spacer to maintain symmetry */}
          <div className="w-8 h-1"></div>
        </div>

        {/* Current Time - Centered and Larger */}
        <div className="text-center mb-3">
          {isEditingTime ? (
            <form onSubmit={handleTimeSubmit} className="flex flex-col items-center gap-1">
              <input
                type="text"
                value={timeInput}
                onChange={(e) => {
                  setTimeInput(e.target.value);
                  setError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder="2:30 PM or 14:30"
                className={`text-2xl sm:text-3xl font-bold text-center bg-transparent border-b-2 outline-none w-32 sm:w-40 ${
                  theme === 'dark' 
                    ? 'text-white border-gray-600 placeholder-gray-500' :
                  theme === 'oled'
                    ? 'text-white border-gray-700 placeholder-gray-500' :
                  theme === 'blue'
                    ? 'text-blue-900 border-blue-400 placeholder-blue-500' :
                  theme === 'green'
                    ? 'text-green-900 border-green-400 placeholder-green-500' :
                  theme === 'purple'
                    ? 'text-purple-900 border-purple-400 placeholder-purple-500' :
                  theme === 'red'
                    ? 'text-red-900 border-red-400 placeholder-red-500' :
                  theme === 'orange'
                    ? 'text-orange-900 border-orange-400 placeholder-orange-500' :
                  theme === 'yellow'
                    ? 'text-yellow-900 border-yellow-400 placeholder-yellow-500' :
                  theme === 'pink'
                    ? 'text-pink-900 border-pink-400 placeholder-pink-500' :
                  theme === 'indigo'
                    ? 'text-indigo-900 border-indigo-400 placeholder-indigo-500' :
                  theme === 'teal'
                    ? 'text-teal-900 border-teal-400 placeholder-teal-500' :
                  theme === 'cyan'
                    ? 'text-cyan-900 border-cyan-400 placeholder-cyan-500' :
                  theme === 'emerald'
                    ? 'text-emerald-900 border-emerald-400 placeholder-emerald-500' :
                  theme === 'lime'
                    ? 'text-lime-900 border-lime-400 placeholder-lime-500' :
                  theme === 'amber'
                    ? 'text-amber-900 border-amber-400 placeholder-amber-500' :
                  theme === 'rose'
                    ? 'text-rose-900 border-rose-400 placeholder-rose-500' :
                    'text-gray-900 border-gray-400 placeholder-gray-500'
                }`}
                autoFocus
              />
              {error && (
                <div className="text-xs text-red-500 mt-1">{error}</div>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    theme === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                    theme === 'oled' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                    theme === 'green' ? 'bg-green-600 hover:bg-green-700 text-white' :
                    theme === 'purple' ? 'bg-purple-600 hover:bg-purple-700 text-white' :
                    theme === 'red' ? 'bg-red-600 hover:bg-red-700 text-white' :
                    theme === 'orange' ? 'bg-orange-600 hover:bg-orange-700 text-white' :
                    theme === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-700 text-white' :
                    theme === 'pink' ? 'bg-pink-600 hover:bg-pink-700 text-white' :
                    theme === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' :
                    theme === 'teal' ? 'bg-teal-600 hover:bg-teal-700 text-white' :
                    theme === 'cyan' ? 'bg-cyan-600 hover:bg-cyan-700 text-white' :
                    theme === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' :
                    theme === 'lime' ? 'bg-lime-600 hover:bg-lime-700 text-white' :
                    theme === 'amber' ? 'bg-amber-600 hover:bg-amber-700 text-white' :
                    theme === 'rose' ? 'bg-rose-600 hover:bg-rose-700 text-white' :
                    'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Set
                </button>
                <button
                  type="button"
                  onClick={handleTimeCancel}
                  className={`px-3 py-1 text-xs rounded border transition-colors ${
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
              </div>
            </form>
          ) : (
            <div 
              className={`text-3xl sm:text-4xl font-bold cursor-pointer transition-all duration-200 hover:scale-105 ${
                theme === 'dark' ? 'text-white hover:text-blue-400' :
                theme === 'oled' ? 'text-white hover:text-blue-400' :
                theme === 'blue' ? 'text-blue-900 hover:text-blue-600' :
                theme === 'green' ? 'text-green-900 hover:text-green-600' :
                theme === 'purple' ? 'text-purple-900 hover:text-purple-600' :
                theme === 'red' ? 'text-red-900 hover:text-red-600' :
                theme === 'orange' ? 'text-orange-900 hover:text-orange-600' :
                theme === 'yellow' ? 'text-yellow-900 hover:text-yellow-600' :
                theme === 'pink' ? 'text-pink-900 hover:text-pink-600' :
                theme === 'indigo' ? 'text-indigo-900 hover:text-indigo-600' :
                theme === 'teal' ? 'text-teal-900 hover:text-teal-600' :
                theme === 'cyan' ? 'text-cyan-900 hover:text-cyan-600' :
                theme === 'emerald' ? 'text-emerald-900 hover:text-emerald-600' :
                theme === 'lime' ? 'text-lime-900 hover:text-lime-600' :
                theme === 'amber' ? 'text-amber-900 hover:text-amber-600' :
                theme === 'rose' ? 'text-rose-900 hover:text-rose-600' :
                'text-gray-900 hover:text-blue-500'
              }`}
              onClick={handleTimeClick}
              title="Click to set custom time"
            >
              {timeZone.currentTime}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TimeZoneCard;