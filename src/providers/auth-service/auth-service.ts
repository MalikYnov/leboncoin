
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ConfigUrlApi} from '../../Utils/ConfigUrlApi';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthServiceProvider {

    constructor(public http:HttpClient, private config:ConfigUrlApi){

    }
    
    loginUser(email:string, password:string):Observable<any>{
        var obj = { username: email, password: password,grant_type: "password"};
        let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let _options = { headers: header };
        let body = this.serializeObj(obj);
        let RequestOptions = new Option()
        return this.http.post(this.config.LoginUrlApi, body, _options);
    

    }

    logout() {
        // remove user from local storage to log user out

    }
    private serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    
        return result.join("&");
    }
}
