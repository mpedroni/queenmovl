import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { AuthProvider } from '../contexts/AuthContext';

import { Header } from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />

      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
