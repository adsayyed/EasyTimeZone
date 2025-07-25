import { AvailableTimeZone, TimeZone } from '../types';

// Comprehensive worldwide timezone database organized by abbreviations
const worldwideTimeZones: AvailableTimeZone[] = [
  // UTC and GMT
  { id: 'UTC', name: 'Coordinated Universal Time', abbreviation: 'UTC', country: 'Global' },
  { id: 'Europe/London', name: 'Greenwich Mean Time', abbreviation: 'GMT', country: 'United Kingdom' },
  
  // North America - Eastern Time
  { id: 'America/New_York', name: 'Eastern Standard Time', abbreviation: 'EST', country: 'United States' },
  { id: 'America/Toronto', name: 'Eastern Standard Time', abbreviation: 'EST', country: 'Canada' },
  { id: 'America/Detroit', name: 'Eastern Standard Time', abbreviation: 'EST', country: 'United States' },
  { id: 'America/Miami', name: 'Eastern Standard Time', abbreviation: 'EST', country: 'United States' },
  
  // North America - Central Time
  { id: 'America/Chicago', name: 'Central Standard Time', abbreviation: 'CST', country: 'United States' },
  { id: 'America/Dallas', name: 'Central Standard Time', abbreviation: 'CST', country: 'United States' },
  { id: 'America/Mexico_City', name: 'Central Standard Time', abbreviation: 'CST', country: 'Mexico' },
  { id: 'America/Winnipeg', name: 'Central Standard Time', abbreviation: 'CST', country: 'Canada' },
  
  // North America - Mountain Time
  { id: 'America/Denver', name: 'Mountain Standard Time', abbreviation: 'MST', country: 'United States' },
  { id: 'America/Phoenix', name: 'Mountain Standard Time', abbreviation: 'MST', country: 'United States' },
  { id: 'America/Calgary', name: 'Mountain Standard Time', abbreviation: 'MST', country: 'Canada' },
  { id: 'America/Salt_Lake_City', name: 'Mountain Standard Time', abbreviation: 'MST', country: 'United States' },
  
  // North America - Pacific Time
  { id: 'America/Los_Angeles', name: 'Pacific Standard Time', abbreviation: 'PST', country: 'United States' },
  { id: 'America/Vancouver', name: 'Pacific Standard Time', abbreviation: 'PST', country: 'Canada' },
  { id: 'America/Seattle', name: 'Pacific Standard Time', abbreviation: 'PST', country: 'United States' },
  { id: 'America/San_Francisco', name: 'Pacific Standard Time', abbreviation: 'PST', country: 'United States' },
  
  // North America - Alaska & Hawaii
  { id: 'America/Anchorage', name: 'Alaska Standard Time', abbreviation: 'AKST', country: 'United States' },
  { id: 'Pacific/Honolulu', name: 'Hawaii Standard Time', abbreviation: 'HST', country: 'United States' },
  
  // Europe - Central European Time
  { id: 'Europe/Paris', name: 'Central European Time', abbreviation: 'CET', country: 'France' },
  { id: 'Europe/Berlin', name: 'Central European Time', abbreviation: 'CET', country: 'Germany' },
  { id: 'Europe/Rome', name: 'Central European Time', abbreviation: 'CET', country: 'Italy' },
  { id: 'Europe/Madrid', name: 'Central European Time', abbreviation: 'CET', country: 'Spain' },
  { id: 'Europe/Amsterdam', name: 'Central European Time', abbreviation: 'CET', country: 'Netherlands' },
  { id: 'Europe/Brussels', name: 'Central European Time', abbreviation: 'CET', country: 'Belgium' },
  { id: 'Europe/Vienna', name: 'Central European Time', abbreviation: 'CET', country: 'Austria' },
  { id: 'Europe/Zurich', name: 'Central European Time', abbreviation: 'CET', country: 'Switzerland' },
  { id: 'Europe/Prague', name: 'Central European Time', abbreviation: 'CET', country: 'Czech Republic' },
  { id: 'Europe/Warsaw', name: 'Central European Time', abbreviation: 'CET', country: 'Poland' },
  { id: 'Europe/Stockholm', name: 'Central European Time', abbreviation: 'CET', country: 'Sweden' },
  { id: 'Europe/Oslo', name: 'Central European Time', abbreviation: 'CET', country: 'Norway' },
  { id: 'Europe/Copenhagen', name: 'Central European Time', abbreviation: 'CET', country: 'Denmark' },
  
  // Europe - Eastern European Time
  { id: 'Europe/Helsinki', name: 'Eastern European Time', abbreviation: 'EET', country: 'Finland' },
  { id: 'Europe/Athens', name: 'Eastern European Time', abbreviation: 'EET', country: 'Greece' },
  { id: 'Europe/Bucharest', name: 'Eastern European Time', abbreviation: 'EET', country: 'Romania' },
  { id: 'Europe/Sofia', name: 'Eastern European Time', abbreviation: 'EET', country: 'Bulgaria' },
  { id: 'Africa/Cairo', name: 'Eastern European Time', abbreviation: 'EET', country: 'Egypt' },
  
  // Europe - Other
  { id: 'Europe/Moscow', name: 'Moscow Standard Time', abbreviation: 'MSK', country: 'Russia' },
  { id: 'Europe/Istanbul', name: 'Turkey Time', abbreviation: 'TRT', country: 'Turkey' },
  { id: 'Atlantic/Reykjavik', name: 'Greenwich Mean Time', abbreviation: 'GMT', country: 'Iceland' },
  
  // Asia - Japan Standard Time
  { id: 'Asia/Tokyo', name: 'Japan Standard Time', abbreviation: 'JST', country: 'Japan' },
  { id: 'Asia/Osaka', name: 'Japan Standard Time', abbreviation: 'JST', country: 'Japan' },
  
  // Asia - China Standard Time
  { id: 'Asia/Shanghai', name: 'China Standard Time', abbreviation: 'CST', country: 'China' },
  { id: 'Asia/Beijing', name: 'China Standard Time', abbreviation: 'CST', country: 'China' },
  { id: 'Asia/Hong_Kong', name: 'Hong Kong Time', abbreviation: 'HKT', country: 'Hong Kong' },
  
  // Asia - Korea Standard Time
  { id: 'Asia/Seoul', name: 'Korea Standard Time', abbreviation: 'KST', country: 'South Korea' },
  
  // Asia - India Standard Time
  { id: 'Asia/Kolkata', name: 'India Standard Time', abbreviation: 'IST', country: 'India' },
  { id: 'Asia/Mumbai', name: 'India Standard Time', abbreviation: 'IST', country: 'India' },
  { id: 'Asia/Delhi', name: 'India Standard Time', abbreviation: 'IST', country: 'India' },
  
  // Asia - Southeast Asia
  { id: 'Asia/Singapore', name: 'Singapore Standard Time', abbreviation: 'SGT', country: 'Singapore' },
  { id: 'Asia/Bangkok', name: 'Indochina Time', abbreviation: 'ICT', country: 'Thailand' },
  { id: 'Asia/Jakarta', name: 'Western Indonesian Time', abbreviation: 'WIB', country: 'Indonesia' },
  { id: 'Asia/Manila', name: 'Philippines Standard Time', abbreviation: 'PHT', country: 'Philippines' },
  { id: 'Asia/Kuala_Lumpur', name: 'Malaysia Time', abbreviation: 'MYT', country: 'Malaysia' },
  { id: 'Asia/Ho_Chi_Minh', name: 'Indochina Time', abbreviation: 'ICT', country: 'Vietnam' },
  
  // Asia - Middle East
  { id: 'Asia/Dubai', name: 'Gulf Standard Time', abbreviation: 'GST', country: 'UAE' },
  { id: 'Asia/Riyadh', name: 'Arabia Standard Time', abbreviation: 'AST', country: 'Saudi Arabia' },
  { id: 'Asia/Tehran', name: 'Iran Standard Time', abbreviation: 'IRST', country: 'Iran' },
  { id: 'Asia/Jerusalem', name: 'Israel Standard Time', abbreviation: 'IST', country: 'Israel' },
  
  // Australia & New Zealand
  { id: 'Australia/Sydney', name: 'Australian Eastern Standard Time', abbreviation: 'AEST', country: 'Australia' },
  { id: 'Australia/Melbourne', name: 'Australian Eastern Standard Time', abbreviation: 'AEST', country: 'Australia' },
  { id: 'Australia/Brisbane', name: 'Australian Eastern Standard Time', abbreviation: 'AEST', country: 'Australia' },
  { id: 'Australia/Perth', name: 'Australian Western Standard Time', abbreviation: 'AWST', country: 'Australia' },
  { id: 'Australia/Adelaide', name: 'Australian Central Standard Time', abbreviation: 'ACST', country: 'Australia' },
  { id: 'Pacific/Auckland', name: 'New Zealand Standard Time', abbreviation: 'NZST', country: 'New Zealand' },
  
  // South America
  { id: 'America/Sao_Paulo', name: 'Brasilia Time', abbreviation: 'BRT', country: 'Brazil' },
  { id: 'America/Buenos_Aires', name: 'Argentina Time', abbreviation: 'ART', country: 'Argentina' },
  { id: 'America/Lima', name: 'Peru Time', abbreviation: 'PET', country: 'Peru' },
  { id: 'America/Bogota', name: 'Colombia Time', abbreviation: 'COT', country: 'Colombia' },
  { id: 'America/Santiago', name: 'Chile Standard Time', abbreviation: 'CLT', country: 'Chile' },
  { id: 'America/Caracas', name: 'Venezuela Time', abbreviation: 'VET', country: 'Venezuela' },
  
  // Africa
  { id: 'Africa/Johannesburg', name: 'South Africa Standard Time', abbreviation: 'SAST', country: 'South Africa' },
  { id: 'Africa/Lagos', name: 'West Africa Time', abbreviation: 'WAT', country: 'Nigeria' },
  { id: 'Africa/Nairobi', name: 'East Africa Time', abbreviation: 'EAT', country: 'Kenya' },
  { id: 'Africa/Casablanca', name: 'Western European Time', abbreviation: 'WET', country: 'Morocco' },
  { id: 'Africa/Algiers', name: 'Central European Time', abbreviation: 'CET', country: 'Algeria' },
  
  // Pacific Islands
  { id: 'Pacific/Fiji', name: 'Fiji Time', abbreviation: 'FJT', country: 'Fiji' },
  { id: 'Pacific/Guam', name: 'Chamorro Standard Time', abbreviation: 'ChST', country: 'Guam' },
  { id: 'Pacific/Tahiti', name: 'Tahiti Time', abbreviation: 'TAHT', country: 'French Polynesia' },
  
  // Atlantic
  { id: 'Atlantic/Azores', name: 'Azores Time', abbreviation: 'AZOT', country: 'Portugal' },
  { id: 'Atlantic/Cape_Verde', name: 'Cape Verde Time', abbreviation: 'CVT', country: 'Cape Verde' },
  
  // Indian Ocean
  { id: 'Indian/Maldives', name: 'Maldives Time', abbreviation: 'MVT', country: 'Maldives' },
  { id: 'Indian/Mauritius', name: 'Mauritius Time', abbreviation: 'MUT', country: 'Mauritius' },
  
  // Additional US Timezones
  { id: 'America/Puerto_Rico', name: 'Atlantic Standard Time', abbreviation: 'AST', country: 'Puerto Rico' },
  { id: 'America/Adak', name: 'Hawaii-Aleutian Standard Time', abbreviation: 'HAST', country: 'United States' },
  
  // Additional European Timezones
  { id: 'Europe/Dublin', name: 'Greenwich Mean Time', abbreviation: 'GMT', country: 'Ireland' },
  { id: 'Europe/Lisbon', name: 'Western European Time', abbreviation: 'WET', country: 'Portugal' },
  
  // Additional Asian Timezones
  { id: 'Asia/Almaty', name: 'Almaty Time', abbreviation: 'ALMT', country: 'Kazakhstan' },
  { id: 'Asia/Tashkent', name: 'Uzbekistan Time', abbreviation: 'UZT', country: 'Uzbekistan' },
  { id: 'Asia/Karachi', name: 'Pakistan Standard Time', abbreviation: 'PKT', country: 'Pakistan' },
  { id: 'Asia/Dhaka', name: 'Bangladesh Standard Time', abbreviation: 'BST', country: 'Bangladesh' },
  { id: 'Asia/Yangon', name: 'Myanmar Time', abbreviation: 'MMT', country: 'Myanmar' },
  { id: 'Asia/Colombo', name: 'Sri Lanka Standard Time', abbreviation: 'SLST', country: 'Sri Lanka' }
];

