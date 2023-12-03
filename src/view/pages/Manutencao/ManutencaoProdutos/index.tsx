import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Spinner } from '../../../components/Spinner';
import { formatCurrency } from '../../../../app/utils/formatCurrency';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { EditProductModal } from './components/EditProductModal';
import { useManutencaoProdutosController } from './useManutencaoProdutosController';

export function ManutencaoProdutos() {

  const {
    products,
    isLoading,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenConfirmationModal,
    handleCloseDeleteModal,
    productEditing,
    itemId,
    itemName,
    isEditModalVisible,
    isDeleteModalVisible
  } = useManutencaoProdutosController();

  const hasProducts = products.length > 0;

  return(
    <>
      <EditProductModal visible={isEditModalVisible} product={productEditing} onClose={handleCloseEditModal} />
      <ConfirmationModal visible={isDeleteModalVisible} itemId={itemId} itemName={itemName} onClose={handleCloseDeleteModal} />
      {isLoading && (
        <div className='w-full h-full flex items-center justify-center translate-y-[-120px]'>
          <Spinner className='w-12 h-12 fill-red-500'/>
        </div>
      )}
      {(!isLoading) && (
        <div className='flex items-center justify-center w-full mt-10'>
          {(hasProducts && !isLoading) && (
            <table className='border-2 border-white rounded-lg w-[90%] h-auto border-separate block'>
              <thead className='block w-full'>
                <tr className="text-amber-400 md:p-8 p-2 md:text-2xl text-base font-bold w-full grid grid-cols-4 md:grid-cols-7 justify-between gap-10 text-center">
                  <th>Nome</th>
                  <th className='hidden md:block'>Descrição</th>
                  <th className='hidden md:block'>Dimensão</th>
                  <th>Valor</th>
                  <th className='hidden md:block'>Categoria</th>
                  <th>Imagem</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody className='block w-full'>
                {products.map( product => (
                  <tr key={product.productId} className="text-white md:p-8 p-2 md:text-base text-md w-full grid grid-cols-4 md:grid-cols-7 justify-between gap-10 justify-items-center items-center text-center">
                    <td>{product.name}</td>
                    <td className='hidden md:block'>{product.description}</td>
                    <td className='hidden md:block'>{product.size}</td>
                    <td>{formatCurrency(product.price)}</td>
                    <td className='hidden md:block'>{product.category_id}</td>
                    <td><img src={`http://localhost:3000/products/getImage/${product.productId}`} alt={product.name} width="24px"/></td>
                    <td className='flex gap-2 md:gap-4'>
                      <button
                        className='text-amber-400 hover:text-amber-300 transition-all'
                        onClick={() => handleOpenEditModal(product)}
                      >
                        <Pencil1Icon className='h-5 w-5 md:h-8 md:w-8'/>
                      </button>

                      <button
                        className='text-red-500 hover:text-red-300 transition-all'
                        onClick={() => handleOpenConfirmationModal(product.productId, product.name)}
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
      )}
    </>
  );
}
