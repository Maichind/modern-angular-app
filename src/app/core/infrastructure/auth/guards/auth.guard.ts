import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '@core/application/auth/services/auth.facade';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authFacade = inject(AuthFacade);

  const user = authFacade.user();
    
  if (!user) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
