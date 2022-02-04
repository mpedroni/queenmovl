import { createContext, ReactNode, useContext, useState } from 'react';
import { loginWithGoogle as login } from '../services/firebase/auth';

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

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  function checkUsernameAvailability(username: string): void {
    setIsUsernameAvailable(username.length > 3);
  }

  async function loginWithGoogle(): Promise<void> {
    const result = await login();

    if (!result) return;

    setUser(result.user as any);

    setIsLogged(true);
  }

  function register(username: string): boolean {
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
