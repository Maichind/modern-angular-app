import { UsersPage } from './users-page';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { usersReducer } from '../../store/users.reducer';
import { UsersEffects } from '../../store/users.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPage, HttpClientTestingModule],
      providers: [
        provideStore({ users: usersReducer }),
        provideEffects([UsersEffects]),
      ],
    }).compileComponents();
  });

  it('should create component', () => {
    const fixture = TestBed.createComponent(UsersPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
