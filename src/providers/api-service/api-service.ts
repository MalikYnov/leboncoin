import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConfigUrlApi} from '../../Utils/ConfigUrlApi'
import { Observable } from 'rxjs/Observable';

//Model 
import {Advert} from '../../Models/advert'

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  constructor(public http: HttpClient, private configUrlApi:ConfigUrlApi) {
  }

  getAllAdverts(token:string):Observable<any>{
    
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    header = header.append('x-access-token',token);
    let _options = { headers: header };
    return this.http.get(this.configUrlApi.AdvertUrlApi, _options);
  }

  postAdvert(advert:Advert,token:string):Observable<any>{
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
  
    header = header.append('x-access-token',token);
    let body = this.serializeObj(advert);
    let _options = { headers: header };
    return this.http.post(this.configUrlApi.AdvertUrlApi, body ,_options)
  }

  PutAdvert(advert:Advert,token:string):Observable<any>{
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    header = header.append('x-access-token',token);
    let body = this.serializeObj(advert);
    let _options = { headers: header };
    return this.http.put(this.configUrlApi.AdvertUrlApi + '/' + advert._id, body ,_options)
  }

  DeleteAdvert(advertId,token:string):Observable<any>{
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    header = header.append('x-access-token',token);
    let _options = { headers: header };
    return this.http.delete(this.configUrlApi.AdvertUrlApi + '/' + advertId, _options);
  }

  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}

}
