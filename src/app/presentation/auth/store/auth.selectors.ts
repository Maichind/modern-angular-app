import { createSelector } from '@ngrx/store';
import { AppState } from '../../../state/app.state';

export const selectAuthState = (state: AppState) => state?.auth ?? null;

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (auth) => !!auth?.token
);

export const selectUser = createSelector(
  selectAuthState,
  (auth) => auth?.user ?? null
);

export const selectToken = createSelector(
  selectAuthState,
  (auth) => auth?.token ?? null
);
