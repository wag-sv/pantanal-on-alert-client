import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContextProvider } from './contexts/AppContext';
import { AuthContextProvider } from './contexts/AuthContext';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
);
