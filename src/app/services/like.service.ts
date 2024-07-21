import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Citizenship } from '../models/citizenship';
import { Like } from '../models/like';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  ApiUrl = environment.API_URL + 'likes';

  constructor(private http: HttpClient) {}

  get(): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.ApiUrl}`);
  }
  add_like(like: Like): Observable<Like> {
    return this.http.post<Like>(this.ApiUrl, like);
  }
  delete(lid: string): Observable<Like> {
    return this.http.delete<Like>(`${this.ApiUrl}/${lid}`);
  }

  change_emotion(lid: string, like: Like): Observable<Like> {
    return this.http.put<Like>(`${this.ApiUrl}/${lid}`, like);
  }
}
