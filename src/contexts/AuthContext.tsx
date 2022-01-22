import { createContext, ReactNode, useContext, useState } from 'react';

type User = {
  id: number;
  username: string;
  name: string;
  avatarUrl: string;
};

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  user: User | null;
  checkUsernameAvailability: (username: string) => void;
  loginWithGoogle: () => void;
  isUsernameAvailable: boolean;
  isLogged: boolean;
  register: (username: string) => boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const FAKE_USER = {
  id: 1,
  username: 'mpedroni',
  name: 'Matheus Pedroni',
  avatarUrl: 'https://github.com/mpedroni.png',
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(FAKE_USER);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  function checkUsernameAvailability(username: string): void {
    setIsUsernameAvailable(username.length > 3);
  }

  function loginWithGoogle(): void {
    setUser(FAKE_USER);

    if (FAKE_USER.username) setIsLogged(true);
  }

  function register(username: string): boolean {
    const user = {
      ...FAKE_USER,
      username,
    };

    setIsLogged(true);
    setUser(user);

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
