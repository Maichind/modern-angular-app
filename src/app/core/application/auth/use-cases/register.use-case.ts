import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '@core/domain/auth/repositories/auth.repository';
import { RegisterData, AuthResponse } from '@core/domain/auth/models/auth.model';

@Injectable({ providedIn: 'root' })
export class RegisterUseCase {
  private authRepository = inject(AuthRepository);

  execute(data: RegisterData): Promise<AuthResponse> {
    return this.authRepository.register(data);
  }
}
