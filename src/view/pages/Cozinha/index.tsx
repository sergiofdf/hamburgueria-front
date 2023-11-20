import { OrderStatus } from '../../../app/entities/Order';
import { Spinner } from '../../components/Spinner';
import { useOperacaoController } from '../Dashboard/useOperacaoController';
import { OrderDetail } from './components/OrderDetail';

export function Cozinha() {

  const { orders, isLoading } = useOperacaoController();

  const ordersEmPreparo = orders.filter( order => order.status == OrderStatus.IN_PROGRESS );

  const hasOrders = ordersEmPreparo.length > 0;

  return(
    <>
      {isLoading && (
        <div className='w-full h-full flex items-center justify-center translate-y-[-120px]'>
          <Spinner className='w-12 h-12 fill-red-500'/>
        </div>
      )}
      <div className='flex justify-center w-full mt-10'>
        {(hasOrders && !isLoading) && (
          <div className='w-full grid grid-cols-1 xl:grid-cols-2 gap-y-16 justify-items-center'>
            {ordersEmPreparo.map(order => (
              <OrderDetail key={order.orderId} order={order}/>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
