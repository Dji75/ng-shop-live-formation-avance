import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// export class DeprecatedGuard implements CanActivate {
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
//     return authGuard();
//   }
// }

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const result: boolean = true;
  return result ?? router.createUrlTree(['/']);
};
