import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { OrderModal } from './OrderModal';
import { useState } from 'react';
interface OrdersCardProps{
  ProgressText: string;
  total : number;
  orders: {
    id: number;
    value: string;
  }[];
}

export function OrdersCard( {ProgressText, total, orders} : OrdersCardProps) {

  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ modalData, setModalData ] = useState<number | undefined>(undefined);

  async function handleOpenModal(id: number) {
    setModalData(id);
    setIsModalVisible(true);
  }

  return(
    <div className="border-2 border-white rounded-lg py-5 w-[300px] sm:w-[420px] 2xl:w-[490px]">
      <OrderModal visible={isModalVisible} orderId={modalData}/>
      <header className="flex justify-between items-center text-amber-400 px-4 text-2xl font-bold">
        <p>{ProgressText}</p>
        <p>Total: <span>{total}</span></p>
      </header>
      <table className="text-white text-lg px-6 w-full">
        <thead className="w-full">
          <tr className="flex justify-between text-center">
            <th className="w-[100px]"># </th>
            <th className="w-[100px]">Valor</th>
            <th className="w-[100px]">Detalhes</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {orders.map(order => (
            <tr className="flex justify-between text-center" key={order.id}>
              <td className="w-[100px]">{order.id}</td>
              <td className="w-[100px]">{order.value}</td>
              <td className="w-[100px] flex justify-center">
                <button onClick={() => handleOpenModal(order.id)}>
                  <MagnifyingGlassIcon className='h-6 w-6 hover:cursor-pointer bg-green-500 rounded-sm'/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
