import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsService } from '../../../../../app/services/productsService';

const schema = z.object({
  name: z.string().min(1, 'O nome não pode ser vazio'),
  description: z.string().min(1, 'A descrição não pode ser vazia'),
  size: z.string().min(1, 'A dimensão não pode ser vazia'),
  price: z.coerce.number().min(1, 'O preço deve ser informado.'),
  category_id: z.coerce.number().min(1, 'A categoria deve ser informada.'),
  imageUrl: z.string(),
});

type FormData = z.infer<typeof schema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useProductAddController(onClose: any) {

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
    mutateAsync: createProduct,
  } = useMutation(productsService.createProduct);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {

      await createProduct({
        ...data,
      });

      queryClient.invalidateQueries({ queryKey: ['listProducts'] });
      reset();
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
