import { useState } from 'react';
import { Modal } from '..';
import { useDebounce } from '../../../hooks/useDebounce';
import { Input } from '../../Forms/Input';

interface NewListItemProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewListItem({ isOpen, onRequestClose }: NewListItemProps) {
  const [name, setName] = useState('');

  const debouncedGetMovies = useDebounce(getMovies);

  async function handleSearch(search: string) {
    setName(search);

    if (search === '') return;

    debouncedGetMovies();
  }

  async function getMovies() {
    console.log('searched');
  }

  return (
    <Modal
      isOpen={isOpen}
      headline="Adicionar Item"
      onRequestClose={onRequestClose}
    >
      <Input
        label="Nome do filme"
        placeholder="Ex: Orgulho e Preconceito"
        autoComplete="off"
        value={name}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </Modal>
  );
}
