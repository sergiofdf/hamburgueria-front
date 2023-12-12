import { useState } from 'react';
import { useCategories } from '../../../../app/hooks/useCategories';
import { Category } from '../../../../app/entities/Category';

export function useManutencaoCategoriasController() {

  const { categories, isFetching: isLoading } = useCategories();

  const [ categoryEditing, setCategoryEditing ] = useState<Category | undefined>(undefined);
  const [ itemId, setItemId ] = useState<number | undefined>(undefined);
  const [ itemName, setItemName ] = useState<string | undefined>(undefined);
  const [ isAddModalVisible, setIsAddModalVisible ] = useState(false);
  const [ isEditModalVisible, setIsEditModalVisible ] = useState(false);
  const [ isDeleteModalVisible, setIsDeleteModalVisible ] = useState(false);

  function handleOpenAddModal() {
    setCategoryEditing(undefined);
    setIsAddModalVisible(true);
  }

  function handleCloseAddModal() {
    setCategoryEditing(undefined);
    setIsAddModalVisible(false);
  }

  function handleOpenEditModal(item: Category) {
    setCategoryEditing(item);
    setIsEditModalVisible(true);
  }

  function handleCloseEditModal() {
    setCategoryEditing(undefined);
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
  };
}
