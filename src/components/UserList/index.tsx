import { Controls } from './Controls';
import { Table } from './Table';

type List = {
  id: number;
  name: string;
};

interface UserListProps {
  list: List;
}

export function UserList({ list }: UserListProps) {
  function handleNewItem() {
    console.log('add a new item');
  }

  return (
    <>
      <Controls onAddItem={handleNewItem} className="mb-8" />

      <Table headers={[]} items={[]} />
    </>
  );
}
