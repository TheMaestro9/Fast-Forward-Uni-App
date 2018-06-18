import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';

/**
 * Generated class for the UniversityProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-university-profile',
  templateUrl: 'university-profile.html',
})
export class UniversityProfilePage {

  university
  rows  

  constructor(public navCtrl: NavController, public navParams: NavParams,  
              public Ds:DataServiceProvider , public alertCtrl:AlertController) {
    this.university = this.navParams.get('university');
    // this.university = { 
    //   name:"GUC", 
    //   description:"this is the university description", 
    //   img_url: "https://i.ytimg.com/vi/RofboY-hQyI/maxresdefault.jpg", 
    //   price_range: "100$-200$" , 
    //   grades:"B+" , 
    //   location: "tagamo3 el 5ames"
    // }
    

    this.rows = [
      {title:"Price Range" , value:this.university.price_range},
      {title:"Required Grade" , value:this.university.grades},
      {title:"Location " , value:this.university.location}, 
      {title:"Accommodation Fees" , value:this.university.accommodation_fees}, 
      {title:"Majors" , value:this.university.majors}
    ]
    console.log("in university page" , this.university)
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: ' ',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  interest() {
    this.Ds.post("/universities/user-interest" , {university_id:this.university.university_id}).subscribe(res=>{
      if(res.interestAdded)
        this.showAlert("Your Interest was submitted successfully"); 
    })
  }
  moreUniversities(){
    this.navCtrl.setRoot("UniversitiesPage")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UniversityProfilePage');
  }

}
