export interface TimeZone {
  id: string;
  name: string;
  abbreviation: string;
  currentTime: string;
  offset: number;
}

export interface AvailableTimeZone {
  id: string;
  name: string;
  abbreviation: string;
  country: string;
}

export type Theme = 'light' | 'dark' | 'blue' | 'green' | 'purple';
export type Theme = 'light' | 'dark' | 'oled' | 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'yellow' | 'pink' | 'indigo' | 'teal' | 'cyan' | 'emerald' | 'lime' | 'amber' | 'rose';

export interface FontSettings {
  family: 'sans' | 'serif' | 'mono' | 'inter' | 'roboto' | 'poppins' | 'nunito' | 'lato' | 'opensans' | 'playfair' | 'montserrat' | 'sourcesans' | 'raleway' | 'ubuntu' | 'merriweather';
}

export interface UserPreferences {
  timeZones: TimeZone[];
  baseZoneId: string;
  theme: Theme;
  fontSettings: FontSettings;
  timeFormat?: '12h' | '24h';
}