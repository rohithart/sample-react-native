import { DISPLAY_SETTINGS_KEY } from '@/constants/memory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

export type DisplaySettings = {
  showCompleted: boolean;
  showArchived: boolean;
  setShowCompleted: (value: boolean) => void;
  setShowArchived: (value: boolean) => void;
  reload: () => Promise<void>;
};

const DEFAULT_DISPLAY_SETTINGS = {
  showCompleted: true,
  showArchived: false,
};

const DisplaySettingsContext = createContext<DisplaySettings | undefined>(undefined);

export function DisplaySettingsProvider({ children }: { children: ReactNode }) {
  const [showCompleted, setShowCompletedState] = useState(DEFAULT_DISPLAY_SETTINGS.showCompleted);
  const [showArchived, setShowArchivedState] = useState(DEFAULT_DISPLAY_SETTINGS.showArchived);
  const isLoaded = useRef(false);

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    if (!isLoaded.current) return;
    save();
  }, [showCompleted, showArchived]);

  const reload = async () => {
    try {
      const saved = await AsyncStorage.getItem(DISPLAY_SETTINGS_KEY);
      if (saved) {
        const settings = JSON.parse(saved);
        setShowCompletedState(settings.showCompleted ?? DEFAULT_DISPLAY_SETTINGS.showCompleted);
        setShowArchivedState(settings.showArchived ?? DEFAULT_DISPLAY_SETTINGS.showArchived);
      }
    } catch (error) {
      console.error('[DisplaySettings] Failed to load:', error);
      setShowCompletedState(DEFAULT_DISPLAY_SETTINGS.showCompleted);
      setShowArchivedState(DEFAULT_DISPLAY_SETTINGS.showArchived);
    } finally {
      isLoaded.current = true;
    }
  };

  const save = async () => {
    try {
      await AsyncStorage.setItem(
        DISPLAY_SETTINGS_KEY,
        JSON.stringify({ showCompleted, showArchived })
      );
    } catch (error) {
      console.error('[DisplaySettings] Failed to save:', error);
    }
  };

  const setShowCompleted = (value: boolean) => setShowCompletedState(value);
  const setShowArchived = (value: boolean) => setShowArchivedState(value);

  return (
    <DisplaySettingsContext.Provider
      value={{ showCompleted, showArchived, setShowCompleted, setShowArchived, reload }}
    >
      {children}
    </DisplaySettingsContext.Provider>
  );
}

export function useDisplaySettings() {
  const ctx = useContext(DisplaySettingsContext);
  if (!ctx) throw new Error('useDisplaySettings must be used within DisplaySettingsProvider');
  return ctx;
}
