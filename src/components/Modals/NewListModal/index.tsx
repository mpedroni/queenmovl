import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { SelectListPreset } from './SelectListPreset';

import { api } from '../../../services/api';
import { ListData } from './ListData';

interface NewListModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

type ListPreset = {
  id: number;
  name: string;
};

type List = {
  preset?: ListPreset;
};

type ListCreateParams = {
  name: string;
};

const boxShadow = 'shadow-[4px_4px_4px_0_rgba(0,0,0,.25)]';

export function NewListModal({ isOpen, onRequestClose }: NewListModalProps) {
  const [list, setList] = useState<List>({} as List);
  const [step, setStep] = useState<'preset' | 'data'>('preset');
  const [presets, setPresets] = useState<ListPreset[]>([] as ListPreset[]);

  async function fetchListPresets() {
    try {
      const response = await api.get('/lists/presets');

      setPresets(response.data.presets);
    } catch {
      toast.error('Ops! Não foi possível carregar os presets de listas');
    }
  }

  function handlePresetSelect(presetId: string) {
    const preset = presets.find((preset) => preset.id === Number(presetId));
    setList({ ...list, preset });
  }

  function createList(listData: ListCreateParams) {
    console.log(listData);
  }

  useEffect(() => {
    isOpen && fetchListPresets();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        data-testid="overlay"
        className="fixed top-0 right-0 w-full h-screen bg-slate-900 opacity-70"
        onClick={onRequestClose}
      />

      <div
        className={`absolute flex flex-col p-4 rounded-md top-0 right-0 bottom-0 left-0 w-full md:min-w-max md:w-9/12 lg:w-1/2 h-screen md:h-2/4 m-auto bg-slate-800 ${boxShadow}`}
      >
        <div>
          <div className="flex items-center justify-between mb-4 text-heading">
            <span className="text-lg font-bold">
              Criar Lista ({step === 'data' && list.preset?.name})
            </span>
            <FiX
              data-testid="close-icon"
              className="text-2xl transition cursor-pointer hover:brightness-90"
              onClick={onRequestClose}
            />
          </div>
          <hr className="mb-4 -mx-4 border-slate-900" />
        </div>

        {step === 'preset' && (
          <SelectListPreset
            presets={presets}
            onSelectPreset={handlePresetSelect}
            onCancel={onRequestClose}
            onConfirm={() => setStep('data')}
          />
        )}

        {step === 'data' && (
          <ListData onCancel={onRequestClose} onConfirm={createList} />
        )}
      </div>
    </>
  );
}
