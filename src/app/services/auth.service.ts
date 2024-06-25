import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocaleStorageService } from './locale-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ApiUrl = environment.API_URL + 'users';
  
  constructor(
    private http:HttpClient, 
    private localStorageService: LocaleStorageService,
    private router:Router
  ) { }

  login(nickname:string, password:string):Observable<User>{
   return this.http.post<User>(`${this.ApiUrl}/login`,{nickname,password})
  }

  logout(){    
    this.localStorageService.removeItem();
    this.router.navigate(['/auth/login']);
  }

  register(first_name:string, last_name:string,nickname:string, password:string, citizenship:string):Observable<User>{
    return this.http.post<User>(`${this.ApiUrl}/register`,{first_name,last_name,nickname,password,citizenship})
   }
}

