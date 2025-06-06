export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  queryOn: string;
  orderId?: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface ContactState {
  categories: Contact[];
  loading: boolean;
  error: string | null;
}

export interface CreateContactPayload {
 firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  queryOn: string;
  orderId?: string;
  description: string;
  isActive: boolean;
  createdBy: number;
}

export interface UpdateContactPayload {
 firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  queryOn: string;
  orderId?: string;
  description: string;
  isActive: boolean;
  updatedBy: number;
}
