// src/context/SettingsProvider.jsx
import React, { useState, useEffect } from 'react';
import SettingsContext from './SettingsContext';
import { fetchFrontSettings } from '../api/frontApi';

// Define the SettingsProvider component
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  // Fetch settings when the component mounts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchFrontSettings();
        setSettings(data);
      } catch {
         // silently ignore errors
      }
    };
    loadSettings();
  }, []);

  return (
    // Provide the settings to the app
    <SettingsContext.Provider value={{ settings }}>
      {children}
    </SettingsContext.Provider>
  );
};
