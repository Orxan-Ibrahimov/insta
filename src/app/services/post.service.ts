/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/postData';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  ApiUrl = environment.API_URL + 'posts';

  constructor(private http: HttpClient) {
    this.getPosts().subscribe((data) => {
      this.dataSubject.next(data);
    });
  }
  private dataSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(
    []
  );
  private current_post_subject: BehaviorSubject<Post> =
    new BehaviorSubject<Post>(null);
  data$: Observable<Post[]> = this.dataSubject.asObservable();
  current_post$: Observable<Post> = this.current_post_subject.asObservable();

  update_current_post(new_post: Post) {    
    this.current_post_subject.next(new_post);
  }

  updateData(newData: Post[]) {
    this.dataSubject.next(newData);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.ApiUrl).pipe();
  }

  // getUsersCount():Observable<number>{
  //   return this.http.get<number>(`${this.ApiUrl}/get/count`).pipe(map((value:any) => value.userCount));
  // }

  getPostById(pid: string): Observable<Post> {
    return this.http.get<Post>(`${this.ApiUrl}/${pid}`);
  }

  addPost(post: FormData): Observable<Post> {
    return this.http.post<Post>(this.ApiUrl, post);
  }

  // updateUser(user:User):Observable<User>{
  //   return this.http.put<User>(`${this.ApiUrl}/${user.id}`,user);
  // }

  // RemoveUser(userId:string):Observable<User>{
  //   return this.http.delete<User>(`${this.ApiUrl}/${userId}`);
  // }
}
