import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthActions } from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, catchError, delay, exhaustMap, map, of } from 'rxjs';
import { AuthFacade } from '@core/application/auth/services/auth.facade';

export const AuthEffects = createEffect(
  (actions$ = inject(Actions), authFacade = inject(AuthFacade )) =>
    actions$.pipe(
      ofType(AuthActions.loginStart, AuthActions.registerStart),
      exhaustMap((action) => {
        const req$ =
          action.type === AuthActions.loginStart.type
            ? authFacade.login(action.email, action.password)
            : authFacade.register(action.name!, action.email, action.password);

        return req$.pipe( 
          delay(500), 
          map((res) => { 
            localStorage.setItem('auth', JSON.stringify(res)); 
            return AuthActions.loginSuccess({ user: res.user, token: res.token }); 
          }), 
          catchError((err) => 
            of(AuthActions.loginFailure({ error: err.message || 'Error desconocido' })) 
        ) 
      ); 
    }) 
  ), 
  { functional: true } 
);

export const loadSessionEffect = createEffect(
  () =>
    of(localStorage.getItem('auth')).pipe(
      map((data) => {
        if (!data) return { type: '[Auth] No Session' };
        try {
          const session = JSON.parse(data);
          return AuthActions.loadSession({
            user: session.user,
            token: session.token,
          });
        } catch {
          return { type: '[Auth] Invalid Session' };
        }
      })
    ),
  { functional: true }
);

export const loginSuccessRedirect$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => router.navigate(['/feed']))
    );
  },
  { functional: true, dispatch: false }
);

export const logoutRedirectEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('auth');
        router.navigate(['/auth/login']);
      })
    ),
  { functional: true, dispatch: false }
);
