import { cancelOrder } from './cancelOrder';
import { findOneOrder } from './findOneOrder';
import { listOrders } from './listOrders';

export const ordersService = {
  listOrders,
  findOneOrder,
  cancelOrder
};
