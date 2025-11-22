import { Store } from '@ngrx/store';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { AuthActions } from '@presentation/auth/store/auth.actions';
import { selectUser } from '@presentation/auth/store/auth.selectors';
import { AuthResponse, UserAuth } from '@core/domain/auth/models/auth.model';

@Injectable({ providedIn: 'root' })
export class LocalAuthRepository {
  private STORAGE_KEY = 'fakeUsers';
    private SESSION_KEY = 'auth';
    private store = inject(Store);
    user = this.store.selectSignal(selectUser);

    private get fakeUsers(): { id: number; name: string; email: string }[] {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ];
    }

    getAllUsers(): UserAuth[] {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    }

    private saveUsers(users: any[]) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }

    login(email: string, password: string): Observable<AuthResponse> {
        const user = this.fakeUsers.find(u => u.email === email);

        if (!user) {
        return throwError(() => new Error('Usuario no encontrado'));
        }

        const token = `mock-token-${user.id}`;
        const session = { user, token };
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));

        return of(session).pipe(delay(800)); // simula latencia
    }

    register(name: string, email: string, password: string): Observable<AuthResponse> {
        const exists = this.fakeUsers.some(u => u.email === email);
        if (exists) {
            return throwError(() => new Error('El usuario ya está registrado'));
        }

        const users = this.getAllUsers();
        const username = this.generateUsername(name, users);
        const newUser = {
            id: Math.floor(Math.random() * 10000),
            name,
            email,
            username,
            bio: '',
            followers: [],
            following: [],
        };

        const updatedUsers = [...this.fakeUsers, newUser];
        this.saveUsers(updatedUsers);

        const token = `mock-token-${newUser.id}`;
        const session = { user: newUser, token };
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));

        return of(session).pipe(delay(1000));
    }

    generateUsername(name: string, existingUsers: UserAuth[]): string {
        if (!name) return 'user' + Math.floor(Math.random() * 1000);

        const [firstName, lastName] = name.trim().split(' ');
        const base = `${(firstName || 'user').toLowerCase()}${(lastName?.charAt(0) || '').toLowerCase()}`;
        
        const existingUsernames = existingUsers
            .map(u => u.username ?? '') // aseguramos que siempre sea string
            .filter(u => u !== '');     // ignoramos vacíos por seguridad

        // Filtra los que empiezan igual que el base
        const matches = existingUsernames
            .filter(u => u.startsWith(base))
            .map(u => {
            const suffix = u.slice(base.length);
            const num = parseInt(suffix, 10);
            return isNaN(num) ? 0 : num;
            });

        // Calcula el número siguiente disponible
        const nextNum = matches.length ? Math.max(...matches) + 1 : 0;

        return nextNum > 0 ? `${base}${nextNum}` : base;
    }    

    getSession() {
        const data = localStorage.getItem(this.SESSION_KEY);
        return data ? JSON.parse(data) : null;
    }

    logout() {
        localStorage.removeItem(this.SESSION_KEY);
        this.store.dispatch(AuthActions.logout());
    }

    clearUsers() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}
