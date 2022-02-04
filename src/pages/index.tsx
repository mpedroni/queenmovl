import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '../contexts/AuthContext';

import { BaseButton } from '../components/Button';
import { useEffect } from 'react';

export default function Home() {
  const { login, user } = useAuth();

  useEffect(() => {
    if (!!user) router.push('/dashboard');
  }, [user]);

  const router = useRouter();

  async function handleLogin() {
    await login();
  }

  return (
    <main className="container px-4 pt-20 mx-auto">
      <p className="pb-4 text-4xl tracking-wider font-title text-heading md:max-w-xl">
        Organize suas listas de coisas para fazer com seus amigos.
      </p>
      <p className="pb-12 font-medium text-body md:max-w-xl">
        Desde filmes e séries para assistir até lugares para visitar juntos,
        crie uma lista personalizada e compartilhe com seus amigos.
      </p>

      <BaseButton
        tw="bg-highlight w-full md:w-auto"
        size="xl"
        Icon={FcGoogle}
        onClick={handleLogin}
      >
        Entrar com o Google
      </BaseButton>
    </main>
  );
}
