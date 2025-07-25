import { UserPreferences, TimeZone } from '../types';
import { getTimeInZone, calculateOffset, getAvailableTimeZonesSync } from './timeUtils';

const STORAGE_KEY = 'easy-timezone-preferences';

export const savePreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preferences to localStorage:', error);
  }
};

export const loadPreferences = (): UserPreferences | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading preferences from localStorage:', error);
    return null;
  }
};

export const getDefaultTimeZones = (): TimeZone[] => {
  const currentTime = new Date();
  const baseZoneId = 'America/Chicago'; // CST
  const availableZones = getAvailableTimeZonesSync();
  const timeFormat = '12h'; // Default format
  
  const defaultZoneIds = [
    'America/Los_Angeles',  // PST (Pacific)
    'America/Chicago',      // CST (Central - base)
    'Europe/London'         // GMT (Greenwich Mean Time)
  ];
  
  return defaultZoneIds.map(zoneId => {
    const zoneInfo = availableZones.find(z => z.id === zoneId);
    return {
      id: zoneId,
      name: zoneInfo?.name || zoneId,
      abbreviation: zoneInfo?.abbreviation || 'GMT',
      currentTime: getTimeInZone(currentTime, zoneId, timeFormat),
      offset: calculateOffset(zoneId, baseZoneId, currentTime)
    };
  });
};

export const clearPreferences = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing preferences from localStorage:', error);
  }
};