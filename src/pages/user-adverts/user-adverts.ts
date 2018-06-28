import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

//Utils
import { UtilsList } from '../../Utils/lists-utils'
import { Advert } from '../../Models/advert';

//Pages
import { LoginPage } from '../login/login';
import { FormAdvertPage } from '../form-advert/form-advert';
import { DisplayAdvertPage } from '../display-advert/display-advert';

//Providers
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { ApiServiceProvider } from '../../providers/api-service/api-service'


@IonicPage()
@Component({
  selector: 'page-user-adverts',
  templateUrl: 'user-adverts.html',
})
export class UserAdvertsPage {

  public advertsList: Array<Advert> = new Array<Advert>();

  public idUser: string = "";
  public token: string = "";
  errorMessage: string;

  constructor(public navCtrl: NavController, public utilsList: UtilsList, private nativeStorage: NativeStorage, platform: Platform, private AuthService: AuthServiceProvider,
    public apiService: ApiServiceProvider, private alertCtrl: AlertController, private toastCtrl: ToastController) {

    platform.ready().then(() => {
      this.nativeStorage.getItem('user').then(
        (data) => {
          let user = JSON.parse(data);
          this.idUser = user['id_user'];
          this.token = user['token'];
        },
        () => console.log("error")
      );
    });

    //Get All Adverts for current user
    this.apiService.getAllAdverts(this.token).subscribe(
      data => {
        console.log(data);
        data.forEach(element => {
          let advert = new Advert(element.title, element.img, element.price, element.description, element.localisation, element.id_user);
          advert._id = element._id;

          if (advert.id_user == this.idUser) {
            this.advertsList.push(advert);
          }
        });
        console.log(this.advertsList);
      },
      error => {
        this.errorMessage = error.error['Message'];
      }

    );
  }

  //NavigateTo forms Page, if iser is login, else it navigate to login-page
  addAdvert() {
    if (this.idUser == null) {
      this.navCtrl.push(LoginPage);
    } else {
      this.navCtrl.push(FormAdvertPage);
    }
  }

  //NavigateTo Login-page
  login() {
    this.navCtrl.push(LoginPage);
  }

  //Log out current User
  logout() {
    var response = this.AuthService.logout();
    if (response) {
      this.presentToast("log Out");
      this.idUser = null;
      this.token = null;
    }
  }

  //Navigate to display-advert page
  displayAdvert(event, advert) {
    this.navCtrl.push(DisplayAdvertPage, {
      ad: advert
    });
  }

  //update Advert
  updateAdvert(event, advert) {
    console.log(advert);
    this.navCtrl.push(FormAdvertPage, {
      ad: advert
    });
  }

  //Display Alert for confirm delete Advert
  deleteAdvert(event, advert) {
    let alert = this.alertCtrl.create({
      title: 'Voulez-vous supprimer cette annonce',
      // message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'oui',

          handler: () => {
            this.callDeleteService(advert.id);
          }
        },
        {
          text: 'non',
          handler: () => {

          }
        }
      ]
    });
    alert.present();


    //todo ajouter le retour:

  }

  callDeleteService(id) {
    this.apiService.DeleteAdvert(id, this.token).subscribe(
      data => {
        if (data['value'] == true) {
          let alert = this.alertCtrl.create({
            title: 'annonce supprimée',
            subTitle: 'Succès',
            buttons: ['Ok']
          });
          alert.present();
        } else {

          let alert = this.alertCtrl.create({
            title: 'annonce supprimée',
            subTitle: 'une erreur c\'est produite',
            buttons: ['Ok']
          });
          alert.present();
        }
      },
      error => {

      }
    );
  }

  //display a toat with message params
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



}
