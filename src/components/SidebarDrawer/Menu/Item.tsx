import { LiHTMLAttributes } from 'react';
import { useLists } from '../../../contexts/ListsContext';

type List = {
  id: number;
  name: string;
};

interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  list: List;
}

export function Item({ list, ...props }: MenuItemProps) {
  const { activeList } = useLists();

  return list.id === activeList?.id ? (
    <li className="font-bold cursor-pointer text-highlight" {...props}>
      {list.name}
    </li>
  ) : (
    <li
      className="transition cursor-pointer text-body hover:brightness-90"
      key={list.id}
      {...props}
    >
      {list.name}
    </li>
  );
}
