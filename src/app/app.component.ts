import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage'; 
import { urlToNavGroupStrings } from 'ionic-angular/navigation/url-serializer';
import { Events } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  user_info;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage";

  pages: Array<{title: string, component: any, img: string}>;
  pages2: Array<{title2: string}>;
  pages3: Array<{title2: string}>;
  

  constructor( public events: Events, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public store:Storage , public DS:DataServiceProvider) {
    this.initializeApp();
    this.routeUser() 
    this.user_info= {
      user_email: "", 
      phone_no : "", 
      school: ""
    }
    //this.getUserInfo(); 
    this.events.subscribe('shareObject', (dummy, dummyNumber) => {
    console.log('Welcome', dummy[0], 'at', dummyNumber);
    this.pages2 = dummy[0];
}); 

 /*this.events2.subscribe('shareObject2', (dummy2, dummyNumber) => {
    console.log('Welcome', dummy2[0], 'at', dummyNumber);
    this.pages3 = dummy2[0];
}); */
  
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Featured', component: "VrVideoPage" ,img: 'assets/ff.png'},
      { title: 'Explore' , component: "UniversitiesPage", img: 'assets/ff.png'},
      { title: 'Profile' , component: "ProfilePage", img: 'assets/ff.png'},
      { title: 'Help' , component: "HelpPage", img: 'assets/ff.png'}
    ];

  }

  getUserInfo() {
      var url = '/user/user-info'
      console.log("Hello MAAAAN");
      console.log(url);
      this.DS.get(url).subscribe(userInfo=>{
          this.user_info= userInfo   ; 
      })
  }



  routeUser(){
    this.store.get('token').then(token=>{
      console.log('welcome in app.component, the token:' , token)
      if(token=="" || token == null || typeof(token)=='undefined')
        this.rootPage='LoginPage';
      else {
        var url = "/user/check-token"; 
        this.DS.get(url).subscribe(res=>{
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
