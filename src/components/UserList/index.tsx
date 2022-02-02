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
  return (
    <>
      <Controls className="mb-8" />

      <Table headers={[]} items={[]} />
    </>
  );
}
