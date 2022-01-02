import { useState } from "react";

interface UseAuthData {
  user?: any;
  checkUsernameAvailability: (username: string) => void,
  loginWithGoogle: () => void;
  isUsernameAvailable: boolean;
  register: (username: string) => boolean
}

export function useAuth(): UseAuthData {
  const [user, setUser] = useState({} as any);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  
  function checkUsernameAvailability(username: string): void {
    setIsUsernameAvailable(username.length > 3);
  }

  function loginWithGoogle(): void {
    const user = {
      username: 'mpedroni',
    };

    setUser(user);
  }

  function register(username: string): boolean {
    const userData = {...user, username};

    /* save user data */

    return true;
  }

  return {
    user,
    checkUsernameAvailability,
    isUsernameAvailable,
    loginWithGoogle,
    register
  }
}