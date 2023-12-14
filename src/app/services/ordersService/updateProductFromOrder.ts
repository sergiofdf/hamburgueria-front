import { OrderProductUpdate } from '../../entities/OrderProduct';
import { httpClient } from '../httpClient';

type UpdateProductsFromOrderProps = Array<OrderProductUpdate>;

export async function updateProductFromOrder(productsData: UpdateProductsFromOrderProps) {
  return await httpClient.patch('/orders/updateProducts', productsData);
}
