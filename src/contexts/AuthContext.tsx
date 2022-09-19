import React from 'react';

type AuthContextProviderPropsType = {
  children: React.ReactNode
};

type AuthContextType = {
  authenticatedUser: any,
  setAuthenticatedUser: (newState: any) => void
};

const authContextInitialValue = {
  authenticatedUser: { token: '', user: { isAdmin: false } },
  setAuthenticatedUser: () => {},
};

export const AuthContext = React.createContext<AuthContextType>(authContextInitialValue);

export function AuthContextProvider({ children }: AuthContextProviderPropsType) {
  const [authenticatedUser, setAuthenticatedUser] = React.useState(authContextInitialValue.authenticatedUser);
  const value = React.useMemo(() => ({ authenticatedUser, setAuthenticatedUser }), [authenticatedUser]);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('authenticatedUser');
    const parsedStoredUser = JSON.parse(storedUser || '""');
    const { user, token } = parsedStoredUser;
    if (user && token) {
      setAuthenticatedUser({ user, token });
    }
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
