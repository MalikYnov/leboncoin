import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

//pages
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

//Providers
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, public nativeStorage:NativeStorage, public authService:AuthServiceProvider) {
    platform.ready().then(() => {
      this.nativeStorage.getItem('user').then(
        (data) => {
          this.user = JSON.parse(data);
        },
        () => this.navCtrl.push(LoginPage)
      );
    });
  }
  
  //logOut user
  logOut() {
    var response = this.authService.logOut();
     if(response){
       this.navCtrl.push(TabsPage);
     }
  }

}
