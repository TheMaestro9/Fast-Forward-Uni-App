import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';


/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare let cordova: any;

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

Call(){
cordova.InAppBrowser.open('tel:+20233385131', '_system');
}

fb(){
cordova.InAppBrowser.open('http://www.fb.com/fastforwardsim', '_system');
}
insta(){
cordova.InAppBrowser.open('http://www.instagram.com/fastforwardsim', '_system');
}
map(){
cordova.InAppBrowser.open('https://goo.gl/maps/Brq9JPQk1FL2', '_system');
}
email(){
cordova.InAppBrowser.open('mailto:support@fastforwardsim.com', '_system');
}


}
