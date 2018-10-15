import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FacebookService, InitParams } from 'ngx-facebook';
// import * as AWS from 'aws-sdk';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fb: FacebookService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    let initParams: InitParams = {
      appId: '2089957577702736',
      xfbml: true,
      version: 'v2.10'
    };
    
    // AWS.util.isNode = function() {
    //   return false;
    // };
    // AWS.
    // AWS.util.isBrowser = function() {
    //     return true;
    // };
 
    this.fb.init(initParams);
  }
}
