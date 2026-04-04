import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SettingsContextService } from './settingsContext.service';
import { OrganisationContextService } from './organisationContext.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth0AuthService {
  private readonly auth = inject(AuthService);
  private readonly setting = inject(SettingsContextService);
  private readonly orgContext = inject(OrganisationContextService);
  isAuthenticated = this.auth.isAuthenticated$;
  user = this.auth.user$;
  getToken = this.auth.getAccessTokenSilently();
  metadata = {};

  login() {
    sessionStorage.removeItem('demoSessionExpiresAt');
    this.setting.setDefault();
    this.orgContext.clear();
    this.auth.loginWithRedirect();
  }

  loginWithOption(options: any) {
    this.auth.loginWithRedirect(options);
  }

  hasAnyRole(role: string): Observable<boolean> {
    return this.user.pipe(
      map((user) => {
        return user['https://propordo.com/role'].includes(role);
      })
    );
  }

  logout() {
    this.setting.clear();
    this.orgContext.clear();

    this.auth.logout({
      logoutParams: {
        returnTo: 'https://propordo.com'
      }
    });
  }
}
