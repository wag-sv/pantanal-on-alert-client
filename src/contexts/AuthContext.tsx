import React from 'react';

type AuthContextProviderPropsType = {
  children: React.ReactNode
};

type AuthContextType = {
  authenticatedUser: AuthenticatedUserType,
  setAuthenticatedUser: (newState: AuthenticatedUserType) => void
};

type AuthenticatedUserType = {
  token: string,
  user: object
};

const authContextInitialValue = {
  authenticatedUser: { token: '', user: {} },
  setAuthenticatedUser: () => {},
};

export const AuthContext = React.createContext<AuthContextType>(authContextInitialValue);

export function AuthContextProvider({ children }: AuthContextProviderPropsType) {
  const [authenticatedUser, setAuthenticatedUser] = React.useState(authContextInitialValue.authenticatedUser);
  const value = React.useMemo(() => ({ authenticatedUser, setAuthenticatedUser }), [authenticatedUser]);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('authenticatedUser');
    const parsedStoredUser = JSON.parse(storedUser || '""');
    if (parsedStoredUser.user) {
      setAuthenticatedUser({ ...parsedStoredUser });
    }
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
