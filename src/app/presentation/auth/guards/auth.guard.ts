import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { filter, map, take } from 'rxjs/operators';
import { CanActivateFn, Router } from '@angular/router';
import { selectIsAuthenticated } from '../store/auth.selectors';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectIsAuthenticated).pipe(
    filter((isAuth) => isAuth !== undefined),
    take(1),
    map((isAuth) => {
      if (!isAuth) {
        router.navigate(['/auth/login']);
        return false;
      }
      return true;
    })
  );
};
