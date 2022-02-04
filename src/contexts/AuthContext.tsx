import { createContext, ReactNode, useContext, useState } from 'react';
import { User } from 'firebase/auth';

import { loginWithGoogle } from '../services/firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  user: User | null;
  login: () => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function login(): Promise<User | null> {
    const result = await loginWithGoogle();

    if (!result) return null;

    setUser(result.user);

    return result.user;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
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
