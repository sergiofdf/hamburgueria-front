import { OrderProduct } from './OrderProduct';

export interface Order {
  orderId: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  user_id: string;
  orderProduct: OrderProduct[];
  total: number;
}

export enum OrderStatus {
  WAITING_EVALUATION = 'WAITING_EVALUATION',
  REPROVED = 'REPROVED',
  CANCELLED = 'CANCELLED',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_TRANSPORT = 'IN_TRANSPORT',
  FINISHED = 'FINISHED',
}
