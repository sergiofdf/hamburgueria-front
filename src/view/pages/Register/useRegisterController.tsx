import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SignupParams, authService } from '../../../app/services/authService';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';

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

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (params: SignupParams) => {
      return authService.signup(params);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (params) => {
    try {
      await mutateAsync(params);
      toast.success('Usuário cadastrado com sucesso.');
    } catch (error) {
      toast.error('Ocorreu um erro no registro do usuário.');
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
