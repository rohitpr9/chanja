import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  const raw = localStorage.getItem('login')

  if (!raw) {
    return router.createUrlTree(['login'])
  }

  const loginCredential = JSON.parse(raw)

  if (loginCredential) {
    return true
  }
  else{
  return router.createUrlTree(['login'])
  }

};
