import { TestBed } from '@angular/core/testing';
import { UsersService, User } from './users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch users', () => {
    const dummyUsers: User[] = [{
      id: 1,
      name: 'John',
      username: 'john',
      email: 'john@example.com',
      address: {
        city: 'Metropolis',
      },
      website: 'johnswebsite.com',
      company: {
        name: 'John Co',
      }
    }];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
