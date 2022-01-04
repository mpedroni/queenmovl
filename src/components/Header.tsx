import { FiMenu } from 'react-icons/fi';

import { useAuth } from '../contexts/AuthContext';
import { useSidebarDrawer } from '../contexts/SidebarDrawerContext';

export function Header() {
  const { isLogged } = useAuth();
  const { handleState } = useSidebarDrawer();

  return (
    <header className="container mx-auto px-4 pt-8 flex items-center gap-8">
      {isLogged && (
        <FiMenu
          className="text-heading text-2xl cursor-pointer"
          onClick={handleState}
        />
      )}

      <span className="font-title text-highlight text-2xl tracking-wider">
        queenmovl
      </span>
    </header>
  );
}
