import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Registerform } from '../registerform/registerform';
//import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Events } from 'ionic-angular';

import { trigger, state, style, animate, transition } from '@angular/animations';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

   animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('700ms'))
    ])
  ]


})
export class LoginPage {
   public buttonClicked: boolean = true;
   public buttonClicked2: boolean = false;
   visibility: string = 'hidden';
  user_info; 
  dummy = [];
   dummy2 = [];
  check;
  splash = true;
  name;
  email;
  age;
  storage;
  connection_error_popup: any;


  constructor(public events2: Events, public events: Events, public navCtrl: NavController, private http: Http, private DS:DataServiceProvider,
     public alertCtrl: AlertController, private store: Storage, private loadingCtrl: LoadingController) {
     this.user_info= {
      user_email: "", 
      phone_no : "", 
      school: ""
    }

  }


getUserInfo() {
      var url = '/user/user-info'
      console.log("Hello MAAAAN");
      
      this.DS.get(url).subscribe(userInfo=>{
          this.user_info= userInfo;
          this.dummy.push((this.user_info).user_name);
          this.dummy2.push((this.user_info).user_email);
          this.events.publish("shareObject", this.dummy, 2);
          this.events2.publish("shareObject2", this.dummy2, 2);
          console.log(this.dummy2);
           console.log("Second one:-");
          console.log(this.dummy);
      })

  }
  



  //new 
  ionViewDidLoad() {
    //this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      //  this.tabBarElement.style.display = 'flex';
    }, 4000);
  }


public onButtonClick() {
        this.visibility = "shown";
        this.buttonClicked = !this.buttonClicked;
        this.buttonClicked2 = !this.buttonClicked2;
       
       
    }


  nav(userEmail , password) {
    var data = {
      user_email: userEmail , 
      password: password 
    }
    this.DS.post("/user/login", data).subscribe(res=> { 
      if(res.successfulLogin){ 
        this.store.set('token', res.token).then(res => {
          this.DS.getToken().then(data => {
            this.navCtrl.setRoot("VrVideoPage")
          });
        })
      }
      else 
        this.showAlert() 
    })    
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: ' ',
      subTitle: 'Wrong Email Or Password',
      buttons: ['OK']
    });
    alert.present();
  }


  form() {
    this.navCtrl.push("Registerform");
  }


  // forgot_pass() {
  //   this.alertCtrl.create({
  //     title: 'Forgot your password?',
  //     subTitle: 'No problem! Just provide your email and you will receive your password immediately..',
  //     inputs: [
  //       {
  //         name: 'email',
  //         placeholder: 'Enter your email here...',
  //         type: 'text'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Send',
  //         handler: data => {
  //           //TO DO Send email with user password
  //         }
  //       }
  //     ]
  //   }).present();
  // }

  forgetpass(us){
    //To DO 
  }

}
