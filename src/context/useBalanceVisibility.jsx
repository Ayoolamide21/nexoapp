import { useState } from 'react';
import { BalanceVisibilityContext } from './BalanceVisibilityContext';

export const BalanceVisibilityProvider = ({ children }) => {
  const [showBalance, setShowBalance] = useState(true);

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  return (
    <BalanceVisibilityContext.Provider value={{ showBalance, toggleBalanceVisibility }}>
      {children}
    </BalanceVisibilityContext.Provider>
  );
};
