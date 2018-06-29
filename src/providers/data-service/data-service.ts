import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import { AlertController } from 'ionic-angular';
/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  token: string;
  Ds
  host = "http://ffuniserver.eu-gb.mybluemix.net";
  // host = "http://localhost:6001";
  constructor(public http: Http, public storage: Storage,
    public alertController: AlertController) {

    this.getToken();
    console.log('constructor DS')
  }

  dataAdapter(data) {
    if (data) {
      if (typeof (data.phone) != "undefined")
        data['phone_no'] = data.phone;
      if (typeof (data.phone_no) != "undefined")
        data['phone'] = data.phone_no;
    }
    return data;
  }

  handleResponse(res) {
    var response = res.json();
    console.log("in handle response", response)
    if (!response.success) {
      this.createErrorAlert(res.message)
    }
    return this.dataAdapter(response.data);
  }

  getToken() {
    return this.storage.get('token').then(token => {
      if (typeof (token) == 'undefined')
        token = '';
      this.token = token;
    })
  }

  createErrorAlert(msg) {
    let confirm = this.alertController.create({
      title: 'Something went Wrong',
      message: msg,
      buttons: [
        { text: 'OK', role: 'cancel', },
      ]
    });
    confirm.present();
  }

  get(url) {

    url = this.host + url;

    if (url.includes('?'))
      url += "&"
    else
      url += "?"
    url += "token=" + this.token;
    console.log('sending get Request with url', url)

    return this.http.get(url)
      .map(res => { return this.handleResponse(res) });
  }


  post(url, data) {
    url = this.host + url;
    console.log('sending post Request with url', url)

    data['token'] = this.token;
    data = this.dataAdapter(data);
    return this.http.post(url, data)
      .map(res => { return this.handleResponse(res) });
  }

  put(url, data) {
    url = this.host + url;
    data['token'] = this.token;
    this.dataAdapter(data);
    console.log("sending put request to url", url)
    return this.http.put(url, data)
      .map(res => res.json());
  }

  delete(url) {
    url = this.host + url;
    url += "?token=" + this.token;
    return this.http.delete(url)
      .map(res => res.json());
  }
}
