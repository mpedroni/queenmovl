import { FiMenu } from 'react-icons/fi';

import { useAuth } from '../contexts/AuthContext';
import { useSidebarDrawer } from '../contexts/SidebarDrawerContext';

export function Header() {
  const { isLogged } = useAuth();
  const { handleState } = useSidebarDrawer();

  return (
    <header className="container flex items-center gap-8 px-4 pt-8 mx-auto">
      {isLogged && (
        <FiMenu
          data-testid="toggle-sidebar"
          className="text-2xl cursor-pointer text-heading"
          onClick={handleState}
        />
      )}

      <span className="text-2xl tracking-wider font-title text-highlight">
        queenmovl
      </span>
    </header>
  );
}
