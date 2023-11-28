import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { ordersService } from '../../../app/services/ordersService';
import { useState } from 'react';
import { Order } from '../../../app/entities/Order';

const schema = z.object({
  initialDate: z.date(),
  endDate: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useFinanceOrdersController() {

  const [ ordersFiltered, setOrdersFiltered ] = useState<Order[] | []>([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const today = new Date();
  const currentMonth= today.getMonth();
  const currentYear = today.getFullYear();

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialDate: new Date(currentYear, currentMonth, 1),
      endDate:  new Date(),
    },
  });

  const handleFilter = hookFormSubmit(async(data) => {
    try {
      setIsLoading(true);
      const initialDateString = data.initialDate?.toISOString().slice(0,10);
      const finalDateString = data.endDate?.toISOString().slice(0,10);
      const orders = await ordersService.listOrders(initialDateString, finalDateString);
      setOrdersFiltered(orders);
      setIsLoading(false);
    } catch(ex) {
      console.log(ex);
      toast.error('Erro ao aplicar filtro de datas.');
    }
  });

  return {
    handleFilter,
    ordersFiltered,
    isLoading,
    errors,
    control
  };

}
