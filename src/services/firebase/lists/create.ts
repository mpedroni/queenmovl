import { push, update, ref } from 'firebase/database';

import { auth } from '../auth';
import { List, listsRef } from '../@types/list';
import { database } from '../database';

interface CreateParams {
  name: string;
}

type CreateResponse = List | { error: ListCreateError };

class ListCreateError extends Error {
  constructor(message: string = 'Ops! Não foi possível criar a lista') {
    super();
    this.message = message;
  }
}

export async function create(
  listParams: CreateParams
): Promise<CreateResponse> {
  try {
    const user = auth.currentUser;

    if (!user)
      throw new ListCreateError('Você precisa estar logado para criar listas');

    const newListKey = push(listsRef).key;

    if (!newListKey) throw new ListCreateError();

    const list: List = {
      ...listParams,
      id: newListKey,
      user_id: user.uid,
    };

    const updates: Record<string, any> = {};

    updates['/lists/' + newListKey] = list;
    updates[`/users/${user.uid}/lists/${newListKey}`] = { name: list.name };

    await update(ref(database), updates);

    return list;
  } catch (error) {
    return {
      error: error instanceof ListCreateError ? error : new ListCreateError(),
    };
  }
}
