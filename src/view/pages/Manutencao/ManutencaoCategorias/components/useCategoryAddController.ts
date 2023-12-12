import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesService } from '../../../../../app/services/categoriesService';

const schema = z.object({
  name: z.string().min(1, 'O nome não pode ser vazio'),
});

type FormData = z.infer<typeof schema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCategoryAddController(onClose: any) {

  const {
    register,
    reset,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const {
    isLoading,
    mutateAsync: createCategory,
  } = useMutation(categoriesService.createCategory);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {

      await createCategory({
        ...data,
      });

      await queryClient.invalidateQueries({ queryKey: ['listCategories'] });
      reset();
      onClose();
      toast.success('O item foi cadastrado com sucesso!');
    } catch {
      onClose();
      toast.error('Erro ao cadastrar o item!');
    }
  });

  return {
    handleSubmit,
    register,
    isLoading,
    errors,
  };

}
