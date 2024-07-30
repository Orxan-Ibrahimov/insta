import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CommentLike } from '../models/comment_like';

@Injectable({
  providedIn: 'root',
})
export class CommentLikeService {
  ApiUrl = environment.API_URL + 'comment_likes';

  constructor(private http: HttpClient) {}

  get(): Observable<CommentLike[]> {
    return this.http.get<CommentLike[]>(`${this.ApiUrl}`);
  }

  get_like_by_id(clid:string): Observable<CommentLike> {
    return this.http.get<CommentLike>(`${this.ApiUrl}/${clid}`);
  }
  add_like(comment_like: CommentLike): Observable<CommentLike> {
    return this.http.post<CommentLike>(this.ApiUrl, comment_like);
  }
  delete(clid: string): Observable<CommentLike> {
    return this.http.delete<CommentLike>(`${this.ApiUrl}/${clid}`);
  }

  change_emotion(clid: string, comment_like: CommentLike): Observable<CommentLike> {
    return this.http.put<CommentLike>(`${this.ApiUrl}/${clid}`, comment_like);
  }
}
