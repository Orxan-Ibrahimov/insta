import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ApiUrl = environment.API_URL + 'users';
  
  constructor(private http:HttpClient) { }

  login(nickname:string, password:string):Observable<User>{
   return this.http.post<User>(`${this.ApiUrl}/login`,{nickname,password})
  }
}

