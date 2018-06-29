import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ContactSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-signup',
  templateUrl: 'contact-signup.html',
})
export class ContactSignupPage {

  userInfo ; 
  constructor(public navCtrl: NavController, public navParams: NavParams , 
              public alertCtrl:AlertController) {

    this.userInfo = navParams.get("userInfo") ; 
    this.userInfo['user_email'] = "";  
    this.userInfo['password'] = ""; 
    this.userInfo['phone']=""
  }


  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: ' ',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  checkData() {
    var email = this.userInfo.user_email;
    var password = this.userInfo.password;
    var phone = this .userInfo.phone ; 
    if (email != "" && password != "" && phone!="")
      return true;
    else{
      this.showAlert("Please fill out all the required fields.") 
      return false;
    }
  }

  next(){ 
    if(this.checkData())
      this.navCtrl.push("AcademicSignupPage" , {userInfo:this.userInfo})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactSignupPage');
  }

}
