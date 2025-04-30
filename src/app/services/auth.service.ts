import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { getAuthConfig } from '../../auth.config';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  constructor(private oauthService: OAuthService) {}

  initAuth() {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve(); // SSR: não tenta autenticar
    }

    this.oauthService.configure(getAuthConfig());

    return this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        const token = this.oauthService.getAccessToken();
        localStorage.setItem('token', token); // ✅ salva o token no navegador
        console.log('Token salvo:', token);  // opcional
      } else {
        this.login(); // se não estiver autenticado, redireciona para o login
      }
    });
  }

  login() {
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.initLoginFlow();
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.logOut();
      localStorage.removeItem('token'); // 🧼 limpa o token ao sair
    }
  }

  get accessToken() {
    return isPlatformBrowser(this.platformId)
      ? this.oauthService.getAccessToken()
      : '';
  }

  get identityClaims() {
    return isPlatformBrowser(this.platformId)
      ? this.oauthService.getIdentityClaims()
      : null;
  }
}
