import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AlertController } from 'ionic-angular';
import { Base64 } from '@ionic-native/base64';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, platform: Platform, public utilsList: UtilsList,
     private photoLibrary: PhotoLibrary, private camera: Camera, private alertCtrl: AlertController, private base64: Base64) {
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
      this.pictureURI = advert.img;
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

  addPicture() {
    let alert = this.alertCtrl.create({
      title: 'Choix ce l\'image',
      // message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Choisir une Photo',

          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Prendre une photo',
          handler: () => {
            this.takePic();
          }
        }
      ]
    });
    alert.present();
  }

  takePic() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      allowEdit: true,
      targetWidth: 350,
      targetHeight: 350,
    }).then((imageData) => {
      this.base64.encodeFile(imageData).then((base64File: string) => {
        console.log(base64File);
        let alert = this.alertCtrl.create({
          title: 'Choix ce l\'image',
          // message: 'Do you want to buy this book?',
          buttons: [
            {
              text: base64File,
    
              handler: () => {
                this.openGallery();
              }
            },
            {
              text: 'Prendre une photo',
              handler: () => {
                this.takePic();
              }
            }
          ]
        });
        alert.present();
        this.pictureURI = base64File;
        
      }, (err) => {
        console.log(err);
      });

    },
      (err) => {
        console.log(err);
      });
  }
  openGallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      allowEdit: true,
      quality: 100,
      targetWidth: 350,
      targetHeight: 350,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }).then((imageData) => {
      this.base64.encodeFile(imageData).then((base64File: string) => {
        console.log(base64File);
        this.pictureURI = base64File;
      }, (err) => {
        console.log(err);
      });


    },
      (err) => {
        console.log(err);
      });
  }
  deletePicture() {
    this.pictureURI = null;
  }
}
