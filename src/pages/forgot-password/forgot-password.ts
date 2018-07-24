import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Storage } from '@ionic/storage'

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  userInfo = {
    phone_no: "",
    degree: "",
    birth_date: ""
  };

  userEmail = " "
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public Ds: DataServiceProvider , private store: Storage) {

    this.userEmail = navParams.get("user_email");
  }


  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: ' ',
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  checkData() {
    console.log(this.userInfo)
    var degree = this.userInfo.degree;
    var birthDate = this.userInfo.birth_date;
    var phone = this.userInfo.phone_no;
    if (degree != "" && birthDate != "" && phone != "")
      return true;

    else {
      this.showAlert("Please fill out all the fields.")

      return false;
    }
  }

  verifyData(data) {
    console.log("hi in verify") ; 
    console.log(this.userInfo.birth_date , data.birth_date.split('T')[0])
    console.log("server DAta" , data )
    console.log('user data ', this.userInfo)
    if (data.phone_no == this.userInfo.phone_no
      && data.birth_date.split('T')[0] == this.userInfo.birth_date
      && data.degree == this.userInfo.degree)
      return true;
    else
      return false;
  }

  verifyAccount() {
    if (this.checkData()) {
      var url = "/user/email-data?user_email=" + this.userEmail;
      this.Ds.get(url).subscribe(res => {
        if (this.verifyData(res)) {
          var loginData = {
            user_email: this.userEmail,
            password: res.password
          }
          this.Ds.post("/user/login", loginData).subscribe(res => {
            console.log('in login ds', res)
            this.store.set('token', res.token).then(res => {
              this.Ds.getToken().then(data => {
                this.navCtrl.setRoot("VrVideoPage")
              });
            })
          })
        }
        else
          this.showAlert("The data you entered is different from account data!")
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

}
