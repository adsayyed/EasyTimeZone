import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { AvailableTimeZone, Theme } from '../types';
import { getAvailableTimeZones, searchTimeZones } from '../utils/timeUtils';

interface AddZoneModalProps {
  onAddZone: (zoneId: string) => void;
  onClose: () => void;
  existingZones: string[];
  theme: Theme;
}

const AddZoneModal: React.FC<AddZoneModalProps> = ({
  onAddZone,
  onClose,
  existingZones,
  theme
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableZones, setAvailableZones] = useState<AvailableTimeZone[]>([]);
  const [filteredZones, setFilteredZones] = useState<AvailableTimeZone[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredZones.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredZones.length > 0) {
        e.preventDefault();
        onAddZone(filteredZones[selectedIndex].id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, filteredZones, selectedIndex, onAddZone]);

  useEffect(() => {
    const loadTimeZones = async () => {
      const zones = await getAvailableTimeZones();
      const filteredZones = zones.filter(zone => !existingZones.includes(zone.id));
      setAvailableZones(filteredZones);
      setFilteredZones(filteredZones);
    };
    
    loadTimeZones();
  }, [existingZones]);

  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm.trim()) {
        setIsSearching(true);
        try {
          const results = await searchTimeZones(searchTerm);
          const filteredResults = results.filter(zone => !existingZones.includes(zone.id));
          setFilteredZones(filteredResults);
          setSelectedIndex(0); // Reset selection when search results change
        } catch (error) {
          console.error('Search error:', error);
          setFilteredZones([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setFilteredZones(availableZones);
        setSelectedIndex(0); // Reset selection when clearing search
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, availableZones, existingZones]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
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
      <div className={`${themeClasses[theme]} rounded-lg shadow-xl max-w-md w-full max-h-96 flex flex-col`}>
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
          <h2 className="text-lg font-semibold">Add Time Zone</h2>
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
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className={`p-4 border-b ${
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
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              theme === 'dark' ? 'text-gray-500' :
              theme === 'oled' ? 'text-gray-500' :
              theme === 'blue' ? 'text-blue-400' :
              theme === 'green' ? 'text-green-400' :
              theme === 'purple' ? 'text-purple-400' :
              theme === 'red' ? 'text-red-400' :
              theme === 'orange' ? 'text-orange-400' :
              theme === 'yellow' ? 'text-yellow-400' :
              theme === 'pink' ? 'text-pink-400' :
              theme === 'indigo' ? 'text-indigo-400' :
              theme === 'teal' ? 'text-teal-400' :
              theme === 'cyan' ? 'text-cyan-400' :
              theme === 'emerald' ? 'text-emerald-400' :
              theme === 'lime' ? 'text-lime-400' :
              theme === 'amber' ? 'text-amber-400' :
              theme === 'rose' ? 'text-rose-400' :
              'text-gray-400'
            }`} size={18} />
            <input
              type="text"
              placeholder="Search timezone abbreviations (EST, PST, GMT, JST, etc.)..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
          </div>
        </div>

        {/* Zone List */}
        <div className="flex-1 overflow-y-auto">
          {isSearching ? (
            <div className={`p-4 text-center ${
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
              theme === 'cyberpunk' ? 'text-cyan-400' :
              'text-gray-500'
            }`}>
              Searching...
            </div>
          ) : filteredZones.length === 0 ? (
            <div className={`p-4 text-center ${
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
            }`}>
              {searchTerm ? 'No time zones found. Try searching for abbreviations like "EST", "PST", "GMT", or "JST"' : 'No time zones found'}
            </div>
          ) : (
            <div className="p-2">
              {filteredZones.map((zone, index) => (
                <button
                  key={zone.id}
                  onClick={() => onAddZone(zone.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    index === selectedIndex 
                      ? (theme === 'dark' ? 'bg-gray-600' :
                         theme === 'oled' ? 'bg-gray-800' :
                         theme === 'blue' ? 'bg-blue-200' :
                         theme === 'green' ? 'bg-green-200' :
                         theme === 'purple' ? 'bg-purple-200' :
                         theme === 'red' ? 'bg-red-200' :
                         theme === 'orange' ? 'bg-orange-200' :
                         theme === 'yellow' ? 'bg-yellow-200' :
                         theme === 'pink' ? 'bg-pink-200' :
                         theme === 'indigo' ? 'bg-indigo-200' :
                         theme === 'teal' ? 'bg-teal-200' :
                         theme === 'cyan' ? 'bg-cyan-200' :
                         theme === 'emerald' ? 'bg-emerald-200' :
                         theme === 'lime' ? 'bg-lime-200' :
                         theme === 'amber' ? 'bg-amber-200' :
                         theme === 'rose' ? 'bg-rose-200' :
                         'bg-gray-200')
                      : ''
                  } ${
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
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{zone.name}</div>
                      <div className={`text-xs ${
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
                        {zone.id.split('/').pop()?.replace(/_/g, ' ')} • {zone.country}
                      </div>
                    </div>
                    <div className={`text-sm font-mono ${
                      theme === 'dark' ? 'text-gray-300' :
                      theme === 'oled' ? 'text-gray-300' :
                      theme === 'blue' ? 'text-blue-700' :
                      theme === 'green' ? 'text-green-700' :
                      theme === 'purple' ? 'text-purple-700' :
                      theme === 'red' ? 'text-red-700' :
                      theme === 'orange' ? 'text-orange-700' :
                      theme === 'yellow' ? 'text-yellow-700' :
                      theme === 'pink' ? 'text-pink-700' :
                      theme === 'indigo' ? 'text-indigo-700' :
                      theme === 'teal' ? 'text-teal-700' :
                      theme === 'cyan' ? 'text-cyan-700' :
                      theme === 'emerald' ? 'text-emerald-700' :
                      theme === 'lime' ? 'text-lime-700' :
                      theme === 'amber' ? 'text-amber-700' :
                      theme === 'rose' ? 'text-rose-700' :
                      'text-gray-600'
                    }`}>
                      {zone.abbreviation}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddZoneModal;