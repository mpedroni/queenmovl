import Image from 'next/image';

import GoogleIcon from '../assets/icons/google.svg';

export default function Home() {
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
          flex align-middle gap-4 
        bg-highlight rounded-md h-14 p-4 shadow-md 
          transition hover:brightness-90
          font-mono uppercase tracking-wider text-heading
        "
      >
        <Image src={GoogleIcon} alt="Google icon" />
        Entrar com o Google
      </button>
    </main>
  );
}
