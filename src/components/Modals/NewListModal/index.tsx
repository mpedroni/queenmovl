import { toast } from 'react-toastify';
import { Modal } from '..';

import { useLists } from '../../../contexts/ListsContext';

import { ListData } from './ListData';

interface NewListModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewListModal({ isOpen, onRequestClose }: NewListModalProps) {
  const { createList, error } = useLists();

  if (!isOpen) return null;

  if (error) {
    toast.error(error.message, {
      toastId: 'new-list-error-toast',
    });
  }

  async function handleListCreate(listParams: any) {
    const list = await createList(listParams);

    if (!list) return;

    toast.success('Lista criada com sucesso');
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      headline="Criar Lista (Filmes)"
    >
      {/* TODO: Implement `Books` and `Custom` list presets */}
      {/* {step === 'preset' && (
          <SelectListPreset
            presets={presets}
            onSelectPreset={handlePresetSelect}
            onCancel={onRequestClose}
            onConfirm={() => setStep('data')}
          />
        )} */}

      <ListData onCancel={onRequestClose} onConfirm={handleListCreate} />
    </Modal>
  );
}
