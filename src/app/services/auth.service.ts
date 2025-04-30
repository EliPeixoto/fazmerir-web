import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
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
      if (!this.oauthService.hasValidAccessToken()) {
        this.login();
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
