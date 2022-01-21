import type { AppProps } from 'next/app';

import '../styles/globals.css';

import { makeServer } from '../services/miragejs';

import { AuthProvider } from '../contexts/AuthContext';
import { ListsProvider } from '../contexts/ListsContext';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

import { Header } from '../components/Header';
import { SidebarDrawer } from '../components/SidebarDrawer';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ListsProvider>
        <SidebarDrawerProvider>
          <Header />

          <SidebarDrawer />
        </SidebarDrawerProvider>
        <Component {...pageProps} />
      </ListsProvider>
    </AuthProvider>
  );
}

export default MyApp;
