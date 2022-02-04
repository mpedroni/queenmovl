import { createContext, ReactNode, useContext, useState } from 'react';
import { User } from 'firebase/auth';

import { loginWithGoogle } from '../services/firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  user: User | null;
  login: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function login(): Promise<void> {
    const result = await loginWithGoogle();

    setUser(result?.user || null);
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
