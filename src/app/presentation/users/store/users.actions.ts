import { createAction, props } from '@ngrx/store';
import { User } from '../services/users.service';

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>()
);
/* eslint-enable  @typescript-eslint/no-explicit-any */
