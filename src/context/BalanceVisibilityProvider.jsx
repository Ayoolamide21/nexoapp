import { useState, useEffect } from 'react';
import { BalanceVisibilityContext } from './BalanceVisibilityContext';

export const BalanceVisibilityProvider = ({ children }) => {
  // Initialize state from localStorage, default to true if not set
  const storedBalanceVisibility = localStorage.getItem('showBalance') === 'false' ? false : true;
  
  const [showBalance, setShowBalance] = useState(storedBalanceVisibility);

  useEffect(() => {
    // Save the balance visibility state to localStorage whenever it changes
    localStorage.setItem('showBalance', showBalance);
  }, [showBalance]);

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  return (
    <BalanceVisibilityContext.Provider value={{ showBalance, toggleBalanceVisibility }}>
      {children}
    </BalanceVisibilityContext.Provider>
  );
};
