import { useRouter } from 'next/router';

import { Item } from './Item';

import { useSidebarDrawer } from '../../../contexts/SidebarDrawerContext';

type List = {
  id: number;
  title: string;
};

interface MenuProps {
  header: string;
  lists: List[];
}

export function Menu({ header, lists }: MenuProps) {
  const router = useRouter();
  const { close } = useSidebarDrawer();

  function handleNavigation(listId: number) {
    close();
    // router.push(`/lists/${listId}`);
  }

  return (
    <>
      <div className="text-body font-bold uppercase text-[0.6875rem]">
        {header}
      </div>
      <ul className="pl-4">
        {lists.length === 0 && (
          <li className="text-sm leading-none text-body">
            Nenhuma lista encontrada
          </li>
        )}
        {lists.map((list) => (
          <Item
            key={list.id}
            list={list}
            onClick={() => handleNavigation(list.id)}
          />
        ))}
      </ul>
    </>
  );
}
