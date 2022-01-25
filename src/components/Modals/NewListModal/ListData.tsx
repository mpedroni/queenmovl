import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../../Forms/Input';

type FormInputs = {
  name: string;
};

export function ListData() {
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nome"
        placeholder="Ex: Filmes do oscar"
        {...register('name', {
          required: true,
          maxLength: 20,
        })}
      />
    </form>
  );
}
