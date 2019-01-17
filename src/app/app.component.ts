import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDPGWG9oiLzlSehSVP4t0PE-CwWr4MaqFE',
  authDomain: 'ionictest-279fa.firebaseapp.com',
  databaseURL: 'https://ionictest-279fa.firebaseio.com',
  projectId: 'ionictest-279fa',
  storageBucket: 'ionictest-279fa.appspot.com',
  messagingSenderId: '540537307573'
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
