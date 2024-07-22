import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Citizenship } from '../models/citizenship';
import { Emotion } from '../models/emotion';

@Injectable({
  providedIn: 'root'
})
export class EmotionService {

  ApiUrl = environment.API_URL + 'emotions';
  
  constructor(private http:HttpClient) { 
    this.get_default_emotion('I liked it').subscribe(s => {      
      this.update_current_emotion(s);
    });
  }


  private current_emotion_subject: BehaviorSubject<Emotion> =
  new BehaviorSubject<Emotion>(null);

  current_emotion$: Observable<Emotion> = this.current_emotion_subject.asObservable();

  update_current_emotion(emotion: Emotion) {
    
    this.current_emotion_subject.next(emotion);
  }

  get_emotions():Observable<Emotion[]>{
   return this.http.get<Emotion[]>(`${this.ApiUrl}`,)
  }

  get_default_emotion(name:string):Observable<Emotion>{
    return this.http.get<Emotion>(`${this.ApiUrl}/get?search=${name}`,)
   }
}

