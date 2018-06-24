import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

//Utils
import {UtilsList} from '../../Utils/lists-utils'
import { Advert } from '../../Models/advert';

//Pages
import { LoginPage } from '../login/login';
import { FormAdvertPage } from '../form-advert/form-advert';
import { AccountPage } from '../account/account';
import { DisplayAdvertPage } from '../display-advert/display-advert';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listAdvert:Advert[];
  idUser:number = 1;
  token:string = "";

  constructor(public navCtrl: NavController, public utilsList: UtilsList, private nativeStorage: NativeStorage, platform: Platform) {
    platform.ready().then(() => {
      //   // Okay, so the platform is ready and our plugins are available.
      //   // Here you can do any higher level native things you might need.
      this.nativeStorage.getItem('user').then(
        (data) => {
          let user = JSON.parse(data);
          // this.idUser = user['id'];
          // this.token = user['access_token'];
        },
        () => console.log("error")

      );
    });
    this.listAdvert = this.utilsList.ListAdvert ;

    this.listAdvert.forEach(element => {
      element.idUser = 1;
    });
    
  }

  addAdvert(){
    console.log("sdssssss");
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

  updateAdvert(){
    this.navCtrl.push(FormAdvertPage, {
      idAdvert: 1
    });
  }
  displayAdvert(){
    this.navCtrl.push(DisplayAdvertPage, {
      idAdvert: 1
    });
  }

}
