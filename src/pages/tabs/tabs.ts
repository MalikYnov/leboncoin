import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Page
import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import {UserAdvertsPage } from '../user-adverts/user-adverts'


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
