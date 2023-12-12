import { Category } from './Category';

export interface OrderProduct {
  orderProductId: string;
  quantity: number;
  product: {
    productId: number;
    name: string;
    price: number;
    category: Category;
  }
  finished?: boolean;
}


export interface OrderProductCreation {
  order_id: number;
  quantity: number;
  product_id: number;
}
