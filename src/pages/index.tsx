import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiCheck, FiX } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '../contexts/AuthContext';

import { BaseButton } from '../components/Button';

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

  function handleUsernameInput(username: string) {
    setUsername(username);
    checkUsernameAvailability(username);
  }

  function handleUserRegister() {
    register(username);

    router.push('/dashboard');
  }

  if (!user)
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
          onClick={loginWithGoogle}
        >
          Entrar com o Google
        </BaseButton>
      </main>
    );

  if (!user.username)
    return (
      <main className="container px-4 pt-20 mx-auto">
        <p className="pb-2 text-2xl font-bold tracking-wider text-heading md:w-1/4">
          Antes de começarmos, escolha seu nome de usuário.
        </p>
        <p className="pb-8 text-lg text-body">
          Ele vai servir para identificar você dentro do Queenmovl
        </p>

        <label className="flex items-center w-full h-8 px-2 mb-2 bg-gray-700 rounded-md md:w-72 text-body">
          <span className="opacity-50">@</span>
          <input
            type="text"
            className="flex-1 bg-transparent outline-none"
            value={username}
            onChange={(e) => handleUsernameInput(e.target.value)}
          />
        </label>

        {!username ? (
          ''
        ) : isUsernameAvailable ? (
          <div className="flex items-center">
            <FiCheck className="mr-2 text-2xl text-highlight" />
            <span className="text-xs text-body">Nome de usuário válido</span>
          </div>
        ) : (
          <div className="flex items-center">
            <FiX className="mr-2 text-2xl text-error" />
            <span className="text-xs text-body">
              Este nome de usuário já está sendo usado
            </span>
          </div>
        )}

        <BaseButton
          tw="mt-20 bg-highlight w-full md:w-72"
          size="xl"
          disabled={!username || !isUsernameAvailable}
          onClick={() => handleUserRegister()}
        >
          Começar
        </BaseButton>
      </main>
    );

  return null;
}
