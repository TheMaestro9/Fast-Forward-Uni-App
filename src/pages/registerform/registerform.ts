import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { DataServiceProvider } from '../../providers/data-service/data-service';


@IonicPage()
@Component({
  selector: 'page-registerform',
  templateUrl: 'registerform.html',
})
export class Registerform {
  loader
  userInfo = {
    birth_date: "",
    user_name: ""
  };

  constructor(platform: Platform, public navCtrl: NavController, public DS: DataServiceProvider,
    public http: Http, public navParams: NavParams, public alertCtrl: AlertController,
    public plt: Platform, private loadingCtrl: LoadingController,
    private store: Storage) {
  }

  handleBirthDateFormat() {
    var parts = this.userInfo.birth_date.split('-');
    var date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    date.setHours(date.getHours() + 2);
    return date.toISOString().replace("T", " ").replace("Z", "");
  }

  //  checkPhoneNumber(phone) {

  //   console.log("after div" , phone / 100000000) ; 
  //   if (phone < 1599999999 && phone > 1000000000)
  //     return true;
  //   else
  //     if (Math.floor(phone / 100000000) == 5) // phone is starting with 05 ie from saudi arabia 
  //       return true;
  //     else
  //       return false;
  // }
  // register(pass, school, phone,promo) {


  //  var bDate =  this.handleBirthDateFormat() ; 
  //  console.log("el date ya man" , bDate.toISOString()) ; 

  //   if (this.name != "" && this.email != "" && pass != "" && school != "" && this.age !=this.localDate && phone != "" ){
  //     console.log("not null");
  //     if(!this.checkPhoneNumber(phone))
  //       this.showAlert("Enter a valid phone number. make sure you have entered 11 numbers");
  //     else{
  //       this.presentLoading() ;
  //       let user={
  //         degree:this.degree,
  //         user_name:this.name,
  //         user_email:this.email,
  //         birth_date:bDate.toISOString(),
  //         password:pass,
  //         school:school,
  //         phone_no:phone,
  //         major:this.major        
  //       }


  //       console.log("the data to send is ", user) ; 

  //     this.http.post("https://ffserver.eu-gb.mybluemix.net/register3", user).subscribe(data => {

  //       var res = JSON.parse(data['_body']);
  //       this.handleResponse(res);
  //       this.dismissLoading();
  //     } , err => {this.showAlert(err)});

  //   }
  // }

  //   else {

  //     this.showAlert("Fill all information please");

  //   }


  // }
  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: ' ',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  // handleResponse(value) {
  //   this.check = value;
  //   if (this.check.result == false) {
  //     this.showAlert(this.check.msg);
  //   }
  //   else if(this.check.result==true){
  //     this.store.set('user_id', this.check.user_id);
  //     // this.navCtrl.setRoot(TutorialPage);             
  //    }      
  // }



  checkData() {
    var userName = this.userInfo.user_name;
    var birthDate = this.userInfo.birth_date;
    console.log("in hell" , this.userInfo)
    if (userName != "" && birthDate != "")
      return true;
    else{
      this.showAlert("please enter your data first") 
      return false;
    }
  }
  next() {
    if (this.checkData()) { 
      this.navCtrl.push("ContactSignupPage" , { userInfo:this.userInfo})
      // this.userInfo.birth_date = this.handleBirthDateFormat()
    // console.log(this.userInfo)
    
    }
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }

}
