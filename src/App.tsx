import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Plus, Palette, Type, RotateCcw, Edit3, ArrowUpDown, HelpCircle } from 'lucide-react';
import TimeZoneCard from './components/TimeZoneCard';
import AddZoneModal from './components/AddZoneModal';
import ThemeSelector from './components/ThemeSelector';
import FontSelector from './components/FontSelector';
import TimeInputModal from './components/TimeInputModal';
import HelpModal from './components/HelpModal';
import { TimeZone, Theme, FontSettings } from './types';
import { getTimeInZone, calculateOffset, getAvailableTimeZones, parseTimeInput } from './utils/timeUtils';
import { loadPreferences, savePreferences, getDefaultTimeZones } from './utils/storage';

function App() {
  const [timeZones, setTimeZones] = useState<TimeZone[]>([]);
  const [baseZoneId, setBaseZoneId] = useState<string>('America/Chicago');
  const [liveTime, setLiveTime] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showThemeSelector, setShowThemeSelector] = useState<boolean>(false);
  const [showFontSelector, setShowFontSelector] = useState<boolean>(false);
  const [showTimeInput, setShowTimeInput] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [manualTime, setManualTime] = useState<Date | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [fontSettings, setFontSettings] = useState<FontSettings>({ size: 'medium', family: 'sans' });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [is24Hour, setIs24Hour] = useState<boolean>(false);

  // Load preferences on mount
  useEffect(() => {
    const preferences = loadPreferences();
    if (preferences) {
      setTimeZones(preferences.timeZones || getDefaultTimeZones());
      setBaseZoneId(preferences.baseZoneId || 'America/Chicago');
      setTheme(preferences.theme || 'light');
      setFontSettings(preferences.fontSettings || { family: 'sans' });
      setIs24Hour(preferences.is24Hour || false);
    } else {
      setTimeZones(getDefaultTimeZones());
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    savePreferences({
      timeZones,
      baseZoneId,
      theme,
      fontSettings,
      is24Hour
    });

  // Live time updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (liveTime) {
      interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [liveTime]);

  // Update time zones with current time and offsets
  const updateTimeZones = useCallback(() => {
    const timeToUse = manualTime || currentTime;
    setTimeZones(zones => 
      zones.map(zone => ({
        ...zone,
        currentTime: getTimeInZone(timeToUse, zone.id, is24Hour),
        offset: calculateOffset(zone.id, baseZoneId, timeToUse)
      }))
    );

  useEffect(() => {
    updateTimeZones();
  }, [updateTimeZones]);

  const handleAddTimeZone = async (zoneId: string) => {
    const availableZones = await getAvailableTimeZones();
    const zoneInfo = availableZones.find(z => z.id === zoneId);
    
    if (zoneInfo && !timeZones.find(z => z.id === zoneId)) {
      const timeToUse = manualTime || currentTime;
      const newZone: TimeZone = {
        id: zoneId,
        name: zoneInfo.name,
        abbreviation: zoneInfo.abbreviation,
        currentTime: getTimeInZone(timeToUse, zoneId, is24Hour),
        offset: calculateOffset(zoneId, baseZoneId, timeToUse)
      };
      setTimeZones([...timeZones, newZone]);
    }
    setShowAddModal(false);
  };

  const handleRemoveTimeZone = (zoneId: string) => {
    if (timeZones.length > 1) {
      const newZones = timeZones.filter(z => z.id !== zoneId);
      setTimeZones(newZones);
      
      // If removing base zone, set first remaining zone as base
      if (zoneId === baseZoneId && newZones.length > 0) {
        setBaseZoneId(newZones[0].id);
      }
    }
  };

  const handleSetBaseZone = (zoneId: string) => {
    setBaseZoneId(zoneId);
  };

  const handleTimeInput = (timeString: string) => {
    const parsedTime = parseTimeInput(timeString, baseZoneId);
    if (parsedTime) {
      setManualTime(parsedTime);
      setLiveTime(false); // Disable live time when manual time is set
    }
    setShowTimeInput(false);
  };

  const handleTimeZoneTimeClick = () => {
    setShowTimeInput(true);
  };

  const handleClearManualTime = () => {
    setManualTime(null);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    
    const sortedZones = [...timeZones].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.offset - b.offset; // Negative offsets first (earlier times)
      } else {
        return b.offset - a.offset; // Positive offsets first (later times)
      }
    });
    
    setTimeZones(sortedZones);
  };

  const handleReset = () => {
    setTimeZones(getDefaultTimeZones());
    setBaseZoneId('America/Chicago');
    setTheme('light');
    setFontSettings({ family: 'sans' });
    setLiveTime(false);
    setManualTime(null);
    setSortOrder('asc');
    setIs24Hour(false);
  };

  const themeClasses = {
    light: 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 min-h-screen',
    dark: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen',
    oled: 'bg-black text-white min-h-screen',
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 min-h-screen',
    green: 'bg-gradient-to-br from-green-50 to-green-100 text-green-900 min-h-screen',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-900 min-h-screen',
    red: 'bg-gradient-to-br from-red-50 to-red-100 text-red-900 min-h-screen',
    orange: 'bg-gradient-to-br from-orange-50 to-orange-100 text-orange-900 min-h-screen',
    yellow: 'bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-900 min-h-screen',
    pink: 'bg-gradient-to-br from-pink-50 to-pink-100 text-pink-900 min-h-screen',
    indigo: 'bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-900 min-h-screen',
    teal: 'bg-gradient-to-br from-teal-50 to-teal-100 text-teal-900 min-h-screen',
    cyan: 'bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-900 min-h-screen',
    emerald: 'bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-900 min-h-screen',
    lime: 'bg-gradient-to-br from-lime-50 to-lime-100 text-lime-900 min-h-screen',
    amber: 'bg-gradient-to-br from-amber-50 to-amber-100 text-amber-900 min-h-screen',
    rose: 'bg-gradient-to-br from-rose-50 to-rose-100 text-rose-900 min-h-screen'
  };

  return (
    <div className={`${themeClasses[theme]} ${getFontClass(fontSettings.family)} flex items-center justify-center`} style={getFontStyle(fontSettings.family)}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Easy Time Zone</h1>
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg text-white ${
                theme === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
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
                theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                theme === 'oled' ? 'bg-gray-600 hover:bg-gray-700 text-white' :
                'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              aria-label="Add new time zone"
            >
              Add Zone
            </button>
            
            <button
              onClick={manualTime ? () => {
                handleClearManualTime();
                setLiveTime(true);
              } : () => setShowTimeInput(true)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg text-white ${
                manualTime
                  ? (theme === 'light' ? 'bg-orange-500 hover:bg-orange-600' :
                     theme === 'dark' ? 'bg-orange-600 hover:bg-orange-700' :
                     theme === 'oled' ? 'bg-orange-600 hover:bg-orange-700' :
                     theme === 'blue' ? 'bg-orange-500 hover:bg-orange-600' :
                     theme === 'green' ? 'bg-red-500 hover:bg-red-600' :
                     theme === 'purple' ? 'bg-orange-500 hover:bg-orange-600' :
                     theme === 'red' ? 'bg-blue-600 hover:bg-blue-700' :
                     theme === 'orange' ? 'bg-blue-600 hover:bg-blue-700' :
                     theme === 'yellow' ? 'bg-purple-600 hover:bg-purple-700' :
                     theme === 'pink' ? 'bg-teal-600 hover:bg-teal-700' :
                     theme === 'indigo' ? 'bg-orange-500 hover:bg-orange-600' :
                     theme === 'teal' ? 'bg-pink-600 hover:bg-pink-700' :
                     theme === 'cyan' ? 'bg-orange-500 hover:bg-orange-600' :
                     theme === 'emerald' ? 'bg-red-500 hover:bg-red-600' :
                     theme === 'lime' ? 'bg-purple-600 hover:bg-purple-700' :
                     theme === 'amber' ? 'bg-blue-600 hover:bg-blue-700' :
                     theme === 'rose' ? 'bg-teal-600 hover:bg-teal-700' :
                     'bg-orange-500 hover:bg-orange-600')
                  : theme === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
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
                    theme === 'cyberpunk' ? 'bg-cyan-600 hover:bg-cyan-700 text-black' :
                    theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700 text-white' :
                    theme === 'oled' ? 'bg-gray-600 hover:bg-gray-700 text-white' :
                    'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              aria-label={manualTime ? "Return to live time" : "Set custom time"}
            >
              {manualTime ? 'Live Time' : 'Set Time'}
            </button>
            
            <button
              onClick={handleSort}
              className={`px-3 py-2 md:px-4 md:py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg text-white ${
                theme === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
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
                theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                theme === 'oled' ? 'bg-gray-600 hover:bg-gray-700 text-white' :
                'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              aria-label={`Sort time zones ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
              title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              <ArrowUpDown size={16} className="md:w-5 md:h-5" />
            </button>
          </div>
        </header>

        {/* Time Zone Cards */}
        <main className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto">
            {timeZones.map((zone, index) => (
              <TimeZoneCard
                key={zone.id}
                timeZone={zone}
                isBase={zone.id === baseZoneId}
                onSetBase={() => handleSetBaseZone(zone.id)}
                onRemove={() => handleRemoveTimeZone(zone.id)}
                theme={theme}
                canRemove={timeZones.length > 1}
                onTimeClick={handleTimeZoneTimeClick}
              />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 md:left-auto md:right-4 md:transform-none backdrop-blur-sm rounded-lg p-4 shadow-lg border ${
          theme === 'dark' 
            ? 'bg-gray-800/90 border-gray-700' 
            : theme === 'oled'
            ? 'bg-black/90 border-gray-800'
            : theme === 'blue'
            ? 'bg-blue-100/90 border-blue-200'
            : theme === 'green'
            ? 'bg-green-100/90 border-green-200'
            : theme === 'purple'
            ? 'bg-purple-100/90 border-purple-200'
            : theme === 'red'
            ? 'bg-red-100/90 border-red-200'
            : theme === 'orange'
            ? 'bg-orange-100/90 border-orange-200'
            : theme === 'yellow'
            ? 'bg-yellow-100/90 border-yellow-200'
            : theme === 'pink'
            ? 'bg-pink-100/90 border-pink-200'
            : theme === 'indigo'
            ? 'bg-indigo-100/90 border-indigo-200'
            : theme === 'teal'
            ? 'bg-teal-100/90 border-teal-200'
            : theme === 'cyan'
            ? 'bg-cyan-100/90 border-cyan-200'
            : theme === 'emerald'
            ? 'bg-emerald-100/90 border-emerald-200'
            : theme === 'lime'
            ? 'bg-lime-100/90 border-lime-200'
            : theme === 'amber'
            ? 'bg-amber-100/90 border-amber-200'
            : theme === 'rose'
            ? 'bg-rose-100/90 border-rose-200'
            : 'bg-white/90 border-gray-200'
        }`}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIs24Hour(!is24Hour)}
                className={`px-2 py-1 text-xs font-mono rounded transition-colors hover:scale-110 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700' 
                    : theme === 'oled'
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-900'
                    : theme === 'blue'
                    ? 'text-blue-600 hover:text-blue-800 hover:bg-blue-200'
                    : theme === 'green'
                    ? 'text-green-600 hover:text-green-800 hover:bg-green-200'
                    : theme === 'purple'
                    ? 'text-purple-600 hover:text-purple-800 hover:bg-purple-200'
                    : theme === 'red'
                    ? 'text-red-600 hover:text-red-800 hover:bg-red-200'
                    : theme === 'orange'
                    ? 'text-orange-600 hover:text-orange-800 hover:bg-orange-200'
                    : theme === 'yellow'
                    ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-200'
                    : theme === 'pink'
                    ? 'text-pink-600 hover:text-pink-800 hover:bg-pink-200'
                    : theme === 'indigo'
                    ? 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-200'
                    : theme === 'teal'
                    ? 'text-teal-600 hover:text-teal-800 hover:bg-teal-200'
                    : theme === 'cyan'
                    ? 'text-cyan-600 hover:text-cyan-800 hover:bg-cyan-200'
                    : theme === 'emerald'
                    ? 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-200'
                    : theme === 'lime'
                    ? 'text-lime-600 hover:text-lime-800 hover:bg-lime-200'
                    : theme === 'amber'
                    ? 'text-amber-600 hover:text-amber-800 hover:bg-amber-200'
                    : theme === 'rose'
                    ? 'text-rose-600 hover:text-rose-800 hover:bg-rose-200'
                    : theme === 'cyberpunk'
                    ? 'text-cyan-400 hover:text-cyan-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                aria-label={`Switch to ${is24Hour ? '12' : '24'} hour format`}
                title={`Switch to ${is24Hour ? '12' : '24'} hour format`}
              >
                {is24Hour ? '12H' : '24H'}
              </button>
              
              <button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className={`p-2 md:p-3 rounded-lg transition-colors hover:scale-110 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700' 
                    : theme === 'oled'
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-900'
                    : theme === 'blue'
                    ? 'text-blue-600 hover:text-blue-800 hover:bg-blue-200'
                    : theme === 'green'
                    ? 'text-green-600 hover:text-green-800 hover:bg-green-200'
                    : theme === 'purple'
                    ? 'text-purple-600 hover:text-purple-800 hover:bg-purple-200'
                    : theme === 'red'
                    ? 'text-red-600 hover:text-red-800 hover:bg-red-200'
                    : theme === 'orange'
                    ? 'text-orange-600 hover:text-orange-800 hover:bg-orange-200'
                    : theme === 'yellow'
                    ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-200'
                    : theme === 'pink'
                    ? 'text-pink-600 hover:text-pink-800 hover:bg-pink-200'
                    : theme === 'indigo'
                    ? 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-200'
                    : theme === 'teal'
                    ? 'text-teal-600 hover:text-teal-800 hover:bg-teal-200'
                    : theme === 'cyan'
                    ? 'text-cyan-600 hover:text-cyan-800 hover:bg-cyan-200'
                    : theme === 'emerald'
                    ? 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-200'
                    : theme === 'lime'
                    ? 'text-lime-600 hover:text-lime-800 hover:bg-lime-200'
                    : theme === 'amber'
                    ? 'text-amber-600 hover:text-amber-800 hover:bg-amber-200'
                    : theme === 'rose'
                    ? 'text-rose-600 hover:text-rose-800 hover:bg-rose-200'
                    : theme === 'cyberpunk'
                    ? 'text-cyan-400 hover:text-cyan-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                aria-label="Change theme"
              >
                <Palette size={16} className="md:w-5 md:h-5" />
              </button>
              
              <button
                onClick={() => setShowFontSelector(!showFontSelector)}
                className={`p-2 md:p-3 rounded-lg transition-colors hover:scale-110 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700' 
                    : theme === 'oled'
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-900'
                    : theme === 'blue'
                    ? 'text-blue-600 hover:text-blue-800 hover:bg-blue-200'
                    : theme === 'green'
                    ? 'text-green-600 hover:text-green-800 hover:bg-green-200'
                    : theme === 'purple'
                    ? 'text-purple-600 hover:text-purple-800 hover:bg-purple-200'
                    : theme === 'red'
                    ? 'text-red-600 hover:text-red-800 hover:bg-red-200'
                    : theme === 'orange'
                    ? 'text-orange-600 hover:text-orange-800 hover:bg-orange-200'
                    : theme === 'yellow'
                    ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-200'
                    : theme === 'pink'
                    ? 'text-pink-600 hover:text-pink-800 hover:bg-pink-200'
                    : theme === 'indigo'
                    ? 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-200'
                    : theme === 'teal'
                    ? 'text-teal-600 hover:text-teal-800 hover:bg-teal-200'
                    : theme === 'cyan'
                    ? 'text-cyan-600 hover:text-cyan-800 hover:bg-cyan-200'
                    : theme === 'emerald'
                    ? 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-200'
                    : theme === 'lime'
                    ? 'text-lime-600 hover:text-lime-800 hover:bg-lime-200'
                    : theme === 'amber'
                    ? 'text-amber-600 hover:text-amber-800 hover:bg-amber-200'
                    : theme === 'rose'
                    ? 'text-rose-600 hover:text-rose-800 hover:bg-rose-200'
                    : theme === 'cyberpunk'
                    ? 'text-cyan-400 hover:text-cyan-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                aria-label="Change font settings"
              >
                <Type size={16} className="md:w-5 md:h-5" />
              </button>
              
              <button
                onClick={handleReset}
                className={`p-2 md:p-3 rounded-lg transition-colors hover:scale-110 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700' 
                    : theme === 'oled'
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-900'
                    : theme === 'blue'
                    ? 'text-blue-600 hover:text-blue-800 hover:bg-blue-200'
                    : theme === 'green'
                    ? 'text-green-600 hover:text-green-800 hover:bg-green-200'
                    : theme === 'purple'
                    ? 'text-purple-600 hover:text-purple-800 hover:bg-purple-200'
                    : theme === 'red'
                    ? 'text-red-600 hover:text-red-800 hover:bg-red-200'
                    : theme === 'orange'
                    ? 'text-orange-600 hover:text-orange-800 hover:bg-orange-200'
                    : theme === 'yellow'
                    ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-200'
                    : theme === 'pink'
                    ? 'text-pink-600 hover:text-pink-800 hover:bg-pink-200'
                    : theme === 'indigo'
                    ? 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-200'
                    : theme === 'teal'
                    ? 'text-teal-600 hover:text-teal-800 hover:bg-teal-200'
                    : theme === 'cyan'
                    ? 'text-cyan-600 hover:text-cyan-800 hover:bg-cyan-200'
                    : theme === 'emerald'
                    ? 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-200'
                    : theme === 'lime'
                    ? 'text-lime-600 hover:text-lime-800 hover:bg-lime-200'
                    : theme === 'amber'
                    ? 'text-amber-600 hover:text-amber-800 hover:bg-amber-200'
                    : theme === 'rose'
                    ? 'text-rose-600 hover:text-rose-800 hover:bg-rose-200'
                    : theme === 'cyberpunk'
                    ? 'text-cyan-400 hover:text-cyan-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                aria-label="Reset to default settings"
              >
                <RotateCcw size={16} className="md:w-5 md:h-5" />
              </button>
              
              <button
                onClick={() => setShowHelp(!showHelp)}
                className={`p-2 md:p-3 rounded-lg transition-colors hover:scale-110 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700' 
                    : theme === 'oled'
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-900'
                    : theme === 'blue'
                    ? 'text-blue-600 hover:text-blue-800 hover:bg-blue-200'
                    : theme === 'green'
                    ? 'text-green-600 hover:text-green-800 hover:bg-green-200'
                    : theme === 'purple'
                    ? 'text-purple-600 hover:text-purple-800 hover:bg-purple-200'
                    : theme === 'red'
                    ? 'text-red-600 hover:text-red-800 hover:bg-red-200'
                    : theme === 'orange'
                    ? 'text-orange-600 hover:text-orange-800 hover:bg-orange-200'
                    : theme === 'yellow'
                    ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-200'
                    : theme === 'pink'
                    ? 'text-pink-600 hover:text-pink-800 hover:bg-pink-200'
                    : theme === 'indigo'
                    ? 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-200'
                    : theme === 'teal'
                    ? 'text-teal-600 hover:text-teal-800 hover:bg-teal-200'
                    : theme === 'cyan'
                    ? 'text-cyan-600 hover:text-cyan-800 hover:bg-cyan-200'
                    : theme === 'emerald'
                    ? 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-200'
                    : theme === 'lime'
                    ? 'text-lime-600 hover:text-lime-800 hover:bg-lime-200'
                    : theme === 'amber'
                    ? 'text-amber-600 hover:text-amber-800 hover:bg-amber-200'
                    : theme === 'rose'
                    ? 'text-rose-600 hover:text-rose-800 hover:bg-rose-200'
                    : theme === 'cyberpunk'
                    ? 'text-cyan-400 hover:text-cyan-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                aria-label="Show help guide"
              >
                <HelpCircle size={16} className="md:w-5 md:h-5" />
              </button>
            </div>
            
            <span className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' :
              theme === 'oled' ? 'text-gray-400' :
              theme === 'blue' ? 'text-blue-500' :
              theme === 'green' ? 'text-green-500' :
              theme === 'purple' ? 'text-purple-500' :
              theme === 'red' ? 'text-red-500' :
              theme === 'orange' ? 'text-orange-500' :
              theme === 'yellow' ? 'text-yellow-500' :
              theme === 'pink' ? 'text-pink-500' :
              theme === 'indigo' ? 'text-indigo-500' :
              theme === 'teal' ? 'text-teal-500' :
              theme === 'cyan' ? 'text-cyan-500' :
              theme === 'emerald' ? 'text-emerald-500' :
              theme === 'lime' ? 'text-lime-500' :
              theme === 'amber' ? 'text-amber-500' :
              theme === 'rose' ? 'text-rose-500' :
              'text-gray-500'
            }`}>v1.0.0</span>
          </div>
        </footer>

        {/* Modals */}
        {showAddModal && (
          <AddZoneModal
            onAddZone={handleAddTimeZone}
            onClose={() => setShowAddModal(false)}
            existingZones={timeZones.map(z => z.id)}
            theme={theme}
          />
        )}

        {showThemeSelector && (
          <ThemeSelector
            currentTheme={theme}
            onThemeChange={setTheme}
            onClose={() => setShowThemeSelector(false)}
          />
        )}

        {showFontSelector && (
          <FontSelector
            currentSettings={fontSettings}
            onSettingsChange={setFontSettings}
            onClose={() => setShowFontSelector(false)}
            theme={theme}
          />
        )}

        {showTimeInput && (
          <TimeInputModal
            onTimeSubmit={handleTimeInput}
            onClose={() => setShowTimeInput(false)}
            theme={theme}
          />
        )}

        {showHelp && (
          <HelpModal
            onClose={() => setShowHelp(false)}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
}

const getFontClass = (family: FontSettings['family']): string => {
  const fontMap = {
    sans: 'font-sans',
    serif: 'font-serif', 
    mono: 'font-mono',
    inter: 'font-sans',
    roboto: 'font-sans',
    poppins: 'font-sans',
    nunito: 'font-sans',
    lato: 'font-sans',
    opensans: 'font-sans',
    playfair: 'font-serif',
    montserrat: 'font-sans',
    sourcesans: 'font-sans',
    raleway: 'font-sans',
    ubuntu: 'font-sans',
    merriweather: 'font-serif'
  };
  return fontMap[family] || 'font-sans';
};

const getFontStyle = (family: FontSettings['family']): React.CSSProperties => {
  const fontStyleMap = {
    sans: { fontFamily: 'system-ui, sans-serif' },
    serif: { fontFamily: 'serif' },
    mono: { fontFamily: 'monospace' },
    inter: { fontFamily: 'Inter, sans-serif' },
    roboto: { fontFamily: 'Roboto, sans-serif' },
    poppins: { fontFamily: 'Poppins, sans-serif' },
    nunito: { fontFamily: 'Nunito, sans-serif' },
    lato: { fontFamily: 'Lato, sans-serif' },
    opensans: { fontFamily: 'Open Sans, sans-serif' },
    playfair: { fontFamily: 'Playfair Display, serif' },
    montserrat: { fontFamily: 'Montserrat, sans-serif' },
    sourcesans: { fontFamily: 'Source Sans Pro, sans-serif' },
    raleway: { fontFamily: 'Raleway, sans-serif' },
    ubuntu: { fontFamily: 'Ubuntu, sans-serif' },
    merriweather: { fontFamily: 'Merriweather, serif' }
  };
  return fontStyleMap[family] || { fontFamily: 'system-ui, sans-serif' };
};
export default App;