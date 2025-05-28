export interface Cart {
  user: any;
  id: number;
  userId:number;
  productIds:number[];
  createdAt: string;
  updatedAt: string;
}

export interface CartState {
    carts: Cart[];
    loading: boolean;
    error: string | null;
}
export interface CreateCartPayload {
  userId:number;
  productIds:number[];
  createdBy?: number;
}

export interface CartDetails {
    id: number;
    userId:number;
    productIds:number[];
    createdBy: {
        id:number
    };
    updatedBy: {
        id:number
    };
}

export interface UpdateCartPayload {

  productIds:number[];
  updatedBy?: number;
}
