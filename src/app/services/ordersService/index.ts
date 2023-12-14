import { addProductsToOrder } from './addProductsToOrder';
import { cancelOrder } from './cancelOrder';
import { createOrder } from './createOrder';
import { findOneOrder } from './findOneOrder';
import { listOrders } from './listOrders';
import { removeOrder } from './removeOrder';
import { removeProductFromOrder } from './removeProductFromOrder';
import { updateOrderStatus } from './updateOrderStatus';
import { updateProductFromOrder } from './updateProductFromOrder';

export const ordersService = {
  listOrders,
  findOneOrder,
  updateOrderStatus,
  cancelOrder,
  createOrder,
  removeOrder,
  addProductsToOrder,
  removeProductFromOrder,
  updateProductFromOrder,
};
