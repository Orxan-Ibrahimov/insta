/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  private userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  data$: Observable<User[]> = this.userSubject.asObservable();

  updateData(new_user: User[]) {
    this.userSubject.next(new_user);
  }

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

  updateUser(user:FormData, id:string):Observable<User>{
    return this.http.put<User>(`${this.ApiUrl}/${id}`,user);
  }

  follow(uid:string, fid:string):Observable<User>{
    return this.http.get<User>(`${this.ApiUrl}/${uid}/${fid}`);
  }

  RemoveUser(userId:string):Observable<User>{
    return this.http.delete<User>(`${this.ApiUrl}/${userId}`);
  }
}
