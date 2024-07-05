/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  ApiUrl = environment.API_URL + 'users';

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.ApiUrl);
  }

  getUsersCount():Observable<number>{
    return this.http.get<number>(`${this.ApiUrl}/get/count`).pipe(map((value:any) => value.userCount));
  }

  getUserById(userId:string):Observable<User>{
    return this.http.get<User>(`${this.ApiUrl}/${userId}`);
  }

  addUser(user:User):Observable<User>{
    return this.http.post<User>(this.ApiUrl,user);
  }

  updateUser(user:User):Observable<User>{
    return this.http.put<User>(`${this.ApiUrl}/${user.id}`,user);
  }

  RemoveUser(userId:string):Observable<User>{
    return this.http.delete<User>(`${this.ApiUrl}/${userId}`);
  }
}
