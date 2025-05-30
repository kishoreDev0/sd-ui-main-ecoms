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
export interface CreateOrderPayload {
shippingAddress: string;
  userId: number;
  status: string; 
  categoryId:number;
  productIds:number[];
  inStock: boolean;
  totalAmount: number;
  totalNoOfStock:number;
  notes: string;
  createdBy?: number;
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
