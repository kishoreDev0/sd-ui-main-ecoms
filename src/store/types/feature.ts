export interface Feature {
  id: number;
  name: string;
  productId: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface FeatureState {
  features: Feature[];
  loading: boolean;
  error: string | null;
}

export interface CreateFeaturePayload {
  name: string;
  createdBy: number;
}

export interface UpdateFeaturePayload extends CreateFeaturePayload {
  id: number;
}
