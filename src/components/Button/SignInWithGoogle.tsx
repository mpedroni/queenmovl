import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

import { BaseButton } from '.';
import { auth } from '../../services/firebase/auth';

export function SignInWithGoogleButton() {
  const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth);

  if (error) toast.error(error.message);

  return (
    <BaseButton
      tw="bg-highlight w-full md:w-auto"
      size="xl"
      Icon={FcGoogle}
      onClick={() => signInWithGoogle()}
    >
      Entrar com o Google
    </BaseButton>
  );
}
