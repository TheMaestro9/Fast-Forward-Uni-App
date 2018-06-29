import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';

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

  userInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public Ds: DataServiceProvider) {

    this.userInfo = navParams.get("userInfo");
    this.userInfo['user_email'] = "";
    this.userInfo['password'] = "";
    this.userInfo['phone'] = ""
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
    var phone = this.userInfo.phone;
    if (email != "" && password != "" && phone != "")
      return true;
<<<<<<< HEAD
    else{
      this.showAlert("Please fill out all the required fields.") 
=======
    else {
      this.showAlert("please enter your data first")
>>>>>>> 7ddba930d0bea98d8805ebfc208aaa8c2b08c29e
      return false;
    }
  }

  next() {
    if (this.checkData()) {
      var url = "/user/verify-email?user_email=" + this.userInfo.user_email
      this.Ds.get(url).subscribe(res => {
        if (res.validEmail)
          this.navCtrl.push("AcademicSignupPage", { userInfo: this.userInfo })
        else 
          this.showAlert("this email is already used")
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactSignupPage');
  }

}
