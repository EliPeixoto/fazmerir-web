import { AuthConfig } from 'angular-oauth2-oidc';

export function getAuthConfig(): AuthConfig {
  return {
    issuer: 'http://localhost:8081/realms/fazmerir',
    redirectUri: typeof window !== 'undefined' ? window.location.origin : '', // safe check
    clientId: 'fazmerir-backend',
    responseType: 'code',
    scope: 'openid profile email',
    showDebugInformation: true,
    strictDiscoveryDocumentValidation: false
  };
}
