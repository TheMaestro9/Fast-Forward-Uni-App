import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage'; 

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DataServiceProvider } from '../providers/data-service/data-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage";

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public store:Storage , public Ds:DataServiceProvider) {
    this.initializeApp();
    this.routeUser() 
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Vr Videos', component: "VrVideoPage" },
      { title: 'Universities' , component:"UniversitiesPage"},
      { title: 'Profile' , component:"ProfilePage"}
    ];

  }

  routeUser(){
    this.store.get('token').then(token=>{
      console.log('welcome in app.component, the token:' , token)
      if(token=="" || token == null || typeof(token)=='undefined')
        this.rootPage='LoginPage';
      else {
        var url = "/user/check-token"; 
        this.Ds.get(url).subscribe(res=>{
          if(!res.validToken)
            this.rootPage='LoginPage' ; 
          else 
            this.rootPage="VrVideoPage"
        })
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
