import { Products } from "../endpoints/endpoints";

export interface Order {
  id: number;
  shippingAddress: string;
  userId: number;
  status: string; 
  categoryId:number;
  productIds:number[];
  inStock: boolean;
  totalAmount: number;
  totalNoOfStock:number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}
export interface ProductQuantityItem {
  product_id: number;
  quantity: number;
}

export interface CreateOrderPayload {
  productQuantity: ProductQuantityItem[];
  products: Products[];
  createdBy?: number;
  address:string;
  notes:string
}

export interface OrderDetails {
 shippingAddress: string;
  userId: number;
  status: string; 
  categoryId:number;
  productIds:number[];
  inStock: boolean;
  totalAmount: number;
  totalNoOfStock:number;
  notes: string;
  createdBy: {
    id:number
  };
  updatedBy: {
    id:number
  };
}

export interface UpdateOrderPayload {
 shippingAddress: string;
  userId: number;
  status: string; 
  categoryId:number;
  productIds:number[];
  inStock: boolean;
  totalAmount: number;
  totalNoOfStock:number;
  notes: string;
  updatedBy?: number;
}
export interface OrderSubscribe {
  email: string;
}
