import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Citizenship } from '../models/citizenship';
import { Like } from '../models/like';
import { Emoji } from '../models/emoji';
import { EmojiCategory } from '../models/emoji_category';

@Injectable({
  providedIn: 'root',
})
export class EmojiCategoryService {
  ApiUrl = environment.API_URL + 'emoji_categories';

  constructor(private http: HttpClient) {}

  get_emoji_categories(): Observable<EmojiCategory[]> {
    return this.http.get<EmojiCategory[]>(`${this.ApiUrl}`);
  }

  get_emoji_category_by_id(ecid:string): Observable<EmojiCategory> {
    return this.http.get<EmojiCategory>(`${this.ApiUrl}/${ecid}`);
  }

}
