import { child, onValue, ref } from 'firebase/database';
import { auth } from '../auth';
import { database } from '../database';

interface List {
  id: string;
  name: string;
}

export function watch(handler: (lists: List[]) => void) {
  const user = auth.currentUser;

  if (!user) return;

  const userRef = ref(database, '/users/' + user.uid);

  const userListsRef = child(userRef, 'lists');

  onValue(userListsRef, (snapshot) => {
    const lists = snapshot.val();

    if (!lists) return [];

    const parsedLists = Object.entries<List>(lists).map(([key, list]) => ({
      ...list,
      id: key,
    }));

    console.log(parsedLists);

    handler(parsedLists);
  });
}
