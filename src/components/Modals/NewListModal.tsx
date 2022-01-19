import { useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';

interface NewListModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const boxShadow = 'shadow-[4px_4px_4px_0_rgba(0,0,0,.25)]';

export function NewListModal({ isOpen, onRequestClose }: NewListModalProps) {
  const [preset, setPreset] = useState('');

  if (!isOpen) return null;

  return (
    <>
      <div
        data-testid="overlay"
        className="fixed top-0 right-0 w-full h-screen bg-slate-900 opacity-70"
        onClick={onRequestClose}
      />

      <div
        className={`absolute flex flex-col justify-between p-4 rounded-md top-0 right-0 bottom-0 left-0 w-full md:min-w-max md:w-9/12 lg:w-1/2 h-screen md:h-2/4 m-auto bg-slate-800 ${boxShadow}`}
      >
        <div className="flex items-center justify-between mb-4 text-heading">
          <span className="text-lg font-bold">Criar Lista</span>
          <FiX
            data-testid="close-icon"
            className="text-2xl transition cursor-pointer hover:brightness-90"
            onClick={onRequestClose}
          />
        </div>

        <hr className="mb-4 -mx-4 border-slate-900" />

        <div className="mb-2 text-sm font-bold text-body">
          Qual modelo de lista deseja utilizar?
        </div>
        <select
          value={preset}
          onChange={(e) => setPreset(e.target.value)}
          className="w-full h-8 px-2 mb-2 bg-gray-700 rounded-md outline-none text-body"
        >
          <option value="custom">Personalizado</option>
          <option value="movies">Filmes</option>
        </select>

        <div className="flex items-end justify-end gap-8 mt-auto mb-2">
          <button
            className="font-medium uppercase transition text-body hover:brightness-90"
            onClick={onRequestClose}
          >
            Cancelar
          </button>
          <button
            disabled={!preset}
            className="font-medium uppercase transition text-highlight hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:filter-none"
          >
            Próximo
          </button>
        </div>
      </div>
    </>
  );
}
