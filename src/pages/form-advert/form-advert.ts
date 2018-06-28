import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
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
  isUpdate:boolean = false;
  buttonForm:string = "Créer";
  currentIdAdvert:string;
  // loadingCtrl:LoadingController

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, platform: Platform, public utilsList: UtilsList,
    private photoLibrary: PhotoLibrary, private camera: Camera, private alertCtrl: AlertController, private base64ToGallery: Base64ToGallery, private toastCtrl: ToastController,
      private apiService: ApiServiceProvider, private loadingCtrl:LoadingController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.nativeStorage.getItem('user').then(
        (data) => {
          let user = JSON.parse(data);
          this.token = user['token'];
          this.idUser = user['id_user'];
        },
        (error) => this.navCtrl.push(LoginPage)
      );
    });

    if( navParams.get('ad')){
      this.isUpdate = true;
      this.buttonForm = "Modifier";
      let advert = navParams.get('ad');
      this.currentIdAdvert = advert._id;
      this.pictureURI = advert.img;
      this.advertForm = new FormGroup({
        title: new FormControl(advert.title, Validators.required),
        description: new FormControl(advert.description, Validators.required),
        price: new FormControl(advert.price, Validators.required),
        localisation: new FormControl(advert.localisation, Validators.required),
      });

    } else {
      this.isUpdate = false;
      
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

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
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

    let loading = this.loadingCtrl.create({
      content: 'Patientez...'
    })
    loading.present();

    if (this.advertForm.valid) {
      // loading.present();
      let advert = new Advert(this.advertForm.value.title, this.pictureURI, this.advertForm.value.price,
        this.advertForm.value.description, this.advertForm.value.localisation, this.idUser);


        if(this.isUpdate){
          advert._id = this.currentIdAdvert;
          this.apiService.PutAdvert(advert, this.token).subscribe(
            data => {
               loading.dismiss();
    
              let alert = this.alertCtrl.create({
                title: 'Annonce Modifiée',
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
              loading.dismiss();
              console.error(error);
            }
          );
        }else{
          this.apiService.postAdvert(advert, this.token).subscribe(
            data => {
               loading.dismiss();
    
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
               loading.dismiss();
              this.presentToast(error);
            }
          );
        }

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
