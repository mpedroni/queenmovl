import { FiChevronDown, FiX } from 'react-icons/fi';

interface NewListModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const boxShadow = 'shadow-[4px_4px_4px_0_rgba(0,0,0,.25)]';

export function NewListModal({ isOpen, onRequestClose }: NewListModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="h-screen fixed top-0 right-0 bg-slate-900 opacity-70 w-full"
        onClick={onRequestClose}
      />

      <div
        className={`absolute flex flex-col justify-between p-4 rounded-md top-0 right-0 bottom-0 left-0 w-full md:min-w-max md:w-9/12 lg:w-1/2 h-screen md:h-2/4 m-auto bg-slate-800 ${boxShadow}`}
      >
        <div className="flex justify-between items-center text-heading mb-4">
          <span className="text-lg font-bold">Criar Lista</span>
          <FiX
            className="text-2xl cursor-pointer hover:brightness-90 transition"
            onClick={onRequestClose}
          />
        </div>

        <hr className="-mx-4 border-slate-900 mb-4" />

        <div className="text-body font-bold text-sm mb-2">
          Qual modelo de lista deseja utilizar?
        </div>
        <select className="h-8 w-full rounded-md px-2 mb-2 text-body bg-gray-700 outline-none" />

        <div className="flex justify-end gap-8 mt-auto items-end mb-2">
          <button
            className="font-medium uppercase text-body hover:brightness-90 transition"
            onClick={onRequestClose}
          >
            Cancelar
          </button>
          <button className="font-medium uppercase text-highlight hover:brightness-90 transition">
            Próximo
          </button>
        </div>
      </div>
    </>
  );
}
