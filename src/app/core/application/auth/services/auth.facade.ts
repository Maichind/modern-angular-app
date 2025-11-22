import { Observable } from 'rxjs';
import { computed, Injectable } from '@angular/core';
import { AuthResponse, UserAuth } from '@core/domain/auth/models/auth.model';
import { LocalAuthRepository } from '@core/infrastructure/auth/repositories/local-auth.repository';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor(private readonly repo: LocalAuthRepository) {}
  
  readonly user = computed(() => this.repo.user());
  
  login(email: string, password: string): Observable<AuthResponse> {
    return this.repo.login(email, password);
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.repo.register(name, email, password);
  }

  getSession(): AuthResponse | null {
    return this.repo.getSession();
  }

  getUsers(): UserAuth[] {
    return this.repo.getAllUsers();
  }

  logout(): void {
    this.repo.logout();
  }

  clearUsers(): void {
    this.repo.clearUsers();
  }
}
