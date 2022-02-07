import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../services/firebase/auth';

import { SignInWithGoogleButton } from '../components/Button/SignInWithGoogle';

export default function Home() {
  const [user] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if (!!user) {
      router.push('/dashboard');
    }
  }, [user]);

  return (
    <main className="container px-4 pt-20 mx-auto">
      <p className="pb-4 text-4xl tracking-wider font-title text-heading md:max-w-xl">
        Organize suas listas de coisas para fazer com seus amigos.
      </p>
      <p className="pb-12 font-medium text-body md:max-w-xl">
        Desde filmes e séries para assistir até lugares para visitar juntos,
        crie uma lista personalizada e compartilhe com seus amigos.
      </p>

      <SignInWithGoogleButton />
    </main>
  );
}
