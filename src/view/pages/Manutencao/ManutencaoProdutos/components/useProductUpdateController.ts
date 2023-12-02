import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsService } from '../../../../../app/services/productsService';
import { Product } from '../../../../../app/entities/Product';

const schema = z.object({
  name: z.string().min(1, 'O nome não pode ser vazio'),
  description: z.string().min(1, 'A descrição não pode ser vazia'),
  size: z.string().min(1, 'A dimensão não pode ser vazia'),
  price: z.number().min(1, 'O valor não pode ser vazio'),
  imageUrl: z.string(),
  category_id: z.number().min(1, 'O id da categoria não pode ser vazio'),
});

type FormData = z.infer<typeof schema>;

export function useProductUpdateController(product: Product) {

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product.name,
    }
  });

  const queryClient = useQueryClient();
  const {
    isLoading,
    mutateAsync: updateProduct,
  } = useMutation(productsService.updateProduct);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateProduct({
        id: product.productId,
        ...data,
      });

      queryClient.invalidateQueries({ queryKey: ['listProducts'] });
      toast.success('O item foi editado com sucesso!');
    } catch {
      toast.error('Erro ao salvar as alterações!');
    }
  });

  return {
    handleSubmit,
    register,
    isLoading,
    errors,
    control
  };

}
