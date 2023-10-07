import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from 'react-query';
import { SigninParams, authService } from '../../../app/services/authService';
import toast from 'react-hot-toast';

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

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (params: SigninParams) => {
      return authService.signin(params);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (params) => {
    try {
      await mutateAsync(params);
    } catch (error) {
      toast.error('Usuário/senha inválido.');
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
