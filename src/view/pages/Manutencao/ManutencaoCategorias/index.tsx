import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Spinner } from '../../../components/Spinner';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { Button } from '../../../components/Button';
import { useManutencaoCategoriasController } from './useManutencaoCategoriasController';
import { formatDate } from '../../../../app/utils/formatDate';
import { AddCategoryModal } from './components/AddCategoryModal';
import { EditCategoryModal } from './components/EditCategoryModal';

export function ManutencaoCategorias() {
  const {
    categories,
    isLoading,
    handleOpenAddModal,
    handleCloseAddModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenConfirmationModal,
    handleCloseDeleteModal,
    categoryEditing,
    itemId,
    itemName,
    isAddModalVisible,
    isEditModalVisible,
    isDeleteModalVisible
  } = useManutencaoCategoriasController();

  const hasCategories = categories.length > 0;

  return(
    <>
      <AddCategoryModal visible={isAddModalVisible} onClose={handleCloseAddModal} />
      <EditCategoryModal visible={isEditModalVisible} category={categoryEditing} onClose={handleCloseEditModal} />
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
            {(hasCategories && !isLoading) && (
              <table className='border-2 border-white rounded-lg w-[90%] h-auto border-separate block'>
                <thead className='block w-full'>
                  <tr className="text-amber-400 p-2 md:p-8 text-2xl font-bold w-full grid grid-cols-3 md:grid-cols-5 justify-between gap-10 text-center">
                    <th>Id</th>
                    <th>Nome</th>
                    <th className='hidden md:block'>Data criação</th>
                    <th className='hidden md:block'>Data atualização</th>
                  </tr>
                </thead>
                <tbody className='block w-full'>
                  {categories.map( category => (
                    <tr key={category.categoryId} className="text-white p-2 md:p-8 text-base w-full grid grid-cols-3 md:grid-cols-5 justify-between gap-10 justify-items-center items-center text-center">
                      <td>{category.categoryId}</td>
                      <td>{category.name}</td>
                      <td className='hidden md:block'>{formatDate(category.created_at)}</td>
                      <td className='hidden md:block'>{formatDate(category.updated_at)}</td>
                      <td className='flex gap-2 md:gap-4'>
                        <button
                          className='text-amber-400 hover:text-amber-300 transition-all'
                          onClick={() => handleOpenEditModal(category)}
                        >
                          <Pencil1Icon className='h-5 w-5 md:h-8 md:w-8'/>
                        </button>
                        <button
                          className='text-red-500 hover:text-red-300 transition-all'
                          onClick={() => handleOpenConfirmationModal(category.categoryId, category.name)}
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
