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
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  CANCELLED = 'CANCELLED',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_TRANSPORT = 'IN_TRANSPORT',
  FINISHED = 'FINISHED',
}


export const orderStatusConversion = [
  { orderStatusCancelEnum: OrderStatus.WAITING_EVALUATION, orderStatusPortugues: 'Em Análise'},
  { orderStatusCancelEnum: OrderStatus.WAITING_PAYMENT, orderStatusPortugues: 'Confirmando Pagamento'},
  { orderStatusCancelEnum: OrderStatus.CANCELLED, orderStatusPortugues: 'Cancelado'},
  { orderStatusCancelEnum: OrderStatus.IN_PROGRESS, orderStatusPortugues: 'Em Preparo'},
  { orderStatusCancelEnum: OrderStatus.IN_TRANSPORT, orderStatusPortugues: 'Em Transporte'},
  { orderStatusCancelEnum: OrderStatus.FINISHED, orderStatusPortugues: 'Finalizado'}
];
