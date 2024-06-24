import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Citizenship } from '../models/citizenship';

@Injectable({
  providedIn: 'root'
})
export class CitizenshipService {

  ApiUrl = environment.API_URL + 'citizenships';
  
  constructor(private http:HttpClient) { }

  get():Observable<Citizenship[]>{
   return this.http.get<Citizenship[]>(`${this.ApiUrl}`,)
  }
}

