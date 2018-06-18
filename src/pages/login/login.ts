import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Registerform } from '../registerform/registerform';
//import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  check;
  splash = true;
  name;
  email;
  age;
  storage;
  connection_error_popup: any;


  constructor(public navCtrl: NavController, private http: Http, private DS:DataServiceProvider,
     public alertCtrl: AlertController, private store: Storage, private loadingCtrl: LoadingController) {

  }


  //new 
  ionViewDidLoad() {
    //this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      //  this.tabBarElement.style.display = 'flex';
    }, 4000);
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
