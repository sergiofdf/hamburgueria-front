import { OrderProductRemotion } from '../../entities/OrderProduct';
import { httpClient } from '../httpClient';

type RemoveProductsFromOrderProps = Array<OrderProductRemotion>;

export async function removeProductFromOrder(productsOrderIds: RemoveProductsFromOrderProps) {
  return await httpClient.post('/orders/removeProducts', productsOrderIds);
}
