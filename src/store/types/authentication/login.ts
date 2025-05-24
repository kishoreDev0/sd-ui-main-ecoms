export interface User {
  userId: number;
  roleId: number | null;
  username: string;
  email: string;
  profileUrl: string | null;
  
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAdmin:boolean;
  token:string
}

export interface LoginResponse {
  user: any;
  session: string;
  statusCode: string;
  status: string;
  message: string;
  data: User;
}
