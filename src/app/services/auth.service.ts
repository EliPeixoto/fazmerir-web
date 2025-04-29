import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) {}

  initAuth() {
    const authConfig: AuthConfig = {
      issuer: 'http://localhost:8081/realms/fazmerir', // URL do seu Realm
      redirectUri: window.location.origin,             // Retorna para onde seu app está rodando
      clientId: 'fazmerir-backend',                     // Client ID do Keycloak
      responseType: 'code',                             // Authorization Code Flow
      scope: 'openid profile email',                    // Scopes que queremos
      showDebugInformation: true,                       // Mostra logs no console (ajuda)
      requireHttps: false                               // Se estiver em localhost
    };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get accessToken() {
    return this.oauthService.getAccessToken();
  }

  get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }
}
