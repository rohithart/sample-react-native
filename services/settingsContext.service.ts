import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from 'src/app/interfaces/Settings';

const KEY = 'user_settings';

@Injectable({ providedIn: 'root' })
export class SettingsContextService {
  private settings$: BehaviorSubject<Settings>;

  defaultSettings: Settings = {
    showCompleted: true,
    showArchived: false,
    viewMode: 'card'
  };

  constructor() {
    const stored = localStorage.getItem(KEY);
    const initial: Settings = stored ? JSON.parse(stored) : this.defaultSettings;

    this.settings$ = new BehaviorSubject<Settings>(initial);
  }

  getDefault() {
    return this.defaultSettings;
  }

  set(settings: Settings) {
    localStorage.setItem(KEY, JSON.stringify(settings));
    this.settings$.next(settings);
  }

  clear() {
    this.set(this.defaultSettings);
  }

  setDefault() {
    this.set(this.defaultSettings);
  }

  get() {
    return this.settings$.asObservable();
  }

  getCurrent() {
    return this.settings$.value;
  }
}
