import { cancelOrder } from './cancelOrder';
import { findOneOrder } from './findOneOrder';
import { listOrders } from './listOrders';
import { updateOrderStatus } from './updateOrderStatus';

export const ordersService = {
  listOrders,
  findOneOrder,
  updateOrderStatus,
  cancelOrder
};
