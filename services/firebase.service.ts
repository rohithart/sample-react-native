import { inject, Injectable, NgZone } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { firstValueFrom, Observable, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private messaging = inject(Messaging);
  private tokenService = inject(TokenService);
  private readonly toast = inject(ToastrService);
  private readonly zone = inject(NgZone);

  messageReceived$ = new BehaviorSubject<any>(null);

  async enableNotifications(user$: Observable<any>) {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    await this.registerFirebaseToken(user$);
  }

  listenToForegroundMessages() {
    onMessage(this.messaging, (payload) => {
      this.zone.run(() => {
        const title = payload.notification?.title || 'New Notification';
        const body = payload.notification?.body || '';

        this.toast.info(body, title);
      });
    });
  }

  async registerFirebaseToken(user$: Observable<any>): Promise<void> {
    const user: any = await firstValueFrom(user$);
    if (!user) return;

    const deviceId = this.getOrCreateDeviceId();

    try {
      const token = await getToken(this.messaging, { vapidKey: environment.firebase.vapidKey });
      if (token) {
        localStorage.setItem('fb_token', token);
        await this.saveTokenToBackend(user.email, deviceId, token, 'web', navigator.userAgent);
      }
    } catch (err) {
      console.error('FCM permission/token error', err);
    }
  }

  private getOrCreateDeviceId(): string {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
  }

  private async saveTokenToBackend(userId: string, deviceId: string, token: string, platform: string, deviceInfo?: string): Promise<void> {
    const data = { userId, deviceId, token, platform, deviceInfo };
    try {
      await firstValueFrom(this.tokenService.create(data));
    } catch (err) {
      console.error('Error saving token', err);
    }
  }
}
