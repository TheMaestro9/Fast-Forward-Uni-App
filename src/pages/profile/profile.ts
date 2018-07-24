import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { urlToNavGroupStrings } from 'ionic-angular/navigation/url-serializer';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  temporary;
  user_info; 
  dummy = [];
  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams,
    private store: Storage , public DS :DataServiceProvider, public DS2 :DataServiceProvider) {

    this.user_info= {
      user_email: "", 
      phone_no : "", 
      school: ""
    }
    
    this.getUserInfo(); 

  }

  getUserInfo() {
      var url = '/user/user-info'
      console.log("Hello MAAAAN");
      
      this.DS2.get(url).subscribe(userInfo=>{
          this.user_info= userInfo   ; 
          this.dummy.push((this.user_info).user_name);
          
          this.events.publish("shareObject", this.dummy, 2);
      })

  }
  

	logout() {
    this.store.set('token', "");
    this.store.set('admin', false) ;
    this.navCtrl.setRoot("LoginPage");
	}

  edit(){
    this.navCtrl.push('EditProfilePage', {user:this.user_info})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
