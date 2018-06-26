import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import {DisplayAdvertPage } from '../pages/display-advert/display-advert';
import { FormAdvertPage } from '../pages/form-advert/form-advert';
import { AccountPage } from '../pages/account/account';
import { UserAdvertsPage } from '../pages/user-adverts/user-adverts';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import {UtilsList} from '../Utils/lists-utils';
import {ConfigUrlApi} from '../Utils/ConfigUrlApi';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    DisplayAdvertPage,
    FormAdvertPage,
    AccountPage,
    RegisterPage,
    UserAdvertsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    DisplayAdvertPage,
    FormAdvertPage,
    AccountPage,
    RegisterPage,
    UserAdvertsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ApiServiceProvider,
    UtilsList,
    NativeStorage,
    HttpClientModule,
    ConfigUrlApi
  ]
})
export class AppModule {}
