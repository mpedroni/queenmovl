import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { UserList } from '../components/UserList';
import { useAuth } from '../contexts/AuthContext';
import { useLists } from '../contexts/ListsContext';

export default function Dashboard() {
  const { activeList } = useLists();
  const { user } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (!user) replace('/');
  }, []);

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
