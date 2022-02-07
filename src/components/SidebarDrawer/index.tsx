import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../services/firebase/auth';

import styles from './styles.module.css';

import { List, useLists } from '../../contexts/ListsContext';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

import { BaseButton } from '../Button';
import { Menu } from './Menu';
import { Header } from './Header';
import { NewListModal } from '../Modals/NewListModal';

export function SidebarDrawer() {
  const [isNewListModalOpen, setIsNewListModalOpen] = useState(false);
  const { isOpen, close } = useSidebarDrawer();
  const { pickList } = useLists();
  const [user] = useAuthState(auth);

  function handleNewListModalState() {
    setIsNewListModalOpen(!isNewListModalOpen);
  }

  function onSelectList(list: List) {
    pickList(list);
    close();
  }

  if (!isOpen || !user) return null;

  return (
    <>
      <div
        data-testid="overlay"
        className="fixed top-0 right-0 w-full h-screen bg-slate-900 opacity-70"
        onClick={close}
      />

      <nav
        id="sidebar"
        data-testid="sidebar"
        className={`h-screen fixed top-0 left-0 bg-slate-800 shadow-md p-4 w-full md:w-1/4 ${styles['qm-sidebar-animation']}`}
      >
        <Header onClickCloseButton={close} user={user} />

        <hr className="mb-4 -mx-4 border-slate-900" />

        <BaseButton
          Icon={FiPlus}
          tw="mx-auto w-full md:w-auto bg-highlight mb-4"
          onClick={handleNewListModalState}
        >
          Nova Lista
        </BaseButton>

        <Menu header="Minhas Listas" user={user} onSelectList={onSelectList} />
      </nav>
      <NewListModal
        isOpen={isNewListModalOpen}
        onRequestClose={handleNewListModalState}
      />
    </>
  );
}
