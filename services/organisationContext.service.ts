import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrgAccess, Organisation } from 'src/app/interfaces';

const ORG_KEY = 'current_organisation';
const ORG_ACCESS_KEY = 'current_org_access';

@Injectable({ providedIn: 'root' })
export class OrganisationContextService {
  private org$: BehaviorSubject<Organisation | null>;
  private orgAccess$: BehaviorSubject<OrgAccess | null>;

  constructor() {
    const stored = localStorage.getItem(ORG_KEY);
    const storedAccess = localStorage.getItem(ORG_ACCESS_KEY);
    this.org$ = new BehaviorSubject<Organisation | null>(stored ? JSON.parse(stored) : null);
    this.orgAccess$ = new BehaviorSubject<OrgAccess | null>(stored ? JSON.parse(storedAccess) : null);
  }

  setOrg(org: Organisation) {
    localStorage.setItem(ORG_KEY, JSON.stringify(org));
    this.org$.next(org);
  }

  setOrgAccess(org: OrgAccess) {
    localStorage.setItem(ORG_ACCESS_KEY, JSON.stringify(org));
    this.orgAccess$.next(org);
  }

  clear() {
    localStorage.removeItem(ORG_KEY);
    localStorage.removeItem(ORG_ACCESS_KEY);
    this.org$.next(null);
    this.orgAccess$.next(null);
  }

  getOrg() {
    return this.org$.asObservable();
  }

  getOrgAccess() {
    return this.orgAccess$.asObservable();
  }

  getCurrent() {
    return this.org$.value;
  }

  getCurrentAccess() {
    return this.orgAccess$.value;
  }
}
