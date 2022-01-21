import type { AppProps } from 'next/app';

import '../styles/globals.css';

import { makeServer } from '../services/miragejs';

import { AuthProvider } from '../contexts/AuthContext';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

import { Header } from '../components/Header';
import { SidebarDrawer } from '../components/SidebarDrawer';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SidebarDrawerProvider>
        <Header />

        <SidebarDrawer />
      </SidebarDrawerProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
