// TODO: temporary (i promise)
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { FiSettings, FiX, FiPlus } from 'react-icons/fi';

import styles from './styles.module.css';

import { useAuth } from '../../contexts/AuthContext';
import { List, useLists } from '../../contexts/ListsContext';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

import { BaseButton } from '../Button';
import { Menu } from './Menu';
import { NewListModal } from '../Modals/NewListModal';

export function SidebarDrawer() {
  const [isNewListModalOpen, setIsNewListModalOpen] = useState(false);

  const { lists, getLists, pickList } = useLists();
  const { isOpen, close } = useSidebarDrawer();
  const { user } = useAuth();

  useEffect(() => {
    getLists();
  }, []);

  function handleNewListModalState() {
    setIsNewListModalOpen(!isNewListModalOpen);
  }

  function onSelectList(list: List) {
    pickList(list);
    close();
  }

  if (!isOpen) return null;

  if (!user) return null;

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
        <div className="flex justify-between mb-2">
          <FiSettings className="text-2xl transition cursor-pointer text-body hover:brightness-90" />
          <FiX
            className="text-2xl transition cursor-pointer text-body hover:brightness-90"
            onClick={close}
          />
        </div>

        <div className="flex flex-col items-center mb-4">
          {/* TODO: use Next Image component */}
          <img
            src={user.avatarUrl}
            alt="User avatar"
            className="w-1/4 mb-4 border rounded-full border-slate-900"
          />

          <span className="text-lg leading-none text-heading">{user.name}</span>
          <span className="text-sm font-bold text-body">@{user.username}</span>
        </div>

        <hr className="mb-4 -mx-4 border-slate-900" />

        <BaseButton
          Icon={FiPlus}
          tw="mx-auto w-full md:w-auto bg-highlight mb-4"
          onClick={handleNewListModalState}
        >
          Nova Lista
        </BaseButton>

        <Menu
          header="Minhas Listas"
          lists={lists}
          onSelectList={onSelectList}
        />
      </nav>
      <NewListModal
        isOpen={isNewListModalOpen}
        onRequestClose={handleNewListModalState}
      />
    </>
  );
}
