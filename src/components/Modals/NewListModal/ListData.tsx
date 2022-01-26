import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../../Forms/Input';

type FormInputs = {
  name: string;
};

interface ListDataProps {
  onCancel: () => void;
  onConfirm: (data: FormInputs) => void;
}

export function ListData({ onCancel, onConfirm }: ListDataProps) {
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data, event) => {
    event?.preventDefault();

    console.log(data);
    onConfirm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      <Input
        label="Nome"
        placeholder="Ex: Filmes do oscar"
        {...register('name', {
          required: true,
          maxLength: 20,
        })}
      />

      <div className="flex items-end justify-end gap-8 mt-auto mb-2">
        <button
          className="font-medium uppercase transition text-body hover:brightness-90"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="font-medium uppercase transition text-highlight hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:filter-none"
        >
          Confirmar
        </button>
      </div>
    </form>
  );
}
