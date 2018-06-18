import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  userData; 
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public Ds:DataServiceProvider) {
                this.userData= this.navParams.get('user') ; 
  }

  edit() { 
    console.log("after clicking " , this.userData)
    this.Ds.put("/user/update-user-info" , this.userData).subscribe(res=> {
      console.log(res)
      this.navCtrl.pop()

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    console.log(this.userData)
  }


}
