import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

//Providers
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'
import {ApiServiceProvider} from '../../providers/api-service/api-service'

//page
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private userForm: FormGroup;
  private isRunning: boolean = false;
  private formLoginVisible: boolean = true;
  private errorMessage: string;
  rootRegisterPage: any;

  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage,
    private _authService: AuthServiceProvider, public apiService: ApiServiceProvider) {
    
    

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.nativeStorage.getItem('user').then(
        () => console.log("isValable"),
        () => console.log('noValabe')
      );
    });

    this.userForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.rootRegisterPage = RegisterPage;
  }

  onConect() {
    this.formLoginVisible = false;
    this.isRunning = true;
    var user = this._authService.loginUser(this.userForm.value.email, this.userForm.value.password).subscribe(
      data => {
        console.log(data);
        if (data['token']) {
          this.nativeStorage.setItem('user', JSON.stringify(data)).then(
            () => {
              console.log('Stored item!');
              this.navCtrl.push(TabsPage);
            },
            error => console.error('Error storing item', error)
          );
        } else {
          this.errorMessage = "Une erreur c'est produite";
        }
      },
      error => {
        this.isRunning = false;
        this.formLoginVisible = true;
        console.error(error);
        this.errorMessage = error.error['Message'];
      }
    );

  }

}
