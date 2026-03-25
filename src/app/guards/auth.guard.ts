import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login/login.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  if (!loginService.usuarioEstaAutenticado()) {
    return router.createUrlTree(['/login']);
  }

  return true;
};
