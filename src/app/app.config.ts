import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular'; // <-- Novo import do Auth0

import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    
    // Configuração oficial do Auth0
    provideAuth0({
      domain: 'dev-6yvd3qtd881k2a6u.us.auth0.com',
      clientId: '00FPHfsAzPx5xE4wbZPZGQsXNWRk4djf',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ]
};