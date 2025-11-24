
import { AuthResponse } from '@core/domain/auth/models/auth.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login Start': props<{ email: string; password: string }>(),
    'Login Success': props<{ user: AuthResponse['user']; token: string }>(),
    'Login Failure': props<{ error: string }>(),

    'Logout': emptyProps(),

    'Register Start': props<{ name: string; email: string; password: string }>(),
    'Register Success': props<{ user: AuthResponse['user']; token: string }>(),
    'Register Failure': props<{ error: string }>(),

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    'Load Session': props<{ user: any; token: string }>(),
    /* eslint-enable  @typescript-eslint/no-explicit-any */
  },
});
