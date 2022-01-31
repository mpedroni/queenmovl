import { UserList } from '../components/UserList';
import { useLists } from '../contexts/ListsContext';

export default function Dashboard() {
  const { activeList } = useLists();

  return (
    <main className="container px-4 pt-20 mx-auto">
      {!!activeList ? (
        <UserList list={activeList} />
      ) : (
        <p className="text-lg text-center text-body">
          Selecione ou crie uma lista ao lado para começar =)
        </p>
      )}
    </main>
  );
}
