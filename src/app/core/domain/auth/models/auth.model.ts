export interface AuthResponse {
  token: string;
  user: UserAuth;
}

export interface UserAuth {
  id: number; 
  name: string; 
  email: string;
  username?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
/* eslint-enable  @typescript-eslint/no-explicit-any */
