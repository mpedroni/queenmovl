import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { AuthContext, AuthContextData } from '../contexts/AuthContext';
import { ListsContextData, ListsContext } from '../contexts/ListsContext';
import {
  SidebarDrawerContext,
  SidebarDrawerContextData,
} from '../contexts/SidebarDrawerContext';

interface ProviderProps {
  authProviderProps: AuthContextData;
  listsProviderProps: ListsContextData;
  sidebarDrawerProviderProps: SidebarDrawerContextData;
}

interface CustomProviderProps {
  authProviderProps?: Partial<AuthContextData>;
  listsProviderProps?: Partial<ListsContextData>;
  sidebarDrawerProviderProps?: Partial<SidebarDrawerContextData>;
}

interface WrapperProps {
  children: ReactNode;
  providerProps: ProviderProps;
}

export type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  providerProps?: CustomProviderProps;
};

function Wrapper({ children, providerProps }: WrapperProps) {
  return (
    <AuthContext.Provider value={{ ...providerProps.authProviderProps }}>
      <ListsContext.Provider value={{ ...providerProps.listsProviderProps }}>
        <SidebarDrawerContext.Provider
          value={{ ...providerProps.sidebarDrawerProviderProps }}
        >
          {children}
        </SidebarDrawerContext.Provider>
      </ListsContext.Provider>
    </AuthContext.Provider>
  );
}

const defaultProviderProps: CustomProviderProps = {
  authProviderProps: {
    login: jest.fn(),
    user: null,
  },

  listsProviderProps: {
    getLists: jest.fn(),
    lists: [],
    pickList: jest.fn(),
  },

  sidebarDrawerProviderProps: {
    close: jest.fn(),
    handleState: jest.fn(),
    isOpen: false,
    open: jest.fn(),
  },
};

export const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => {
  const providerProps: CustomProviderProps = {
    authProviderProps: {
      ...defaultProviderProps.authProviderProps,
      ...options?.providerProps?.authProviderProps,
    },
    listsProviderProps: {
      ...defaultProviderProps.listsProviderProps,
      ...options?.providerProps?.listsProviderProps,
    },
    sidebarDrawerProviderProps: {
      ...defaultProviderProps.sidebarDrawerProviderProps,
      ...options?.providerProps?.sidebarDrawerProviderProps,
    },
  };

  const rendered = render(
    <Wrapper providerProps={providerProps as ProviderProps}>{ui}</Wrapper>,
    options
  );

  return {
    ...rendered,
    providerProps,
  };
};
