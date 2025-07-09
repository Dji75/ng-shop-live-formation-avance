import { CanMatchFn, Router } from '@angular/router';
import { BehaviorSubject, first, map } from 'rxjs';
import { inject } from '@angular/core';

export const isLogged = new BehaviorSubject<boolean>(false);

// export const usersGuardCanActivate: CanActivateFn = () => {
//   const router = inject(Router);
//   return isLogged.pipe(
//     first(),
//     map((logged) => logged || router.createUrlTree(['/', 'dashboard']))
//   );
// };

export const usersGuardCanMatch: CanMatchFn = () => {
  const router = inject(Router);

  return isLogged.pipe(
    first(),
    map((logged) => logged || router.createUrlTree(['/', 'dashboard']))
  );
};
