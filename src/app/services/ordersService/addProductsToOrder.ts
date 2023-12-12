import { OrderProductCreation } from '../../entities/OrderProduct';
import { httpClient } from '../httpClient';

type AddProductsToOrderProps = Array<OrderProductCreation>;

export async function addProductsToOrder(orders: AddProductsToOrderProps) {
  return await httpClient.post('/orders/addProducts', orders);
}
