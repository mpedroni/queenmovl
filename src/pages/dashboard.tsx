import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../services/firebase/auth';

import { UserList } from '../components/UserList';
import { useLists } from '../contexts/ListsContext';

export default function Dashboard() {
  const [user] = useAuthState(auth);

  const { activeList } = useLists();
  const { replace } = useRouter();

  useEffect(() => {
    if (!user) replace('/');
  }, [user]);

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
