import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Like } from '../models/like';
import { GIF } from '../models/gif';
import { ChatGroup } from '../models/chat_group';

@Injectable({
  providedIn: 'root',
})
export class ChatGroupService {
  ApiUrl = environment.API_URL + 'chat_groups';

  constructor(private http: HttpClient) {}

  get_chat_groups(): Observable<ChatGroup[]> {
    return this.http.get<ChatGroup[]>(`${this.ApiUrl}`);
  }

  get_chat_group_by_id(id:string): Observable<ChatGroup> {
    return this.http.get<ChatGroup>(`${this.ApiUrl}/${id}`);
  }
}
