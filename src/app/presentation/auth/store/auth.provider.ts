import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as AuthEffects from './auth.effects';
import { authReducer } from './auth.reducer';

export const provideAuthFeature = [
  provideState('auth', authReducer),
  provideEffects(AuthEffects),
];
