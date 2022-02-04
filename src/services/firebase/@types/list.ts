import { ref } from 'firebase/database';
import { database } from '../database';

export interface List {
  id: string;
  name: string;
  user_id: string;
}

export const listsRef = ref(database, 'lists');
