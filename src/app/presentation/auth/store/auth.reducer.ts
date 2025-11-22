import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState } from '@core/domain/auth/models/auth.model';

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  // LOGIN
  on(AuthActions.loginStart, state => ({ ...state, loading: true })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // REGISTER
  on(AuthActions.registerStart, state => ({ ...state, loading: true })),
  on(AuthActions.registerSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // LOGOUT
  on(AuthActions.logout, () => initialState),

  // Carga datos persistidos
  on(AuthActions.loadSession, (state, { user, token }) => ({
    ...state,
    user,
    token,
  }))
);
