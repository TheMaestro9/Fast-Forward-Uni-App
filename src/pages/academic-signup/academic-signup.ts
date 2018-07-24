import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AcademicSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-academic-signup',
  templateUrl: 'academic-signup.html',
})
export class AcademicSignupPage {

  userInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public Ds: DataServiceProvider, public store: Storage,
    public alertCtrl: AlertController) {
    this.userInfo = navParams.get("userInfo");
    this.userInfo["major"] = "";
    this.userInfo['degree'] = "";
    this.userInfo['school'] = "";
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
    var major = this.userInfo.major;
    var degree = this.userInfo.degree;
    var school = this.userInfo.school;
    if ( degree != "" && school != "")
      return true;
    else {
      this.showAlert("Please fill out all the required fields.")
      return false;
    }
  }
  done() {
    if (this.checkData()) {
      this.Ds.post("/user/register", this.userInfo).subscribe(res => {
        if (res.successfulRegisteration) {
          this.store.set("token", res.token).then(res => {
            this.Ds.getToken().then(data => {
              this.navCtrl.setRoot("VrVideoPage")
            });
          })
        }
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AcademicSignupPage');
  }

}
