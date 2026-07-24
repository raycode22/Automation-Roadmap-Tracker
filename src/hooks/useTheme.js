/**
 * Custom hook for managing dark/light theme
 * Handles theme persistence and system preference detection
 */

import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

export function useTheme() {
  const [darkMode, setDarkMode] = useLocalStorage('bootcampTheme', null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (darkMode === null) {
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemDarkMode);
    }
  }, [darkMode, setDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = (e) => {
      // Only update if user hasn't explicitly set a preference
      const savedTheme = localStorage.getItem('bootcampTheme');
      if (savedTheme === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [setDarkMode]);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setDarkMode(prev => !prev);
  }, [setDarkMode]);

  // Set specific theme
  const setTheme = useCallback((isDark) => {
    setDarkMode(isDark);
  }, [setDarkMode]);

  return {
    darkMode: darkMode ?? false,
    isDark: darkMode ?? false,
    toggleTheme,
    setTheme
  };
}

export default useTheme;