// Cache for timezone data
let cachedTimeZones: AvailableTimeZone[] | null = null;

// Enhanced timezone search with abbreviation focus
export const searchTimeZones = async (query: string): Promise<AvailableTimeZone[]> => {
  try {
    const allZones = await getAvailableTimeZones();
    
    if (!query.trim()) {
      return allZones;
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    // Search primarily by abbreviation, then by name and country
    const results = allZones.filter(zone =>
      zone.abbreviation.toLowerCase().includes(searchTerm) ||
      zone.abbreviation.toLowerCase() === searchTerm ||
      zone.name.toLowerCase().includes(searchTerm) ||
      zone.country.toLowerCase().includes(searchTerm) ||
      zone.id.toLowerCase().includes(searchTerm)
    );
    
    // Sort results: exact abbreviation matches first, then partial matches
    return results.sort((a, b) => {
      const aAbbrevExact = a.abbreviation.toLowerCase() === searchTerm;
      const bAbbrevExact = b.abbreviation.toLowerCase() === searchTerm;
      
      if (aAbbrevExact && !bAbbrevExact) return -1;
      if (!aAbbrevExact && bAbbrevExact) return 1;
      
      const aAbbrevStarts = a.abbreviation.toLowerCase().startsWith(searchTerm);
      const bAbbrevStarts = b.abbreviation.toLowerCase().startsWith(searchTerm);
      
      if (aAbbrevStarts && !bAbbrevStarts) return -1;
      if (!aAbbrevStarts && bAbbrevStarts) return 1;
      
      return a.abbreviation.localeCompare(b.abbreviation);
    });
  } catch (error) {
    console.error('Error searching timezones:', error);
    return [];
  }
};

export const getAvailableTimeZones = async (): Promise<AvailableTimeZone[]> => {
  // Return cached data if available
  if (cachedTimeZones) {
    return cachedTimeZones;
  }

  // Use our comprehensive local database
  cachedTimeZones = worldwideTimeZones.sort((a, b) => a.abbreviation.localeCompare(b.abbreviation));
  return cachedTimeZones;
};

// Synchronous version for immediate use
export const getAvailableTimeZonesSync = (): AvailableTimeZone[] => {
  return cachedTimeZones || worldwideTimeZones;
};

export const getTimeInZone = (date: Date, timeZone: string, format: '12h' | '24h' = '12h'): string => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: format === '12h'
    });
    
    return formatter.format(date);
  } catch (error) {
    console.error(`Error formatting time for timezone ${timeZone}:`, error);
    return format === '12h' ? '00:00 AM' : '00:00';
  }
};

