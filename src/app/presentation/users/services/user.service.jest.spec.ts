import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { UsersService, User } from './users.service';
import { firstValueFrom } from 'rxjs';

describe('UserService with Jest', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService, provideHttpClient()],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', async () => {
    const users = await firstValueFrom(service.getUsers());
    expect(users.length).toBeGreaterThan(0);
  });
});
