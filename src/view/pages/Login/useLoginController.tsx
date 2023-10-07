import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { httpClient } from '../../../app/services/httpClient';

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Informa um e-mail válido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await httpClient.post('/login', data);
  });

  return { handleSubmit, register, errors };
}
