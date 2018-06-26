import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Page
import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import {UserAdvertsPage } from '../user-adverts/user-adverts'
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UserAdvertsPage;
  tab3Root = AccountPage;

}
