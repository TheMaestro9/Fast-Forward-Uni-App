import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { VrViewProvider } from '../../providers/vr-view/vr-view';
import { urlToNavGroupStrings } from 'ionic-angular/navigation/url-serializer';
import { Events } from 'ionic-angular';

/**
 * Generated class for the VrVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vr-video',
  templateUrl: 'vr-video.html',
})
export class VrVideoPage {
user_info; 
  dummy = [];
  mediaSamples
  highQuality
  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams,
    public DS: DataServiceProvider, public alertController: AlertController,
    public vrView: VrViewProvider,
  ) {
    this.highQuality = true;
    this.getVrVideos();
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
      
      this.DS.get(url).subscribe(userInfo=>{
          this.user_info= userInfo   ; 
          this.dummy.push((this.user_info).user_name);
          console.log(this.dummy);
          this.events.publish("shareObject", this.dummy, 2);
      })

  }


  getVrVideos() {
    this.DS.get("/vr-videos/all-videos").subscribe(res => {
      console.log('in vr-video.ts', res)
      this.mediaSamples = res
    })
  }

  selectQuality(video) {

    let alert = this.alertController.create();
    alert.setTitle('Choose Quality');
    alert.addInput({
      type: 'radio',
      label: "High Qaulity",
      value: "High",
      checked: this.highQuality
    });
    alert.addInput({
      type: 'radio',
      label: "Medium Qaulity",
      value: "Low",
      checked: !this.highQuality
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == "High") {
          video.url = video.high_quality_url;
          this.highQuality = true;
        }

        else {
          video.url = video.low_quality_url;
          this.highQuality = false;
        }
        // this.videoQuality = data;
      }
    });
    alert.present();
  }

  selectPart(video) {

    let alert = this.alertController.create();
    alert.setTitle('Jump to');
    var parts = video.parts;
    parts.forEach(element => {
      var checked;
      if (video.url == element.low_quality_url || video.url == element.high_quality_url)
        checked = true;
      else
        checked = false;
      alert.addInput({
        type: 'radio',
        label: element.part_name,
        value: element,
        checked: checked
      });
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (this.highQuality == true)
          video.url = data.high_quality_url;
        else
          video.url = data.low_quality_url;

        video.high_quality_url = data.high_quality_url;
        video.low_quality_url = data.low_quality_url;
        // this.videoQuality = data;
      }
    });
    alert.present();

  }

  viewMore(video){
    var url = "/universities/university-details?university_id="+video.university_id 
    this.DS.get(url).subscribe(university =>{ 
      this.navCtrl.push("UniversityProfilePage" , {university:university})
    })
  }

  openVideoClick(mediaSampleElement) {

    var toBePlayed = {
      "name": mediaSampleElement.video_name,
      "type": "VIDEO",
      "inputType": "TYPE_MONO",
      "inputFormat": mediaSampleElement.inputFormat,
      "url": mediaSampleElement.url,
      "isLocal": false,
      "preview_url": mediaSampleElement.preview_url,
    }
    this.vrView.playMediaSample(toBePlayed);
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad VrVideoPage');
  }

}
