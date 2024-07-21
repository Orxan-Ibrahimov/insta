import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.scss']
})
export class StickersComponent implements OnInit {

  me:User;
  constructor(
    private localeStorageService:LocaleStorageService
  ) { }

  ngOnInit(): void {
    this.localeStorageService.me$.subscribe((me) => {
      this.me = me;      
      console.log('me:', this.me);
      
    });
  }

}
