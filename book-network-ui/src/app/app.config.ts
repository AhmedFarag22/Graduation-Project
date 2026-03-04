import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { httpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations() , provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient( withInterceptors([httpTokenInterceptor]) ),
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    },
    importProvidersFrom(
      ToastrModule.forRoot({
        progressBar: true,
        closeButton: true,
        newestOnTop: true,
        tapToDismiss: true,
        positionClass: 'toast-bottom-right',
        timeOut: 8000
      })
    )

  ]
};
