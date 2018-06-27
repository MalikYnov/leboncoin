import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { UtilsList } from '../../Utils/lists-utils'
import { Advert } from '../../Models/advert';

import {ApiServiceProvider} from '../../providers/api-service/api-service';


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
  pictureURI: string;
  imgView:string ;
  token:string;
  idUser:string;
  errorMessage:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, platform: Platform, public utilsList: UtilsList,
    private photoLibrary: PhotoLibrary, private camera: Camera, private alertCtrl: AlertController, private base64ToGallery: Base64ToGallery, private toastCtrl: ToastController,
      private apiService: ApiServiceProvider) {
        this.idUser ="5b33b96d113f671da032f676";
        this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbGlrLmRkQHVvLmNvbSIsIl9pZCI6IjViMzNiOTZkMTEzZjY3MWRhMDMyZjY3NiIsImlhdCI6MTUzMDExNjcwMn0.NqmTt7pF4ypWTmiuU7W31YL3Viyp0VHAwrMDJn0m6dI"
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   this.nativeStorage.getItem('user').then(
    //     (data) => {
    //       let user = JSON.parse(data);
    //       // this.token = user['token'];
    //       // this.token = user['id_user'];


    //     },
    //     () => this.navCtrl.push(LoginPage)
    //   );
    // });

    if (navParams.get('idAdvert')) {
      let idAdvert = navParams.get('idAdvert');
      let advert = this.utilsList.ListAdvert[idAdvert];
      this.pictureURI = advert.img;
      this.advertForm = new FormGroup({
        title: new FormControl(advert.title, Validators.required),
        description: new FormControl(advert.description, Validators.required),
        price: new FormControl(advert.price, Validators.required),
        localisation: new FormControl(advert.localisation, Validators.required),
      });
    } else {
      this.advertForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        price: new FormControl(null, Validators.required),
        localisation: new FormControl(null, Validators.required),
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
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true,
      targetWidth: 350,
      targetHeight: 350,
    }).then((imageData) => {

      console.log(imageData);
      this.pictureURI = 'data:image/jpeg;base64,' + imageData;
      this.presentToast(this.pictureURI);
      

    },
      (err) => {
        console.log(err);
      });
  }


  openGallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true,
      quality: 100,
      targetWidth: 350,
      targetHeight: 350,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }).then((imageData) => {
      this.pictureURI = 'data:image/jpeg;base64,' + imageData;
      this.presentToast(this.pictureURI);
    },
      (err) => {
        console.log(err);
        this.presentToast(err);

      });
  }
  deletePicture() {
    this.pictureURI = null;
  }

  presentToast(img: string) {
    let toast = this.toastCtrl.create({
      message: img,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  postAdvert() {

    let pictureName = "";
    // let loading = this.loadingCtrl.create({
    //   content: 'Patientez...'
    // });


    if (this.advertForm.valid) {
      // loading.present();
      let advert = new Advert(this.advertForm.value.title, this.pictureURI, this.advertForm.value.price,
        this.advertForm.value.description, this.advertForm.value.localisation, this.idUser);
      this.apiService.postAdvert(advert, this.token).subscribe(
        data => {
          // loading.dismiss();

          let alert = this.alertCtrl.create({
            title: 'annonce crée',
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this.navCtrl.push(TabsPage);
                }
              },
            ],
          });
          alert.present();
        },
        error => {
          // loading.dismiss();
          console.error(error);
        }
      );


    } else {

      this.errorMessage = "Verifier le formulaire";
      let alert = this.alertCtrl.create({
        title: 'Erreur',
        subTitle: this.errorMessage,
        buttons: ['Ok']
      });
      alert.present();
    }
  }
}
