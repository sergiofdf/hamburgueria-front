import { Order } from '../../entities/Order';
import { httpClient } from '../httpClient';

type OrderListResponse = Array<Order>;

export async function listOrders(initialDate?: string, finalDate?: string) {
  if( initialDate && finalDate){
    const { data } = await httpClient.get<OrderListResponse>(`/orders?initialDate=${initialDate}&finalDate=${finalDate}`);
    return data;
  } else{
    const { data } = await httpClient.get<OrderListResponse>('/orders');
    return data;
  }

}
