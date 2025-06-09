export interface Static {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface StaticState {
  statics: Static[];
  loading: boolean;
  error: string | null;
}

export interface CreateStaticPayload {
  title: string;
  description: string;
  isActive: boolean;
  createdBy: number;
}

export interface UpdateStaticPayload {
  title: string;
  description: string;
  isActive: boolean;
  updatedBy: number;
}
