export interface InviteUserState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

// export interface InviteUserRequest {
//   name: string;
//   email: string;
//   role: string;
// }

export interface InviteUserRequest {
  name: string;
  phone: number;
  email: string;
  role: number;
  createdBy: number
}

