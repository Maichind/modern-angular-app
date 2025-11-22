import { Inject, Injectable } from '@angular/core';
import { AuthRepository } from '@core/domain/auth/repositories/auth.repository';
import { LoginCredentials, AuthResponse } from '@core/domain/auth/models/auth.model';
import { AUTH_REPOSITORY_TOKEN } from '@core/infrastructure/auth/tokens/auth-repository.token';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN) private authRepository: AuthRepository
  ) {}

  execute(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.authRepository.login(credentials);
  }
}
