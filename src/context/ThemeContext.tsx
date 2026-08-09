import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeName = 'light' | 'dark-slate' | 'emerald' | 'violet' | 'sunset';

export interface ThemeConfig {
  id: ThemeName;
  name: string;
  icon: string;
  description: string;
  previewColor: string;
}

export const THEME_PRESETS: ThemeConfig[] = [
  {
    id: 'light',
    name: 'Modern Crisp',
    icon: 'Sun',
    description: 'Clean, high-contrast light theme with rich indigo highlights',
    previewColor: '#2563EB',
  },
  {
    id: 'dark-slate',
    name: 'Cyber Midnight',
    icon: 'Moon',
    description: 'Sleek dark slate layout with vibrant sky accents',
    previewColor: '#38BDF8',
  },
  {
    id: 'emerald',
    name: 'Emerald Mint',
    icon: 'Leaf',
    description: 'Fresh organic green theme designed for clarity',
    previewColor: '#059669',
  },
  {
    id: 'violet',
    name: 'Royal Violet',
    icon: 'Sparkles',
    description: 'Deep purple luxury dark mode with amethyst hues',
    previewColor: '#7C3AED',
  },
  {
    id: 'sunset',
    name: 'Warm Sunset',
    icon: 'Flame',
    description: 'Warm cream canvas with energetic amber accents',
    previewColor: '#EA580C',
  },
];

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  currentPreset: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const saved = localStorage.getItem('cp_theme') as ThemeName;
    if (saved && THEME_PRESETS.some((p) => p.id === saved)) {
      return saved;
    }
    return 'light'; // Default to Modern Crisp Light Theme
  });

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem('cp_theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const currentPreset = THEME_PRESETS.find((p) => p.id === theme) || THEME_PRESETS[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentPreset }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
