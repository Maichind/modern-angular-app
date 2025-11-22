import { InjectionToken } from '@angular/core';
import { AuthRepository } from '@core/domain/auth/repositories/auth.repository';

export const AUTH_REPOSITORY_TOKEN = new InjectionToken<AuthRepository>(
  'AUTH_REPOSITORY_TOKEN'
);
