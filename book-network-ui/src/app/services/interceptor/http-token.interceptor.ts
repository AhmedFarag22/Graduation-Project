import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { inject, Injector } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const keycloakService = inject(KeycloakService);
  const token:string | undefined = keycloakService.keycloak.token;



  // أي URL يحتوي على المسارات دي لازم نستثنيه (حتى لو كان URL كامل)
  const excludedPaths = [
    '/auth/register',
    '/auth/authenticate',
    '/auth/activate-account'
  ];

  // لو URL فيه أي من الكلمات دي هنستبعده
  const shouldExclude = excludedPaths.some(path => req.url.includes(path));

  console.log('🚨 INTERCEPTOR HIT:', req.url);
  console.log('🧪 EXCLUDED:', shouldExclude);
  console.log('🔑 TOKEN:', token);

  if (shouldExclude) {
    return next(req); // متحطش التوكن
  }


  if (token) {
    console.log('🔥 HttpTokenInterceptor Loaded!');

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  return next(req);
};





// export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

//   const tokenService = inject(TokenService);
//   const token:string = tokenService.token;


//   // أي URL يحتوي على المسارات دي لازم نستثنيه (حتى لو كان URL كامل)
//   const excludedPaths = [
//     '/auth/register',
//     '/auth/authenticate',
//     '/auth/activate-account'
//   ];

//   // لو URL فيه أي من الكلمات دي هنستبعده
//   const shouldExclude = excludedPaths.some(path => req.url.includes(path));

//   console.log('🚨 INTERCEPTOR HIT:', req.url);
//   console.log('🧪 EXCLUDED:', shouldExclude);
//   console.log('🔑 TOKEN:', token);

//   if (shouldExclude) {
//     return next(req); // متحطش التوكن
//   }


//   if (token) {
//     console.log('🔥 HttpTokenInterceptor Loaded!');

//     const authReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return next(authReq);
//   }
//   return next(req);
// };
