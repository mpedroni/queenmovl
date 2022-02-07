import { FiLogOut, FiMenu } from 'react-icons/fi';
import { signOut as firebaseSignOut } from 'firebase/auth';

import { auth } from '../services/firebase/auth';
import { useSidebarDrawer } from '../contexts/SidebarDrawerContext';
import { useAuthState } from 'react-firebase-hooks/auth';

export function Header() {
  const [user] = useAuthState(auth);
  const { handleState } = useSidebarDrawer();

  const signOut = () => firebaseSignOut(auth);

  return (
    <header className="container flex items-center justify-between gap-8 px-4 pt-8 mx-auto">
      {!!user && (
        <FiMenu
          data-testid="toggle-sidebar"
          className="text-2xl cursor-pointer text-heading"
          onClick={handleState}
        />
      )}

      <span className="text-2xl tracking-wider font-title text-highlight mr-auto">
        queenmovl
      </span>

      {!!user && (
        <button>
          <FiLogOut className="text-heading text-2xl" onClick={signOut} />
        </button>
      )}
    </header>
  );
}
