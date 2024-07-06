/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/postData';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  ApiUrl = environment.API_URL + 'posts';

  getPosts():Observable<Post[]>{    
    return this.http.get<Post[]>(this.ApiUrl);
  }

  // getUsersCount():Observable<number>{
  //   return this.http.get<number>(`${this.ApiUrl}/get/count`).pipe(map((value:any) => value.userCount));
  // }

  getPostById(pid:string):Observable<Post>{
    return this.http.get<Post>(`${this.ApiUrl}/${pid}`);
  }

  addPost(post:FormData):Observable<Post>{
    return this.http.post<Post>(this.ApiUrl,post);
  }

  // updateUser(user:User):Observable<User>{
  //   return this.http.put<User>(`${this.ApiUrl}/${user.id}`,user);
  // }

  // RemoveUser(userId:string):Observable<User>{
  //   return this.http.delete<User>(`${this.ApiUrl}/${userId}`);
  // }
}
