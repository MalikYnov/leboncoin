import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Socket } from 'ng-socket-io';

//Utils

//Models
import { Advert } from '../../Models/advert';

//Pages
import { LoginPage } from '../login/login';
import { FormAdvertPage } from '../form-advert/form-advert';
import { AccountPage } from '../account/account';
import { DisplayAdvertPage } from '../display-advert/display-advert';

//Providers
import {ApiServiceProvider} from '../../providers/api-service/api-service';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'
import { ChatService } from '../../providers/chat-service/chat-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public advertsList: Array<Advert> = new Array<Advert>();
  public idUser:string = "null";
  public token:string = "null";
  public zone:any;
  public errorMessage:string;


  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, public platform: Platform,public apiService: ApiServiceProvider,
     private toastCtrl: ToastController, private AuthService:AuthServiceProvider) {

    platform.ready().then(() => {
      //   // Okay, so the platform is ready and our plugins are available.
      //   // Here you can do any higher level native things you might need.
      this.nativeStorage.getItem('user').then(
        (data) => {
          let user = JSON.parse(data);
          this.idUser = user['id_user'];
          this.token = user['token'];
        },
        () => {
          this.presentToast("error")
        }
      );
    });

    //Get all Adverts
     this.apiService.getAllAdverts(this.token).subscribe(
       data => {
         data.forEach(element => {
           let advert = new Advert(element.title, element.img, element.price, element.description, element.localisation, element.id_user);
           advert._id = element._id;
           this.advertsList.push(advert);
         });
       },
       error => {
         this.presentToast(error.error['Message']);
       }
       
     );
  }

  //NavigateTo forms Page, if iser is login, else it navigate to login-page
  addAdvert(){
    if(this.idUser == null){
       this.navCtrl.push(LoginPage);
    }else{
      this.navCtrl.push(FormAdvertPage);
    }
  }

  //NavigateTo Login-page
  login(){
    this.navCtrl.push(LoginPage);
  }

  //Log out current User
  logout(){
    var response = this.AuthService.logout();
    if(response){
      this.presentToast("log Out");
      this.idUser = null;
      this.token = null;
    }
  }

  //Navigate to display-advert page
  displayAdvert(event, advert){
    this.navCtrl.push(DisplayAdvertPage, {
      ad: advert
    });
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
