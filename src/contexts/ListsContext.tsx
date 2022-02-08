import { createContext, ReactNode, useContext, useState } from 'react';

import { create, watch, addItem } from '../services/firebase/lists';
import { useAuth } from './AuthContext';

export interface List {
  id: string;
  name: string;
}

interface ListsProviderProps {
  children: ReactNode;
}

export interface ListsContextData {
  lists: List[];
  error?: Error;
  activeList?: List;
  addListItem: (item: any) => void;
  getLists: () => void;
  createList: (listCreateParams: ListCreateParams) => Promise<List | undefined>;
  pickList: (listOrListId: List | string) => void;
}

type ListCreateParams = {
  name: string;
};

class ListFetchError extends Error {
  constructor() {
    super();

    this.name = 'ListFetchError';
    this.message = 'Ops! Não foi possível carregar as suas listas no momento';
  }
}

export const ListsContext = createContext<ListsContextData>(
  {} as ListsContextData
);

export function ListsProvider({ children }: ListsProviderProps) {
  const { user } = useAuth();

  const [lists, setLists] = useState<List[]>([] as List[]);
  const [error, setError] = useState<Error>();
  const [activeList, setActiveList] = useState<List>();

  async function getLists() {
    if (!user) return;

    watch((lists) => {
      setLists(lists);
    });
  }

  async function createList(listCreateParams: ListCreateParams) {
    const response = await create(listCreateParams);

    if ('error' in response) {
      setError(response.error);

      return;
    }

    return response;
  }

  function pickList(listOrListId: List | string) {
    typeof listOrListId === 'object'
      ? setActiveList(listOrListId)
      : setActiveList(lists.find((list) => list.id === listOrListId));
  }

  function addListItem(item: any) {
    if (!activeList) return;

    addItem(activeList, item);
  }

  return (
    <ListsContext.Provider
      value={{
        lists,
        error,
        getLists,
        addListItem,
        activeList,
        pickList,
        createList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}

export function useLists() {
  const context = useContext(ListsContext);

  return context;
}
