export interface Wishlist {
  user: any;
  id: number;
  userId:number;
  productIds:number[];
  createdAt: string;
  updatedAt: string;
}

export interface WishlistState {
    wishlist: Wishlist[];
    userList:number[]
    loading: boolean;
    error: string | null;
}
export interface CreateWishlistPayload {
  userId:number;
  productIds:number[];
  createdBy?: number;
}

export interface WishlistDetails {
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

export interface UpdateWishlistPayload {
  productIds:number[];
  updatedBy?: number;
}

export interface UpdateWishlistListPayload {
  productId:number;
  updatedBy: number;
}
