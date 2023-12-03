import { useState } from 'react';
import { Product } from '../../../../app/entities/Product';
import { useProducts } from '../../../../app/hooks/useProducts';

export function useManutencaoProdutosController() {

  const { products, isFetching: isLoading } = useProducts();

  const [ productEditing, setProductEditing ] = useState<Product | undefined>(undefined);
  const [ itemId, setItemId ] = useState<number | undefined>(undefined);
  const [ itemName, setItemName ] = useState<string | undefined>(undefined);
  const [ isEditModalVisible, setIsEditModalVisible ] = useState(false);
  const [ isDeleteModalVisible, setIsDeleteModalVisible ] = useState(false);

  function handleOpenEditModal(item: Product) {
    setProductEditing(item);
    setIsEditModalVisible(true);
  }

  function handleCloseEditModal() {
    setIsEditModalVisible(false);
  }

  function handleOpenConfirmationModal(id: number, itemName: string) {
    setItemId(id);
    setItemName(itemName);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  return {
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
  };
}
