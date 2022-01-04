import { useRouter } from 'next/router';
import { LiHTMLAttributes, useEffect } from 'react';

type List = {
  id: number;
  title: string;
};

interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  list: List;
}

export function Item({ list, ...props }: MenuItemProps) {
  // TODO: set active link dynamically based on selected list
  const active = list.id === 2;

  return active ? (
    <li className="text-highlight font-bold cursor-pointer" {...props}>
      {list.title}
    </li>
  ) : (
    <li
      className="text-body cursor-pointer hover:brightness-90 transition"
      key={list.id}
      {...props}
    >
      {list.title}
    </li>
  );
}
