import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  Call(){
window.open("tel:" + '+20233385131');
}

fb(){
window.open('http://www.fb.com/fastforwardsim');
}
insta(){
window.open('http://www.instagram.com/fastforwardsim');
}
map(){
window.open('https://goo.gl/maps/Brq9JPQk1FL2');
}
email(){
window.open("mailto:" + 'support@fastforwardsim.com');
}


}
