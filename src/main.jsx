import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx';
import './index.css';
import { BalanceVisibilityProvider } from './context/BalanceVisibilityProvider';
import { SettingsProvider } from './context/SettingsProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
      <BalanceVisibilityProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
        />
      </BalanceVisibilityProvider>
    </SettingsProvider>
  </React.StrictMode>
);
