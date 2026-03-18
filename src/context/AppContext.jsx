import { createContext, useContext, useState, useEffect } from 'react';
import { routines } from '../data/routines';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Try to load state from local storage
  const loadState = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [workoutLogs, setWorkoutLogs] = useState(() => loadState('gym_logs', []));
  const [gallery, setGallery] = useState(() => loadState('gym_gallery', []));
  const [apiKey, setApiKey] = useState(() => loadState('gym_api_key', ''));

  // The next theme to do (if last was A, next is B)
  const nextThemeId = (() => {
    if (workoutLogs.length === 0) return 'theme_a';
    const lastTheme = workoutLogs[workoutLogs.length - 1].themeId;
    return lastTheme === 'theme_a' ? 'theme_b' : 'theme_a';
  })();

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('gym_logs', JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    localStorage.setItem('gym_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('gym_api_key', JSON.stringify(apiKey));
  }, [apiKey]);

  const addWorkoutLog = (logData) => {
    const newLog = {
      ...logData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setWorkoutLogs([newLog, ...workoutLogs]);
  };

  const addGalleryImage = (imageObj) => {
    const newImage = {
      ...imageObj,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setGallery([newImage, ...gallery]);
  };

  return (
    <AppContext.Provider value={{
      routines,
      workoutLogs,
      addWorkoutLog,
      gallery,
      addGalleryImage,
      apiKey,
      setApiKey,
      nextThemeId,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
