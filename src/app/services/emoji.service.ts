import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Citizenship } from '../models/citizenship';
import { Like } from '../models/like';
import { Emoji } from '../models/emoji';

@Injectable({
  providedIn: 'root',
})
export class EmojiService {
  ApiUrl = environment.API_URL + 'emojis';

  constructor(private http: HttpClient) {}

  get_emojis(): Observable<Emoji[]> {
    return this.http.get<Emoji[]>(`${this.ApiUrl}`);
  }

  get_emoji_by_id(eid:string): Observable<Emoji> {
    return this.http.get<Emoji>(`${this.ApiUrl}/${eid}`);
  }

}
