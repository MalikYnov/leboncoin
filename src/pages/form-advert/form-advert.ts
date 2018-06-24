import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginPage } from '../login/login';
import {UtilsList} from '../../Utils/lists-utils'
import { Advert } from '../../Models/advert';


/**
 * Generated class for the FormAdvertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-advert',
  templateUrl: 'form-advert.html',
})
export class FormAdvertPage {
  advertForm: FormGroup;
  pictureURI:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, platform: Platform, public utilsList: UtilsList) {
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   this.nativeStorage.getItem('user').then(
    //     () => console.log("isValable"),
    //     () => this.navCtrl.push(LoginPage)
    //   );
    // });

    if( navParams.get('idAdvert')){
      let idAdvert = navParams.get('idAdvert');
      let advert = this.utilsList.ListAdvert[idAdvert];
      this.pictureURI = advert.picture;
      this.advertForm = new FormGroup({
        title: new FormControl(advert.title, Validators.required),
        description: new FormControl(advert.description, Validators.required),
        price: new FormControl(advert.price, Validators.required),
      }); 
      }else{
        this.advertForm = new FormGroup({
          title: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          price: new FormControl(null, Validators.required),
        });
      }

  }
}
