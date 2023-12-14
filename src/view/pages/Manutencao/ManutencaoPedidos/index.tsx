import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Spinner } from '../../../components/Spinner';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { Button } from '../../../components/Button';
import { formatDate } from '../../../../app/utils/formatDate';
import { useManutencaoPedidosController } from './useManutencaoPedidosController';
import { formatCurrency } from '../../../../app/utils/formatCurrency';
import { AddOrderModal } from './components/AddOrderModal';
import { EditOrderModal } from './components/EditOrderModal';

export function ManutencaoPedidos() {
  const {
    orders,
    isLoading,
    handleOpenAddModal,
    handleCloseAddModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenConfirmationModal,
    handleCloseDeleteModal,
    orderEditing,
    itemId,
    itemName,
    isAddModalVisible,
    isEditModalVisible,
    isDeleteModalVisible
  } = useManutencaoPedidosController();

  const hasOrders = orders.length > 0;

  return(
    <>
      <AddOrderModal visible={isAddModalVisible} onClose={handleCloseAddModal} />
      <EditOrderModal visible={isEditModalVisible} order={orderEditing} onClose={handleCloseEditModal} />
      <ConfirmationModal visible={isDeleteModalVisible} itemId={itemId} itemName={itemName} onClose={handleCloseDeleteModal} />
      {isLoading && (
        <div className='w-full h-full flex items-center justify-center translate-y-[-120px]'>
          <Spinner className='w-12 h-12 fill-red-500'/>
        </div>
      )}
      {(!isLoading) && (

        <div className='flex flex-col items-center'>
          <Button onClick={handleOpenAddModal} className='w-[120px]'>+ Adicionar</Button>
          <div className='flex items-center justify-center w-full mt-10'>
            {(hasOrders && !isLoading) && (
              <table className='border-2 border-white rounded-lg w-[90%] h-auto border-separate block'>
                <thead className='block w-full'>
                  <tr className="text-amber-400 p-2 md:p-8 text-2xl font-bold w-full grid grid-cols-4 md:grid-cols-8 justify-between gap-10 text-center">
                    <th>Id</th>
                    <th>Status</th>
                    <th className='hidden md:block'>Data criação</th>
                    <th className='hidden md:block'>Data atualização</th>
                    <th className='hidden md:block'>Cliente</th>
                    <th className='hidden md:block'>Produtos</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody className='block w-full'>
                  {orders.map( order => (
                    <tr key={order.orderId} className="text-white p-2 md:p-8 text-base w-full grid grid-cols-4 md:grid-cols-8 justify-between gap-10 justify-items-center items-center text-center">
                      <td>{order.orderId}</td>
                      <td>{order.status}</td>
                      <td className='hidden md:block'>{formatDate(order.created_at)}</td>
                      <td className='hidden md:block'>{formatDate(order.updated_at)}</td>
                      <td className='hidden md:block'>{order.user_id}</td>
                      <td className='hidden md:block'>Produtos</td>
                      <td>{formatCurrency(order.total)}</td>
                      <td className='flex gap-2 md:gap-4'>
                        <button
                          className='text-amber-400 hover:text-amber-300 transition-all'
                          onClick={() => handleOpenEditModal(order)}
                        >
                          <Pencil1Icon className='h-5 w-5 md:h-8 md:w-8'/>
                        </button>
                        <button
                          className='text-red-500 hover:text-red-300 transition-all'
                          onClick={() => handleOpenConfirmationModal(order.orderId, order.status.toString())}
                        >
                          <TrashIcon className='h-5 w-5 md:h-8 md:w-8' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
}
