import { useState } from 'react';
import { useOrders } from '../../../../app/hooks/useOrders';
import { Order } from '../../../../app/entities/Order';

export function useManutencaoPedidosController() {

  const { orders, isFetching: isLoading } = useOrders();

  const [ orderEditing, setOrderEditing ] = useState<Order | undefined>(undefined);
  const [ itemId, setItemId ] = useState<number | undefined>(undefined);
  const [ itemName, setItemName ] = useState<string | undefined>(undefined);
  const [ isAddModalVisible, setIsAddModalVisible ] = useState(false);
  const [ isEditModalVisible, setIsEditModalVisible ] = useState(false);
  const [ isDeleteModalVisible, setIsDeleteModalVisible ] = useState(false);

  function handleOpenAddModal() {
    setOrderEditing(undefined);
    setIsAddModalVisible(true);
  }

  function handleCloseAddModal() {
    setOrderEditing(undefined);
    setIsAddModalVisible(false);
  }

  function handleOpenEditModal(item: Order) {
    setOrderEditing(item);
    setIsEditModalVisible(true);
  }

  function handleCloseEditModal() {
    setOrderEditing(undefined);
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
  };
}
