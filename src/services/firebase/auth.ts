import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthCredential,
  connectAuthEmulator,
} from 'firebase/auth';

import { app } from './app';

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

if (process.env.NODE_ENV !== 'production') {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
}

interface AuthErrorParams {
  code: string;
  message: string;
  email: string;
  credential: OAuthCredential | null;
}

export class AuthError extends Error {
  constructor({ code }: AuthErrorParams) {
    super();
    this.message;
  }
}

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider).catch((error) => {
    const { code, message, email } = error;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    throw new AuthError({ code, message, email, credential });
  });
  // Returns a Google Access Token that can be used to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);

  if (!credential) return;

  return result;
};
