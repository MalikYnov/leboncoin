import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

//Utils
import {UtilsList} from '../../Utils/lists-utils'
import {ConfigUrlApi} from '../../Utils/ConfigUrlApi'

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


import * as io from "socket.io-client";
import { NgZone } from '@angular/core/src/zone/ng_zone';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public advertsList: Array<Advert> = new Array<Advert>();
  public idUser:string = "null";
  public token:string = "null";
  public socket:any;
  public zone:any;
  public errorMessage:string;


  constructor(public navCtrl: NavController, public utilsList: UtilsList, private configUrlApi:ConfigUrlApi, private nativeStorage: NativeStorage, platform: Platform, 
    public apiService: ApiServiceProvider, private toastCtrl: ToastController, private AuthService:AuthServiceProvider) {
    this.socketConnect();
    platform.ready().then(() => {
      //   // Okay, so the platform is ready and our plugins are available.
      //   // Here you can do any higher level native things you might need.
      this.nativeStorage.getItem('user').then(
        (data) => {
          this.presentToast(data);
          let user = JSON.parse(data);
          this.idUser = user['id_user'];
          this.token = user['token'];
        },
        () => {
          this.presentToast("error")
        }
      );
    });


     this.apiService.getAllAdverts(this.token).subscribe(
       data => {
         console.log(data);
         data.forEach(element => {
           let advert = new Advert(element.title, element.img, element.price, element.description, element.localisation, element.id_user);
           advert._id = element._id;
           this.advertsList.push(advert);
         });
         console.log(this.advertsList);
       },
       error => {
         this.errorMessage = error.error['Message'];
       }
       
     );
  }

  addAdvert(){
    
    if(this.idUser == null){
       this.navCtrl.push(LoginPage);
    }else{
      this.navCtrl.push(FormAdvertPage);
    }
  }
  login(){
    if(this.idUser == null){
       this.navCtrl.push(LoginPage);
    }else{
      this.navCtrl.push(AccountPage);
    }
  }
  logout(){
    var response = this.AuthService.logout();
    if(response){
      this.presentToast("déconnecté");
      this.idUser = null;
      this.token = null;
    }
  }

  displayAdvert(event, advert){
    this.navCtrl.push(DisplayAdvertPage, {
      ad: advert
    });
  }

  socketConnect() {
    this.socket = io.connect(this.configUrlApi.socketHost);
    this.zone = new NgZone({enableLongStackTrace: false})
    this.socket.on('connect', (msg) => {
      this.zone.run(() =>{
      this.presentToast(msg);
      }
    );
    });
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 6000,
      position: 'top'
    });
    
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
