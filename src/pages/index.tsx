import { useState } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiCheck, FiX } from 'react-icons/fi';

import { useAuth } from '../hooks/useAuth';

import GoogleIcon from '../assets/icons/google.svg';

export default function Home() {
  const {
    user,
    loginWithGoogle,
    checkUsernameAvailability,
    isUsernameAvailable,
    register,
  } = useAuth();
  const [username, setUsername] = useState('');

  const router = useRouter();

  function handleLoginWithGoogle() {
    loginWithGoogle();
  }

  function handleUsernameInput(username: string) {
    setUsername(username);
    checkUsernameAvailability(username);
  }

  function handleUserRegister() {
    register(username);
  }

  if (!user)
    return (
      <main className="container mx-auto px-4 pt-20">
        <p className="font-title text-heading text-4xl leading-snug tracking-wider pb-4 md:max-w-xl">
          Organize suas listas de coisas para fazer com seus amigos.
        </p>
        <p className="font-medium text-body leading-snug pb-12 md:max-w-xl">
          Desde filmes e séries para assistir até lugares para visitar juntos,
          crie uma lista personalizada e compartilhe com seus amigos.
        </p>

        <button
          className="
          flex align-middle justify-center gap-4
          bg-highlight rounded-md h-14 p-4 shadow-md
          transition hover:brightness-90
          font-mono uppercase tracking-wider text-heading
          w-full md:w-auto
        "
          onClick={() => handleLoginWithGoogle()}
        >
          <Image src={GoogleIcon} alt="Google icon" />
          Entrar com o Google
        </button>
      </main>
    );

  if (!user.username)
    return (
      <main className="container mx-auto px-4 pt-20">
        <p className="font-bold text-2xl text-heading tracking-wider md:w-1/4 pb-2">
          Antes de começarmos, escolha seu nome de usuário.
        </p>
        <p className="text-lg text-body pb-8">
          Ele vai servir para identificar você dentro do Queenmovl
        </p>

        <label className="flex items-center h-8 w-full md:w-72 rounded-md px-2 mb-2 text-body bg-gray-700">
          <span className="opacity-50">@</span>
          <input
            type="text"
            className="bg-transparent flex-1 outline-none"
            value={username}
            onChange={(e) => handleUsernameInput(e.target.value)}
          />
        </label>

        {!username ? (
          ''
        ) : isUsernameAvailable ? (
          <div className="flex items-center">
            <FiCheck className="text-2xl text-highlight mr-2" />
            <span className="text-xs text-body">Nome de usuário válido</span>
          </div>
        ) : (
          <div className="flex items-center">
            <FiX className="text-2xl text-error mr-2" />
            <span className="text-xs text-body">
              Este nome de usuário já está sendo usado
            </span>
          </div>
        )}

        <button
          className="
            flex items-center justify-center
            bg-highlight rounded-md h-14 p-4 shadow-md
            transition hover:brightness-90 active:filter-none
            font-mono uppercase tracking-wider text-heading
            w-full md:w-72 mt-20
            disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:filter-none
          "
          disabled={!username || !isUsernameAvailable}
          onClick={handleUserRegister}
        >
          Começar
        </button>
      </main>
    );

  router.push('/dashboard');
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24, // 1 day
  };
};
