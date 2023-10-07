import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authService } from '../../../app/services/authService';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('Informa um e-mail válido'),
  password: z.string().min(1, 'Senha é obrigatória'),
  phone_number: z.string().min(10, 'Digite um número valido com DDD'),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const responseData = await authService.signup(data);
    console.log(responseData);
  });

  return { handleSubmit, register, errors };
}
