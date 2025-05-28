export interface Category {
  id: number;
  categoryName: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export interface CreateCategoryPayload {
  categoryName: string;
  description: string;
  isActive: boolean;
  createdBy: number;
}

export interface UpdateCategoryPayload {
 categoryName: string;
  description: string;
  isActive: boolean;
  updatedBy: number;
}
