import { DateTime } from "ionic-angular/components/datetime/datetime";

export class Advert{
    public id:number;
    public createDate:DateTime;
    public updateDate:DateTime;

    constructor(public title:string = "", public picture:string ="", public price:number = null, public description:string = "", public location:number = null ){
    

    }
}