import { Component, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  error = null;
  loginName: string;
  constructor(private authService: AuthService, private zone: NgZone) {
    authService.listenToAuthChanges(auth => {
      zone.run(() => {
        // hack to fix Zones not registering Websocket stuff reliably
        this.error = auth.error;
        if (auth.token) {
          this.loginName = auth.user.displayName || auth.user.uid;
        }
      });
    });
  }
  logIn() {
    this.authService.signInWithPopup();
  }
}
