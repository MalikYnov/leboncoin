import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'


/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, public nativeStorage:NativeStorage, public authService:AuthServiceProvider) {
    platform.ready().then(() => {
      //   // Okay, so the platform is ready and our plugins are available.
      //   // Here you can do any higher level native things you might need.

      this.nativeStorage.getItem('user').then(
        (data) => {
          this.user = JSON.parse(data);
        },
        () => this.navCtrl.push(LoginPage)

      );
    });
    
  }

  disconect() {
    var response = this.authService.logout();
     if(response){
       this.navCtrl.push(TabsPage);
     }
  }

}
