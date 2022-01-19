import { Item } from './Item';

type List = {
  id: number;
  title: string;
};

interface MenuProps {
  header: string;
  lists: List[];
  onSelectList: (listId: number) => void;
}

export function Menu({ header, lists, onSelectList }: MenuProps) {
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
            onClick={() => onSelectList(list.id)}
          />
        ))}
      </ul>
    </>
  );
}
