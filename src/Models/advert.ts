import { DateTime } from "ionic-angular/components/datetime/datetime";

export class Advert{

//     @param {String} title - titre de l'annonce (Requis)
//     @param {String} img - image de l'annonce (Requis)
//     @param {Number} price - prix de l'annonce (Requis)
//     @param {Date} create_at - date de création
//     @param {Date} update_at - date de modification
//     @param {String} description - description de l'annonce (Requis)
//    * @param {Number} localisation - Code postal (Requis)
    public id:number;
    public idUser:number;
    public createDate:DateTime;
    public updateDate:DateTime;

    constructor(public title:string = "", public img:string ="", public price:number = null, public description:string = "", public localisation:number = null ){
    

    }
}