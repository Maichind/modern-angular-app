import * as UsersActions from './users.actions';
import { User } from '../services/users.service';
import { usersReducer, initialState } from './users.reducer';

describe('UsersReducer', () => {
  it('should set loading on loadUsers', () => {
    const state = usersReducer(initialState, UsersActions.loadUsers());
    expect(state.loading).toBe(true);
  });

  it('should populate users on loadUsersSuccess', () => {
    const users: User[] = [{ 
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
    const state = usersReducer(initialState, UsersActions.loadUsersSuccess({ users }));
    expect(state.users.length).toBe(1);
    expect(state.loading).toBe(false);
  });

  it('should set error on loadUsersFailure', () => {
    const error = 'Error';
    const state = usersReducer(initialState, UsersActions.loadUsersFailure({ error }));
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });
});