export const calculateOffset = (targetZone: string, baseZone: string, date: Date): number => {
  try {
    const targetUtcMs = getUtcMillisecondsInZone(date, targetZone);
    const baseUtcMs = getUtcMillisecondsInZone(date, baseZone);
    
    const diffInMs = targetUtcMs - baseUtcMs;
    const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
    
    return diffInHours;
  } catch (error) {
    console.error(`Error calculating offset between ${targetZone} and ${baseZone}:`, error);
    return 0;
  }
};

const getUtcMillisecondsInZone = (date: Date, timeZone: string): number => {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    const parts = formatter.formatToParts(date);
    const partsObj = parts.reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {} as Record<string, string>);
    
    const year = parseInt(partsObj.year);
    const month = parseInt(partsObj.month) - 1; // Month is 0-indexed in Date.UTC
    const day = parseInt(partsObj.day);
    const hour = parseInt(partsObj.hour);
    const minute = parseInt(partsObj.minute);
    const second = parseInt(partsObj.second);
    
    return Date.UTC(year, month, day, hour, minute, second);
  } catch (error) {
    console.error(`Error getting UTC milliseconds for timezone ${timeZone}:`, error);
    return date.getTime();
  }
};
export const getTimeZoneAbbreviation = (timeZone: string, date: Date): string => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'short'
    });
    
    const parts = formatter.formatToParts(date);
    const abbreviationPart = parts.find(part => part.type === 'timeZoneName');
    
    return abbreviationPart?.value || timeZone.split('/').pop() || 'GMT';
  } catch (error) {
    console.error(`Error getting abbreviation for timezone ${timeZone}:`, error);
    return 'GMT';
  }
};

export const parseTimeInput = (timeString: string, baseZone: string): Date | null => {
  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // Get YYYY-MM-DD format
    
    // Handle 12-hour format (e.g., "2:30 PM")
    const twelveHourRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM|am|pm)$/;
    const twelveHourMatch = timeString.match(twelveHourRegex);
    
    if (twelveHourMatch) {
      let hours = parseInt(twelveHourMatch[1]);
      const minutes = parseInt(twelveHourMatch[2]);
      const period = twelveHourMatch[3].toUpperCase();
      
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      const timeStr = `${today}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
      return new Date(timeStr);
    }
    
    // Handle 24-hour format (e.g., "14:30")
    const twentyFourHourRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    const twentyFourHourMatch = timeString.match(twentyFourHourRegex);
    
    if (twentyFourHourMatch) {
      const hours = parseInt(twentyFourHourMatch[1]);
      const minutes = parseInt(twentyFourHourMatch[2]);
      
      const timeStr = `${today}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
      return new Date(timeStr);
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing time input:', error);
    return null;
  }
};