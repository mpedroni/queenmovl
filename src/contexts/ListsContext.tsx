import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

type List = {
  id: number;
  name: string;
};

interface ListsProviderProps {
  children: ReactNode;
}

export interface ListsContextData {
  lists: List[];
  error?: Error;
  activeList?: List;
  getLists: () => void;
  createList: (listCreateParams: ListCreateParams) => Promise<List | void>;
  pickList: (listOrListId: List | number) => void;
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

    try {
      const response = await api.get(`/users/${user.id}/lists`);

      setLists(response.data.lists);
    } catch {
      setError(new ListFetchError());
    }
  }

  async function createList(
    listCreateParams: ListCreateParams
  ): Promise<List | void> {
    try {
      const response = await api.post<{ list: List }>('/lists', {
        list: { ...listCreateParams, user: '1' },
      });

      return response.data.list;
    } catch {
      setError(
        new Error(
          'Ops! Ocorreu um erro na criação da lista. Por favor, tente novamente'
        )
      );
    }
  }

  function pickList(listOrListId: List | number) {
    typeof listOrListId === 'number'
      ? setActiveList(lists.find((list) => list.id === listOrListId))
      : setActiveList(listOrListId);
  }

  return (
    <ListsContext.Provider
      value={{
        lists,
        error,
        getLists,
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
