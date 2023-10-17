export interface OrderProduct {
  orderProductId: string;
  quantity: number;
  product: {
    productId: number;
    name: string;
    price: number;
  }
}
