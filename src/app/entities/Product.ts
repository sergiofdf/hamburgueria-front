export interface Product {
  productId: number;
  name: string;
  description: string;
  size: string;
  price: number;
  imageUrl?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
  category_id?: number;
}
