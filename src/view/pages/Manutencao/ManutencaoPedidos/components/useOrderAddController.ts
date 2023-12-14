import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService } from '../../../../../app/services/ordersService';

const schema = z.object({
  quantity: z.coerce.number(),
  product_id: z.coerce.number(),
  user_id: z.string().min(1, 'O usuário não pode ser vazio'),
});

type FormData = z.infer<typeof schema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useOrderAddController(onClose: any) {

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
    mutateAsync: createOrder,
  } = useMutation(ordersService.createOrder);

  const {
    isLoading: isLoadingProductInOrder,
    mutateAsync: addOrderProducts,
  } = useMutation(ordersService.addProductsToOrder);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {

      const createdOrder = await createOrder({
        user_id: data.user_id,
      });

      await addOrderProducts(
        [
          {
            quantity: data.quantity,
            order_id: createdOrder.orderId,
            product_id: data.product_id
          }
        ]
      );

      await queryClient.invalidateQueries({ queryKey: ['ordersList'] });
      reset();
      onClose();
      toast.success('Pedido cadastrado com sucesso!');
    } catch {
      onClose();
      toast.error('Erro ao cadastrar o pedido!');
    }
  });

  return {
    handleSubmit,
    register,
    isLoading,
    isLoadingProductInOrder,
    errors,
  };

}
