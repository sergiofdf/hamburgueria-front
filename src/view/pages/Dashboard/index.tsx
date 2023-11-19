import { OrderStatus } from '../../../app/entities/Order';
import { formatCurrency } from '../../../app/utils/formatCurrency';
import { OrdersCard } from './components/OrdersCard';
import { useOperacaoController } from './useOperacaoController';

export function Operacao() {

  const { orders, isLoading } = useOperacaoController();

  const ordersEmAnalise = orders.filter( order => order.status == OrderStatus.WAITING_EVALUATION );
  const ordersEmPreparo = orders.filter( order => order.status == OrderStatus.IN_PROGRESS );


  const cardValuesEmAnalise =  ordersEmAnalise.map( order =>{
    return {
      id: order.orderId,
      value: formatCurrency(order.total)};});

  const cardValuesEmPreparo=  ordersEmPreparo.map( order =>{
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
            />
          </div>
          <div>
            <OrdersCard
              ProgressText='Em preparo'
              total={ordersEmPreparo.length}
              orders={[...cardValuesEmPreparo]}
            />
          </div>
          <div>
            <OrdersCard
              ProgressText='Em análise'
              total={10}
              orders={[{id: 200100, value: 'R$50,00'}]}
            />
          </div>
          <div>
            <OrdersCard
              ProgressText='Em análise'
              total={10}
              orders={[{id: 200100, value: 'R$50,00'}]}
            />
          </div>
          <div>
            <OrdersCard
              ProgressText='Em análise'
              total={10}
              orders={[{id: 200100, value: 'R$50,00'}]}
            />
          </div>
          <div>
            <OrdersCard
              ProgressText='Em análise'
              total={10}
              orders={[{id: 200100, value: 'R$50,00'}]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
