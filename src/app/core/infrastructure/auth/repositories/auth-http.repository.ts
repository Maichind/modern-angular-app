import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '@core/domain/auth/repositories/auth.repository';
import { LoginCredentials, RegisterData, AuthResponse } from '@core/domain/auth/models/auth.model';

@Injectable()
export class AuthHttpRepository extends AuthRepository {
  private readonly baseUrl = '/api/auth';

  constructor(private http: HttpClient) {
    super();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response$ = this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials);
    return await firstValueFrom(response$);
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response$ = this.http.post<AuthResponse>(`${this.baseUrl}/register`, data);
    return await firstValueFrom(response$);
  }

  async loadSession(): Promise<AuthResponse | null> {
    const data = localStorage.getItem('auth');
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('auth');
  }
}
