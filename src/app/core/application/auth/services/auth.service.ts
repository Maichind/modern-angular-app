import { Injectable } from '@angular/core';
import { LoginUseCase } from '../use-cases/login.use-case';
import { RegisterUseCase } from '../use-cases/register.use-case';
import { LoginCredentials, RegisterData, AuthResponse } from '@core/domain/auth/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase
  ) {}

  login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.loginUseCase.execute(credentials);
  }

  register(data: RegisterData): Promise<AuthResponse> {
    return this.registerUseCase.execute(data);
  }
}
