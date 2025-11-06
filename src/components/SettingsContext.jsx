import React, { useState, useEffect } from 'react';
import SettingsContext from './SettingsContext';
import { fetchFrontSettings } from '../api/frontApi';

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchFrontSettings();
        setSettings(data);
      } catch {
         // silently ignore errors
      }
    };
    load();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings }}>
      {children}
    </SettingsContext.Provider>
  );
};
