import React from 'react';

type AppContextProviderPropsType = {
  children: React.ReactNode
};

type AppContextType = {
  appState: any;
  setAppState: (newState: any) => void;
};

const appContextInitialValue = {
  appState: {
    properties: [],
    fireSpots: [],
    statistics: { fireSpots: '', affectedMunicipalities: '', affectedProperties: '' },
  },
  setAppState: () => {},
};

export const AppContext = React.createContext<AppContextType>(appContextInitialValue);

export function AppContextProvider({ children }: AppContextProviderPropsType) {
  const [appState, setAppState] = React.useState(appContextInitialValue.appState);
  const value = React.useMemo(() => ({ appState, setAppState }), [appState]);
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
