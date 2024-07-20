import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Citizenship } from '../models/citizenship';
import { Like } from '../models/like';
import { GIF } from '../models/gif';

@Injectable({
  providedIn: 'root',
})
export class GIFService {
  ApiUrl = environment.API_URL + 'gifs';

  constructor(private http: HttpClient) {}

  get_searching_gifs(search: string): Observable<GIF[]> {
    return this.http.get<GIF[]>(`${this.ApiUrl}?search=${search}`);
  }

  // get_gifs(): Observable<GIF[]> {
  //   return this.http.get<GIF[]>(`${this.ApiUrl}`);
  // }

  delete(lid: string): Observable<Like> {
    return this.http.delete<Like>(`${this.ApiUrl}/${lid}`);
  }
}
