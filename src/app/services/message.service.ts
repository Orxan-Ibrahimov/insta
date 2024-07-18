/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  ApiUrl = environment.API_URL + 'messages';

  constructor(private http:HttpClient) {
    this.getMessages().subscribe((messages) => {
      this.messageSubject.next(messages);
    });
   }
  private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  messages$: Observable<Message[]> = this.messageSubject.asObservable();

  updateData(newData: Message[]) {
    this.messageSubject.next(newData);
  }

  getMessages():Observable<Message[]>{    
    return this.http.get<Message[]>(this.ApiUrl);
  }

  // getUsersCount():Observable<number>{
  //   return this.http.get<number>(`${this.ApiUrl}/get/count`).pipe(map((value:any) => value.userCount));
  // }

  getMessageById(mid:string):Observable<Message>{
    return this.http.get<Message>(`${this.ApiUrl}/${mid}`);
  }

  addMessage(message:FormData):Observable<Message>{
    return this.http.post<Message>(this.ApiUrl,message);
  }

  updateMessage(message:Message):Observable<Message>{
    return this.http.put<Message>(`${this.ApiUrl}/${message.id}`,message);
  }

  RemoveMessage(message_Id:string):Observable<Message>{
    return this.http.delete<Message>(`${this.ApiUrl}/${message_Id}`);
  }
}
