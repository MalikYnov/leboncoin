import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import {UtilsList} from '../../Utils/lists-utils'
import { Advert } from '../../Models/advert';
/**
 * Generated class for the DisplayAdvertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-advert',
  templateUrl: 'display-advert.html',
})
export class DisplayAdvertPage {
  advert:Advert;
  pictureURI:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsList: UtilsList) {
    if( navParams.get('idAdvert')){
      let idAdvert = navParams.get('idAdvert');
      this.advert = this.utilsList.ListAdvert[idAdvert];
      this.pictureURI = this.advert.picture;
    }else{
      this.navCtrl.push(HomePage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayAdvertPage');
  }

}
