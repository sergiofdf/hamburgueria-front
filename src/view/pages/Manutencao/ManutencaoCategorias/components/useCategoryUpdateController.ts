import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Category } from '../../../../../app/entities/Category';
import { categoriesService } from '../../../../../app/services/categoriesService';

const schema = z.object({
  name: z.string().min(1, 'O nome não pode ser vazio'),
});

type FormData = z.infer<typeof schema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCategoryUpdateController(category: Category | undefined, onClose: any) {

  useEffect(() => {
    reset(category);
  }, [category]);

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: category?.name,
    }
  });

  const queryClient = useQueryClient();
  const {
    isLoading,
    mutateAsync: updateCategory,
  } = useMutation(categoriesService.updateCategory);


  const handleSubmit = hookFormSubmit(async (data) => {
    try {

      await updateCategory({
        id: category!.categoryId,
        ...data,
      });

      await queryClient.invalidateQueries({ queryKey: ['listCategories'] });
      onClose();
      toast.success('O item foi editado com sucesso!');
    } catch {
      onClose();
      toast.error('Erro ao salvar as alterações!');
    }
  });

  return {
    handleSubmit,
    register,
    isLoading,
    errors,
  };

}
