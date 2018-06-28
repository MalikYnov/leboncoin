import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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

  public advertsList: Array<Advert> = new Array<Advert>();
  
  idUser:string = "5b33b96d113f671da032f676";
  token:string = "";
  errorMessage:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsList: UtilsList, private nativeStorage: NativeStorage, platform: Platform,
     public apiService: ApiServiceProvider, private alertCtrl: AlertController) {

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
    
    this.apiService.getAllAdverts().subscribe(
      data => {
        console.log(data);
        data.forEach(element => {
          let advert = new Advert(element.title, element.img, element.price, element.description, element.localisation, element.id_user);
          advert.id = element._id;
          if(advert.id_user == this.idUser){
            this.advertsList.push(advert);
          }
        });
        console.log(this.advertsList);
      },
      error => {
        this.errorMessage = error.error['Message'];
      }
      
    );
  }
    
      addAdvert(){
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
    
      updateAdvert(event, advert){
        console.log(advert);
        this.navCtrl.push(FormAdvertPage, {
          ad: advert
        });
      }
      displayAdvert(event, advert){
        this.navCtrl.push(DisplayAdvertPage, {
          ad: advert
        });
      }
      deleteAdvert(event, advert){
        let alert = this.alertCtrl.create({
          title: 'Voulez-vous supprimer cette annonce',
          // message: 'Do you want to buy this book?',
          buttons: [
            {
              text: 'oui',
    
              handler: () => {
                this.callDeleteService(advert.id);
              }
            },
            {
              text: 'non',
              handler: () => {
                
              }
            }
          ]
        });
        alert.present();

          
        //todo ajouter le retour:

      }

      callDeleteService(id){
        this.apiService.DeleteAdvert(id, this.token).subscribe(
          data =>{
              if(data['value'] == true){
                let alert = this.alertCtrl.create({
                  title: 'annonce supprimée' ,
                  subTitle: 'Succès',
                  buttons: ['Ok']
                });
                alert.present();
              }else{

                  let alert = this.alertCtrl.create({
                    title: 'annonce supprimée' ,
                    subTitle: 'une erreur c\'est produite',
                    buttons: ['Ok']
                  });
                  alert.present();
              }
          }, 
          error => {

          }
        );
      }

}
