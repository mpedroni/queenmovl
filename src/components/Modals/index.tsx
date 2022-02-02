import { ReactNode } from 'react';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  headline?: string;
  children: ReactNode;
}

export function Modal({
  isOpen,
  onRequestClose,
  headline,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed top-0 right-0 w-full h-screen bg-slate-900 opacity-70"
        onClick={onRequestClose}
      />

      <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full h-screen p-4 m-auto rounded-md md:min-w-max md:w-9/12 lg:w-1/2 md:h-2/4 bg-slate-800 shadow-[4px_4px_4px_0_rgba(0,0,0,.25)]">
        <div className="flex items-center justify-between mb-4 text-heading">
          <span className="text-lg font-bold">{headline}</span>
          <FiX
            data-testid="close-icon"
            className="text-2xl transition cursor-pointer hover:brightness-90"
            onClick={onRequestClose}
          />
        </div>

        <hr className="mb-4 -mx-4 border-slate-900" />

        {children}
      </div>
    </>
  );
}
