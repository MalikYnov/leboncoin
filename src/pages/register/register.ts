import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

//Providers
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'
import {ApiServiceProvider} from '../../providers/api-service/api-service'

//page
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private registerForm: FormGroup;
  private isRunning: boolean = false;
  private registerFormVisible: boolean = true;
  private errorMessage: string;
  
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
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser(){
    if(this.registerForm.value.password != this.registerForm.value.confirmPassword ){
      this.errorMessage = "Les 2 mots de passe doivent être identiques !"
    }else{
      
    }
  }

}
