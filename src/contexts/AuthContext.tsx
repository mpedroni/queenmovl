import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user?: any;
  checkUsernameAvailability: (username: string) => void;
  loginWithGoogle: () => void;
  isUsernameAvailable: boolean;
  isLogged: boolean;
  register: (username: string) => boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>(null);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  function checkUsernameAvailability(username: string): void {
    setIsUsernameAvailable(username.length > 3);
  }

  function loginWithGoogle(): void {
    const user = {
      username: '',
    };

    setUser(user);

    if (user.username) setIsLogged(true);
  }

  function register(username: string): boolean {
    const userData = { ...user, username };

    /* save user data */

    setIsLogged(true);
    setUser(userData);

    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        checkUsernameAvailability,
        isUsernameAvailable,
        isLogged,
        loginWithGoogle,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
