import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from 'src/app/interfaces';

const KEY = 'user';

@Injectable({ providedIn: 'root' })
export class UserContextService {
  private user$: BehaviorSubject<UserRole | null>;

  constructor() {
    const stored = localStorage.getItem(KEY);
    this.user$ = new BehaviorSubject<UserRole | null>(stored ? JSON.parse(stored) : null);
  }

  set(user: UserRole) {
    localStorage.setItem(KEY, JSON.stringify(user));
    this.user$.next(user);
  }

  clear() {
    localStorage.removeItem(KEY);
    this.user$.next(null);
  }

  get() {
    return this.user$.asObservable();
  }

  getCurrent() {
    return this.user$.value;
  }
}
