
export interface User {
  username: string;
  id?: number;
  role_id: number;
  firstName: string | null;
  lastName: string | null;
  officialEmail: string;
  primaryPhone: string | null;
  trlId: string | null;
  imageURL: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface InviteUserResponse {
  userDetails: User;
}

export interface InviteUserPayload {
  officialEmail: string;
  roleId: {
    id: number;
  };
  createdBy: {
    id: number;
  };
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  officialEmail?: string;
  primaryPhone?: string | null;
}
