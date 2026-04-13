import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const THEME_KEY = '@app_theme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  isDark: boolean;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleDarkMode: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved) {
        const { theme: savedTheme, isDark: savedIsDark } = JSON.parse(saved);
        setThemeState(savedTheme);
        setIsDark(savedIsDark);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading theme:', error);
      setIsLoaded(true);
    }
  };

  const toggleDarkMode = useCallback(async (dark: boolean) => {
    setIsDark(dark);
    const newTheme = dark ? 'dark' : 'light';
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem(
        THEME_KEY,
        JSON.stringify({
          theme: newTheme,
          isDark: dark,
        })
      );
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, []);

  const setTheme = useCallback(async (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem(
        THEME_KEY,
        JSON.stringify({
          theme: newTheme,
          isDark,
        })
      );
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [isDark]);

  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        theme,
        setTheme,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
