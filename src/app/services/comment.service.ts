/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { GIF } from '../models/gif';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  ApiUrl = environment.API_URL + 'comments';

  constructor(private http:HttpClient) {
    this.getComments().subscribe((comments) => {
      this.commentSubject.next(comments);
    });
   }
  private commentSubject: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  private image_subject: BehaviorSubject<GIF> = new BehaviorSubject<GIF>(null);
  comments$: Observable<Comment[]> = this.commentSubject.asObservable();
  image$: Observable<GIF> = this.image_subject.asObservable();

  updateData(newData: Comment[]) {
    this.commentSubject.next(newData);
  }

  update_image(comment: GIF) {
    this.image_subject.next(comment);
  }

  getComments():Observable<Comment[]>{    
    return this.http.get<Comment[]>(this.ApiUrl);
  }

  // getUsersCount():Observable<number>{
  //   return this.http.get<number>(`${this.ApiUrl}/get/count`).pipe(map((value:any) => value.userCount));
  // }

  getCommentById(cid:string):Observable<Comment>{
    return this.http.get<Comment>(`${this.ApiUrl}/${cid}`);
  }

  addComment(comment:FormData):Observable<Comment>{
    return this.http.post<Comment>(this.ApiUrl,comment);
  }

  updateComment(comment:Comment):Observable<Comment>{
    return this.http.put<Comment>(`${this.ApiUrl}/${comment.id}`,comment);
  }

  RemoveComment(comment_Id:string):Observable<Comment>{
    return this.http.delete<Comment>(`${this.ApiUrl}/${comment_Id}`);
  }
}
