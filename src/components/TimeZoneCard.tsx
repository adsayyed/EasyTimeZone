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
  onTimeClick: () => void;
}

const TimeZoneCard: React.FC<TimeZoneCardProps> = ({
  timeZone,
  isBase,
  onSetBase,
  onRemove,
  theme,
  canRemove,
  onTimeClick
}) => {
  const [showRemove, setShowRemove] = useState(false);

  const handleClick = () => {
    if (!isBase) {
      onSetBase();
    }
  };

  const handleTimeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTimeClick();
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
          onMouseEnter={() => setShowRemove(true)}
          onMouseLeave={() => setShowRemove(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={`text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-125 flex items-center justify-center p-2 ${
              showRemove ? 'opacity-100' : 'opacity-0'
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
              theme === 'indigo' ? 'text-indigo-900\ hover:text-indigo-600' :
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
        </div>

      </div>
    </div>
  );
};

export default TimeZoneCard;