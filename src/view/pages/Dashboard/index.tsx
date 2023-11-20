import { OrderStatus } from '../../../app/entities/Order';
import { formatCurrency } from '../../../app/utils/formatCurrency';
import { Spinner } from '../../components/Spinner';
import { OrdersCard } from './components/OrdersCard';
import { useOperacaoController } from './useOperacaoController';

export function Operacao() {

  const { orders, isLoading } = useOperacaoController();

  const ordersEmAnalise = orders.filter( order => order.status == OrderStatus.WAITING_EVALUATION );
  const ordersEmPreparo = orders.filter( order => order.status == OrderStatus.IN_PROGRESS );
  const ordersEmTransporte = orders.filter( order => order.status == OrderStatus.IN_TRANSPORT );
  const ordersConfPagto = orders.filter( order => order.status == OrderStatus.WAITING_PAYMENT );
  const ordersFinalizados = orders.filter( order => order.status == OrderStatus.FINISHED );
  const ordersCancelados = orders.filter( order => order.status == OrderStatus.CANCELLED );


  const cardValuesEmAnalise =  ordersEmAnalise.map( order =>{
    return {
      id: order.orderId,
      value: formatCurrency(order.total)};});

  const cardValuesEmPreparo=  ordersEmPreparo.map( order =>{
    return {
      id: order.orderId,
      value: formatCurrency(order.total)};});

  const cardValuesEmTransporte=  ordersEmTransporte.map( order =>{
    return {
      id: order.orderId,
      value: formatCurrency(order.total)};});

  const cardValuesConfPagto=  ordersConfPagto.map( order =>{
    return {
      id: order.orderId,
      value: formatCurrency(order.total)};});

  const cardValuesFinalizados=  ordersFinalizados.map( order =>{
    return {
      id: order.orderId,
      value: formatCurrency(order.total)};});

  const cardValuesCancelados=  ordersCancelados.map( order =>{
    return {
      id: order.orderId,
      value: formatCurrency(order.total)};});

  const hasOrders = orders.length > 0;

  return(
    <>
      {isLoading && (
        <div className='w-full h-full flex items-center justify-center translate-y-[-120px]'>
          <Spinner className='w-12 h-12 fill-red-500'/>
        </div>
      )}
      <div className='flex justify-center w-full mt-10'>
        {(hasOrders && !isLoading) && (
          <div className='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-16 justify-items-center'>
            <div>
              <OrdersCard
                ProgressText='Em Análise'
                total={ordersEmAnalise.length}
                orders={[...cardValuesEmAnalise]} />
            </div>
            <div>
              <OrdersCard
                ProgressText='Em Preparo'
                total={ordersEmPreparo.length}
                orders={[...cardValuesEmPreparo]} />
            </div>
            <div>
              <OrdersCard
                ProgressText='Em Transporte'
                total={ordersEmTransporte.length}
                orders={[...cardValuesEmTransporte]} />
            </div>
            <div>
              <OrdersCard
                ProgressText='Confirmação Pagamento'
                total={ordersConfPagto.length}
                orders={[...cardValuesConfPagto]} />
            </div>
            <div>
              <OrdersCard
                ProgressText='Finalizados'
                total={ordersFinalizados.length}
                orders={[...cardValuesFinalizados]} />
            </div>
            <div>
              <OrdersCard
                ProgressText='Cancelados'
                total={ordersCancelados.length}
                orders={[...cardValuesCancelados]} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
