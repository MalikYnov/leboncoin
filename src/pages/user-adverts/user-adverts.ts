import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

//Providers
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { ApiServiceProvider } from '../../providers/api-service/api-service'
/**
 * Generated class for the UserAdvertsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-adverts',
  templateUrl: 'user-adverts.html',
})
export class UserAdvertsPage {

  listAdvert:Advert[];
  idUser:number = 1;
  token:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsList: UtilsList, private nativeStorage: NativeStorage, platform: Platform, public apiServiceProvider: ApiServiceProvider) {

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
          element.id = 1;
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
        // if(this.idUser == null){
        //    this.navCtrl.push(LoginPage);
        // }else{
        //   this.navCtrl.push(AccountPage);
        // }
        this.navCtrl.push(LoginPage);
        
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
      deleteAdvert(event, advert){
        this.apiServiceProvider.DeleteAdvert(advert.id, this.token);
        //todo ajouter le retour:

      }


}
