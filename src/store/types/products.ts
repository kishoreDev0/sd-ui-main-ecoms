export interface Product {
  id: number;
  name: string;
  description: string;
  images: string[]; 
  categoryId:number;
  features:number[];
  inStock: boolean;
  price: number;
  totalNoOfStock:number;
  noOfStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}
export interface CreateProductPayload {
  name: string;
  description: string;
  imagesPath: string[]; 
  categoryId:number;
  features:number[];
  inStock: boolean;
  price: number;
  totalNoOfStock:number;
  noOfStock: number;
  createdBy?: number;
}

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  images: string[]; 
  categoryId:{
    name: number;
    id:number
  };
  features:number[];
  inStock: boolean;
  price: number;
  totalNoOfStock:number;
  noOfStock: number;
  createdBy: {
    id:number
  };
  updatedBy: {
    id:number
  };
}

export interface UpdateProductPayload {
  name: string;
  description: string;
  imagesPath: string[]; 
  categoryId:number;
  features:string[];
  inStock: boolean;
  price: number;
  totalNoOfStock:number;
  noOfStock: number;
  updatedBy?: number;
}
