// TODO: temporary (i promise)
/* eslint-disable @next/next/no-img-element */
import { User } from 'firebase/auth';
import { FiSettings, FiX } from 'react-icons/fi';

interface HeaderProps {
  onClickCloseButton: () => void;
  user: User;
}

function initials(name: string | null) {
  if (!name) return 'AN';

  const [firstName, lastName] = name.toLocaleUpperCase().split(' ');
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

export function Header({ onClickCloseButton, user }: HeaderProps) {
  return (
    <>
      <div className="flex justify-between mb-2">
        <FiSettings className="text-2xl transition cursor-pointer text-body hover:brightness-90" />
        <button onClick={onClickCloseButton}>
          <FiX className="text-2xl transition cursor-pointer text-body hover:brightness-90" />
        </button>
      </div>

      <div className="flex flex-col items-center mb-4">
        {user.photoURL ? (
          // TODO: use Next Image component
          <img
            src={user.photoURL}
            alt={user.displayName + ' photo'}
            className="w-1/4 border rounded-full border-slate-900"
          />
        ) : (
          <div className="flex justify-center items-center bg-body h-24 w-24 rounded-full text-2xl">
            {initials(user.displayName)}
          </div>
        )}

        <span className="text-lg leading-none text-heading mt-4">
          {user.displayName}
        </span>
      </div>
    </>
  );
}
