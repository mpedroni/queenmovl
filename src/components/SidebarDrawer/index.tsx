// TODO: temporary (i promise)
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { FiSettings, FiX, FiPlus } from 'react-icons/fi';

import styles from './styles.module.css';

import { useAuth } from '../../contexts/AuthContext';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

import { Menu } from './Menu';
import { NewListModal } from '../Modals/NewListModal';

export function SidebarDrawer() {
  const [isNewListModalOpen, setIsNewListModalOpen] = useState(false);

  const { isOpen, close } = useSidebarDrawer();
  const { user } = useAuth();

  function handleNewListModalState() {
    setIsNewListModalOpen(!isNewListModalOpen);
  }

  // TODO: move it to Redux
  const userLists = [
    { id: 1, title: 'Filmes' },
    { id: 2, title: 'Livros' },
    { id: 3, title: 'Filmes para ver com o namorado' },
    { id: 4, title: 'Filmes de terror' },
  ];

  if (!isOpen) return null;

  if (!user) return null;

  return (
    <>
      <div
        className="h-screen fixed top-0 right-0 bg-slate-900 opacity-70 w-full"
        onClick={close}
      />

      <nav
        id="sidebar"
        className={`h-screen fixed top-0 left-0 bg-slate-800 shadow-md p-4 w-full md:w-1/4 ${styles['qm-sidebar-animation']}`}
      >
        <div className="flex justify-between mb-2">
          <FiSettings className="text-2xl text-body cursor-pointer hover:brightness-90 transition" />
          <FiX className="text-2xl text-body cursor-pointer hover:brightness-90 transition" />
        </div>

        <div className="flex flex-col items-center mb-4">
          {/* TODO: use Next Image component */}
          <img
            src={user.avatarUrl}
            alt="User avatar"
            className="w-1/4 rounded-full mb-4 border border-slate-900"
          />

          <span className="text-heading text-lg leading-none">{user.name}</span>
          <span className="text-body text-sm font-bold">@{user.username}</span>
        </div>

        <hr className="-mx-4 border-slate-900 mb-4" />

        <button
          className="
            flex items-center justify-center gap-4
            bg-highlight rounded-md h-8 p-4 shadow-md
            transition hover:brightness-90 active:filter-none
            font-mono uppercase tracking-wider text-heading text-sm
            w-full md:w-60 mx-auto mb-4
            disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:filter-none
          "
          onClick={handleNewListModalState}
        >
          <FiPlus />
          Nova Lista
        </button>

        <Menu header="Minhas Listas" lists={userLists} />
      </nav>
      <NewListModal
        isOpen={isNewListModalOpen}
        onRequestClose={handleNewListModalState}
      />
    </>
  );
}
