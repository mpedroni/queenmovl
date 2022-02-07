import { User } from 'firebase/auth';
import { ref } from 'firebase/database';
import { useListVals } from 'react-firebase-hooks/database';

import { database } from '../../../services/firebase/database';

import { Item } from './Item';

type List = {
  id: string;
  name: string;
};

export interface MenuProps {
  header: string;
  user: User;
  onSelectList: (list: List) => void;
}

export function Menu({ header, onSelectList, user }: MenuProps) {
  const [lists = []] = useListVals<List>(
    ref(database, `users/${user?.uid}/lists`),
    { keyField: 'id' }
  );

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
          <Item key={list.id} list={list} onClick={() => onSelectList(list)} />
        ))}
      </ul>
    </>
  );
}
