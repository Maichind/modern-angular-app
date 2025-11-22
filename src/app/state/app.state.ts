import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from '@core/domain/auth/models/auth.model';
import { authReducer } from '../presentation/auth/store/auth.reducer';
import { usersReducer, UsersState } from '../presentation/users/store/users.reducer';

export interface AppState {
  auth: AuthState;
  users: UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  users: usersReducer,
};
