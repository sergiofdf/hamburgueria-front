import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Order } from '../../../../../app/entities/Order';
import { ordersService } from '../../../../../app/services/ordersService';

const schema = z.object({
  quantity: z.coerce.number(),
  name: z.string().min(1, 'O nome do não pode ser vazio'),
  product_id: z.coerce.number(),
});

type FormData = z.infer<typeof schema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useOrderUpdateController(order: Order | undefined, onClose: any) {

  useEffect(() => {
    reset();
  }, [order]);

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: order?.orderProduct[0].quantity,
    }
  });

  const queryClient = useQueryClient();

  const {
    isLoading: addOrdersProductsLoading,
    mutateAsync: addProductsOrder,
  } = useMutation(ordersService.addProductsToOrder);

  const {
    isLoading: updateOrdersProductsLoading,
    mutateAsync: updateProductsOrder,
  } = useMutation(ordersService.updateProductFromOrder);

  const {
    isLoading: removeOrdersProductsLoading,
    mutateAsync: removeProductsOrder,
  } = useMutation(ordersService.removeProductFromOrder);


  const handleAdd = hookFormSubmit(async (data) => {
    try {

      await queryClient.invalidateQueries({ queryKey: ['listCategories'] });
      onClose();
      toast.success('O item foi editado com sucesso!');
    } catch {
      onClose();
      toast.error('Erro ao salvar as alterações!');
    }
  });

  function handleOrderProductRemotion(orderProductId: string) {
    console.log(orderProductId);
  }



  const handleSubmit = hookFormSubmit(async (data) => {
    try {

      await updateProductsOrder({
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
    addOrdersProductsLoading,
    updateOrdersProductsLoading,
    removeOrdersProductsLoading,
    errors,
    handleAdd,
    handleOrderProductRemotion
  };

}
