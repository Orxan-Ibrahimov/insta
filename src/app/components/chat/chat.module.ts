import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { DefaultRoomComponent } from './default-room/default-room.component';
import { PersonRoomComponent } from './person-room/person-room.component';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'okay' },
      { path: 'okay', component: DefaultRoomComponent },
      { path: ':friend', component: PersonRoomComponent },
    ],
  },
];

@NgModule({
  declarations: [DefaultRoomComponent, PersonRoomComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ChatModule {}
