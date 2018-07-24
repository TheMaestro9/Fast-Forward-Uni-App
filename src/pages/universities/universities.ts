import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';

/**
 * Generated class for the UniversitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-universities',
  templateUrl: 'universities.html',
})
export class UniversitiesPage {

  universities;
  constructor(public navCtrl: NavController, public navParams: NavParams
        , public Ds:DataServiceProvider) {
          
          this.getUniversities() ; 
  }
  getUniversities() { 
    this.Ds.get("/universities/all-universities").subscribe( universities =>{
      this.universities = universities ; 
    })
  }

  openUniversityProfile(university){ 
    this.navCtrl.push("UniversityProfilePage",{university:university})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UniversitiesPage');
  }

}
