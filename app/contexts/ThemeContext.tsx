"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeState {
  theme: Theme;
  mounted: boolean;
}

type ThemeAction = 
  | { type: 'INITIALIZE_THEME'; theme: Theme }
  | { type: 'TOGGLE_THEME' };

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'INITIALIZE_THEME':
      return { theme: action.theme, mounted: true };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    default:
      return state;
  }
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeState, dispatch] = useReducer(themeReducer, {
    theme: 'dark',
    mounted: false
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', initialTheme);
    dispatch({ type: 'INITIALIZE_THEME', theme: initialTheme });
  }, []);

  useEffect(() => {
    if (themeState.mounted) {
      localStorage.setItem('theme', themeState.theme);
      document.documentElement.setAttribute('data-theme', themeState.theme);
    }
  }, [themeState]);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <ThemeContext.Provider value={{ theme: themeState.theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
