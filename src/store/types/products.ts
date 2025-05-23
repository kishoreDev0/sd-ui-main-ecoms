export interface Product {
  id: number;
  name: string;
  description: string;
  collectionImage: string; // comma-separated URLs or file names
  price: number;
  stock: number;
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
  collectionImage: string;
  price: number;
  stock: number;
}

export interface UpdateProductPayload extends CreateProductPayload {
  id: number;
}
