import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userToken:BehaviorSubject<any>=new BehaviorSubject(null)

  constructor( private _httpClient:HttpClient) { }
  
  setUserToken(){
    let token =localStorage.getItem('token')
    if(token !== null){
      this.userToken.next(token)
    }
  }

  handelSiginUp(userInfo:UserData):Observable<any>{
    return this._httpClient.post(environment.baseUrl+'signup',userInfo )
   
  }
  handelSiginin(userInfo:UserData):Observable<any>{
    return this._httpClient.post(environment.baseUrl+'signin',userInfo )
   
  }
}
