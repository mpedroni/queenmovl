import { push, ref, update } from 'firebase/database';
import { database } from '../database';

type List = {
  id: string;
};

export async function addItem(list: List, item: any) {
  const itemsRef = ref(database, `list_items/${list.id}`);
  const itemRefKey = push(itemsRef, item).key;

  if (!itemRefKey) return;

  const updates: Record<string, any> = {};

  updates[`/list_items/${list.id}/${itemRefKey}`] = item;
  updates[`/lists/${list.id}/items`] = { [itemRefKey]: true };

  update(ref(database), updates);
}
