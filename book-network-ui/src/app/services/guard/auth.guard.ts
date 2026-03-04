import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { inject } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';

export const authGuard: CanActivateFn = (route, state) => {
  const keycloakService: KeycloakService = inject(KeycloakService);
  const router: Router = inject(Router);
  if (keycloakService.keycloak?.isTokenExpired()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};


// export const authGuard: CanActivateFn = (route, state) => {
//   const tokenService: TokenService = inject(TokenService);
//   const router: Router = inject(Router);
//   if (tokenService.isTokenNotValid()) {
//     router.navigate(['login']);
//     return false;
//   }
//   return true;
// };
