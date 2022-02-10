import Image from 'next/image';
import { ref } from 'firebase/database';
import { useListVals } from 'react-firebase-hooks/database';

import { database } from '../../services/firebase/database';
import { Controls } from './Controls';
import { Table, Header } from './Table';

type List = {
  id: string;
  name: string;
};

type Item = {
  id: string;
  title: string;
  genre: string;
  release_year: string;
  streaming_platform: string;
  poster_path: string;
  suggested_by: string;
  watched_on: string;
  watched: boolean;
  grade: number;
};

interface UserListProps {
  list: List;
}

const headers: Header[] = [
  {
    id: '0',
    text: '',
    itemProperty: (item: Item) => (
      <Image
        src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`}
        alt="alt"
        className="rounded-md"
        width={66}
        height={99}
      />
    ),
  },
  { id: '1', text: 'Nome', itemProperty: 'title' },
  { id: '2', text: 'Gênero', itemProperty: 'genre' },
  { id: '3', text: 'Lançado em', itemProperty: 'release_year' },
  {
    id: '4',
    text: 'Plataforma',
    itemProperty: (item: Item) => item.streaming_platform || 'Outro',
  },
  { id: '5', text: 'Sugerido por', itemProperty: 'suggested_by' },
  { id: '6', text: 'Assistido em', itemProperty: 'watched_on' },
  { id: '7', text: 'Nota', itemProperty: 'grade' },
];

export function UserList({ list }: UserListProps) {
  const [items = []] = useListVals<Item>(
    ref(database, `list_items/${list.id}`),
    { keyField: 'id' }
  );

  return (
    <>
      <Controls className="mb-8" />

      <Table propertyToCheckItem="watched" headers={headers} items={items} />
    </>
  );
}
