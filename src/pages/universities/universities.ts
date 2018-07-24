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
  universitiesList;
  universities;
  constructor(public navCtrl: NavController, public navParams: NavParams
        , public Ds:DataServiceProvider) {
          
          this.getUniversities() ; 
  }
  getUniversities() { 
    this.Ds.get("/universities/all-universities").subscribe( universities =>{
      this.universities = universities ; 
      this.universitiesList = universities;
    })
  }

  openUniversityProfile(university){ 
    this.navCtrl.push("UniversityProfilePage",{university:university})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UniversitiesPage');
  }

initializeItems(): void {
  this.universities = this.universitiesList;
}


  getItems(searchbar) {
  // Reset items back to all of the items

  this.initializeItems();
  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;
  console.log('DUDE',q);

  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }

  this.universities = this.universities.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      
    }

   if(v.location && q) {
      if (v.location.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      
    }
return false;
  });

  console.log(q, this.universities.length);
   console.log(this.universitiesList);
}










}
