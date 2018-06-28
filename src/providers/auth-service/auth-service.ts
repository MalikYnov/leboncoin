
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import {ConfigUrlApi} from '../../Utils/ConfigUrlApi';
import { NativeStorage } from '@ionic-native/native-storage';

//Models
import { User } from '../../Models/user';

@Injectable()
export class AuthServiceProvider {

    constructor(public http:HttpClient, private configUrlApi:ConfigUrlApi, public nativeStorage:NativeStorage){

    }
    
    loginUser(email:string, password:string):Observable<any>{
        var obj = { email: email, password: password};
        let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let _options = { headers: header };
        let body = this.serializeObj(obj);
        let RequestOptions = new Option()
        return this.http.post(this.configUrlApi.LoginUrlApi, body, _options);
    }

    registerUser(user:User):Observable<any>{
        let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let body = this.serializeObj(user);
        console.log(body);
        let _options = { headers: header };
        return this.http.post(this.configUrlApi.RegisternUrlApi, body ,_options)
      }
    logout():boolean {
        this.nativeStorage.remove('user').then(
            () => {
                return true
            },
            () =>{
                return false
            } 
          );

          return false;

    }
    private serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    
        return result.join("&");
    }
}
