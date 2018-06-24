import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import {DisplayAdvertPage } from '../pages/display-advert/display-advert';
import { FormAdvertPage } from '../pages/form-advert/form-advert';
import { AccountPage } from '../pages/account/account';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import {UtilsList} from '../Utils/lists-utils';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    DisplayAdvertPage,
    FormAdvertPage,
    AccountPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    DisplayAdvertPage,
    FormAdvertPage,
    AccountPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ApiServiceProvider,
    UtilsList,
    NativeStorage
  ]
})
export class AppModule {}
