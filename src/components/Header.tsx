import { FiMenu } from 'react-icons/fi';

import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { isLogged } = useAuth();

  return (
    <header className="container mx-auto px-4 pt-8">
      {isLogged && <FiMenu className="text-heading text-2xl" />}

      <span className="font-title text-highlight text-2xl tracking-wider">
        queenmovl
      </span>
    </header>
  );
}
