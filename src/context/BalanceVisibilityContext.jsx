import { createContext, useContext } from 'react';

// Create the context
export const BalanceVisibilityContext = createContext();
BalanceVisibilityContext.displayName = "BalanceVisibilityContext";

// Custom hook to use the BalanceVisibility context
export const useBalanceVisibility = () => {
  const context = useContext(BalanceVisibilityContext);
  if (!context) {
    throw new Error("useBalanceVisibility must be used within a BalanceVisibilityProvider");
  }
  return context;
};
