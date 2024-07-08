import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';

@Component({
  selector: 'app-follower-item',
  templateUrl: './follower-item.component.html',
  styleUrls: ['./follower-item.component.scss']
})
export class FollowerItemComponent implements OnInit {

  constructor(
    private localeStorageService:LocaleStorageService

  ) { }

  @Input() follower: User;
  me:User;

  
  ngOnInit(): void {
    this.localeStorageService.me().subscribe((me) => {
      this.me = me;
    });
  }

}
