import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {ChatService} from '../../providers/chat-service/chat-service';
/**
 * Generated class for the ToastEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-toast-event',
  templateUrl: 'toast-event.html',
})
export class ToastEventPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private chatService:ChatService) {
    this.chatService.listenOnAddAdvert();
    this.chatService.onAddContact("aa");
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToastEventPage');
  }

}
