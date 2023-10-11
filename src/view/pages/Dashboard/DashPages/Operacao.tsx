import { OrdersCard } from '../components/OrdersCard';

export function Operacao() {
  return(
    <div className='flex justify-center w-full mt-10'>
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-16 justify-items-center'>
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
    </div>
  );
}
