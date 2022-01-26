import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../../Forms/Input';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const listSchema = yup
  .object({
    name: yup
      .string()
      .max(50, 'O nome da sua lista pode ter no máximo 50 caracteres')
      .required('Sua lista precisa de um nome'),
  })
  .required();

type FormInputs = {
  name: string;
};

interface ListDataProps {
  onCancel: () => void;
  onConfirm: (data: FormInputs) => void;
}

export function ListData({ onCancel, onConfirm }: ListDataProps) {
  const { register, handleSubmit, formState } = useForm<FormInputs>({
    resolver: yupResolver(listSchema),
    defaultValues: {
      name: '',
    },
  });

  const { errors } = formState;
  const hasInvalidInputs = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<FormInputs> = (data, event) => {
    event?.preventDefault();

    onConfirm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      <Input
        label="Nome"
        placeholder="Ex: Filmes do oscar"
        autoComplete="off"
        {...register('name', {
          required: true,
          maxLength: 20,
        })}
        error={errors.name?.message}
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
          disabled={hasInvalidInputs}
          className="font-medium uppercase transition text-highlight hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:filter-none"
        >
          Confirmar
        </button>
      </div>
    </form>
  );
}
