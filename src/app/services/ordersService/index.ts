import { addProductsToOrder } from './addProductsToOrder';
import { cancelOrder } from './cancelOrder';
import { createOrder } from './createOrder';
import { findOneOrder } from './findOneOrder';
import { listOrders } from './listOrders';
import { updateOrderStatus } from './updateOrderStatus';

export const ordersService = {
  listOrders,
  findOneOrder,
  updateOrderStatus,
  cancelOrder,
  createOrder,
  addProductsToOrder
};
