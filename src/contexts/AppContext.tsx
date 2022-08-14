import React from 'react';

type AppContextProviderPropsType = {
  children: React.ReactNode
};

type AppContextType = {
  appState: {},
  setAppState: (newState: object) => void
};

const appContextInitialValue = {
  appState: {},
  setAppState: () => {},
};

const AppContext = React.createContext<AppContextType>(appContextInitialValue);

function AppContextProvider({ children }: AppContextProviderPropsType) {
  const [appState, setAppState] = React.useState(appContextInitialValue.appState);
  const value = React.useMemo(() => ({ appState, setAppState }), [appState]);
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
