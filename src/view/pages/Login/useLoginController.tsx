import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { SigninParams, authService } from '../../../app/services/authService';
import toast from 'react-hot-toast';
import { useAuth } from '../../../app/hooks/useAuth';

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

  const { signIn } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (params) => {
    try {
      const { access_token } = await mutateAsync(params);

      signIn(access_token);

    } catch (error) {
      toast.error('Usuário/senha inválido.');
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
