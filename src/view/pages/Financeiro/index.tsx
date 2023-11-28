import { Controller } from 'react-hook-form';
import { OrderStatus, orderStatusConversion } from '../../../app/entities/Order';
import { cn } from '../../../app/utils/cn';
import { formatCurrency } from '../../../app/utils/formatCurrency';
import { formatDate } from '../../../app/utils/formatDate';
import { Spinner } from '../../components/Spinner';
import { DatePickerInput } from '../../components/DatePickerInput';
import { Button } from '../../components/Button';
import { useFinanceOrdersController } from './useFinanceOrdersController';
import { useEffect } from 'react';

export function Financeiro() {

  const {
    control,
    ordersFiltered,
    isLoading,
    errors,
    handleFilter,
  } = useFinanceOrdersController();

  useEffect(()=>{
    handleFilter();
  }, []);

  const ordersFinishedCancelled = ordersFiltered.filter( order => order.status == OrderStatus.FINISHED || order.status == OrderStatus.CANCELLED );

  const total = ordersFinishedCancelled.reduce((acc, curr) => {
    if(curr.status == OrderStatus.CANCELLED){
      return acc - Number(curr.total);
    } else {
      return acc + Number(curr.total);
    }
  }, 0);

  const hasOrders =  ordersFinishedCancelled.length > 0;

  return(
    <>
      {isLoading && (
        <div className='w-full h-full flex items-center justify-center translate-y-[-120px]'>
          <Spinner className='w-12 h-12 fill-red-500'/>
        </div>
      )}
      <form onSubmit={handleFilter} className='w-full flex items-center justify-center gap-3'>
        <Controller
          control={control}
          name="initialDate"
          defaultValue={new Date()}
          render={({ field: { value, onChange } }) => (
            <DatePickerInput
              label="Data Inicial"
              error={errors.initialDate?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="endDate"
          defaultValue={new Date()}
          render={({ field: { value, onChange } }) => (
            <DatePickerInput
              label="Data Final"
              error={errors.endDate?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Button type="submit" className="w-[100px]">
          Filtrar
        </Button>
      </form>
      <div className='flex items-center justify-center w-full mt-10'>
        {(hasOrders && !isLoading) && (
          <table className='border-2 border-white rounded-lg w-[90%] h-auto border-separate block'>
            <thead className='block w-full'>
              <tr className="text-amber-400 p-8 text-2xl font-bold w-full grid grid-cols-3 sm:grid-cols-4 justify-between gap-10">
                <th>Data</th>
                <th>Pedido</th>
                <th className='hidden sm:block'>Status</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody className='block w-full'>
              {ordersFinishedCancelled!.map( order => (
                <tr key={order.orderId} className="text-white px-8 py-2 text-base sm:text-lg w-full grid grid-cols-3 sm:grid-cols-4 justify-between gap-10 justify-items-center items-center">
                  <td>{formatDate(order.updated_at)}</td>
                  <td>{order.orderId}</td>
                  <td className={cn(order.status == OrderStatus.CANCELLED ? 'text-red-500' : 'text-green-500', 'hidden sm:block')}>{orderStatusConversion.find( status => status.orderStatusCancelEnum == order?.status)?.orderStatusPortugues}</td>
                  <td className={order.status == OrderStatus.CANCELLED ? 'text-red-500' : 'text-green-500'}>{formatCurrency(order.total)}</td>
                </tr>
              ))}
              <tr className='text-amber-400 p-8 text-base sm:text-lg sm:font-bold px-8 py-2 grid grid-cols-3 sm:grid-cols-4 justify-between gap-10 justify-items-center items-center'>
                <td className="col-start-2 sm:col-start-3">Total</td>
                <td className={cn(total < 0 ? 'text-red-500' : 'text-green-500', 'col-start-3 col-span-2 sm:col-start-4')}>{formatCurrency(total)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
