import { AuthResponse, LoginCredentials, RegisterData } from '../models/auth.model';

export abstract class AuthRepository {
  abstract login(credentials: LoginCredentials): Promise<AuthResponse>;
  abstract register(data: RegisterData): Promise<AuthResponse>;
  abstract loadSession(): Promise<AuthResponse | null>;
  abstract logout(): Promise<void>;
}
