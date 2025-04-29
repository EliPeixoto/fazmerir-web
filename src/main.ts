import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptorFn } from './app/shared/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    importProvidersFrom(OAuthModule.forRoot()),
  ],
})
  .then((appRef) => {
    const injector = appRef.injector;
    const oauthService = injector.get(OAuthService); // <-- PEGAR do Angular

    oauthService.configure({
      issuer: 'http://localhost:8081/realms/fazmerir',
      redirectUri: window.location.origin,
      clientId: 'fazmerir-backend',
      responseType: 'code',
      scope: 'openid profile email',
      showDebugInformation: true,
      requireHttps: false,
    });

    return oauthService.loadDiscoveryDocumentAndTryLogin(); // <-- tentar login automático
  })
  .catch((err) => console.error('Erro ao carregar OAuthService:', err));
