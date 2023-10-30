import { useEffect, useState } from 'react';
import { Order, OrderStatus } from '../../../../../app/entities/Order';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { OrdersCard } from '../../components/OrdersCard';
//import { useOperacaoController } from './useOperacaoController';
import { ordersService } from '../../../../../app/services/ordersService';

export function Operacao() {
  const [ orders, setOrders ] = useState<Order[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    // const {
    //   orders,
    //   isLoading
    // } = useOperacaoController();

    setIsLoading(true);
    ordersService.listOrders().then( (data) => {
      setOrders(data);
      setIsLoading(false);
    });
  }, []);

  function handleCancelOrder(orderId: number) {
    setOrders((prevState) => prevState.filter( order => order.orderId !== orderId));
  }

  const ordersEmAnalise = orders.filter( order => order.status == OrderStatus.WAITING_EVALUATION );

  const cardValuesEmAnalise =  ordersEmAnalise.map( order =>{
    return {
      id: order.orderId,
      value: formatCurrency(order.total)};});

  const hasOrders = orders.length > 0;

  return(
    <div className='flex justify-center w-full mt-10'>
      {(hasOrders && !isLoading) && (
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-16 justify-items-center'>
          <div>
            <OrdersCard
              ProgressText='Em análise'
              total={ordersEmAnalise.length}
              orders={[...cardValuesEmAnalise]}
              onCancelOrder={handleCancelOrder}
            />
          </div>
          <div>
            <OrdersCard
              ProgressText='Em análise'
              total={10}
              orders={[{id: 200100, value: 'R$50,00'}]}
              onCancelOrder={handleCancelOrder}
            />
          </div>
          <div>
            <OrdersCard
              ProgressText='Em análise'
              total={10}
              orders={[{id: 200100, value: 'R$50,00'}]}
              onCancelOrder={handleCancelOrder}
            />
          </div>
          <div>
            <OrdersCard
              ProgressText='Em análise'
              total={10}
              orders={[{id: 200100, value: 'R$50,00'}]}
              onCancelOrder={handleCancelOrder}
            />
          </div>
          <div>
            <OrdersCard
              ProgressText='Em análise'
              total={10}
              orders={[{id: 200100, value: 'R$50,00'}]}
              onCancelOrder={handleCancelOrder}
            />
          </div>
          <div>
            <OrdersCard
              ProgressText='Em análise'
              total={10}
              orders={[{id: 200100, value: 'R$50,00'}]}
              onCancelOrder={handleCancelOrder}
            />
          </div>
        </div>
      )}
    </div>
  );
}
