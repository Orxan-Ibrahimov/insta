import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-logo-and-search',
  templateUrl: './logo-and-search.component.html',
  styleUrls: ['./logo-and-search.component.scss'],
})
export class LogoAndSearchComponent implements OnInit {
  constructor(
    private localeStorageService: LocaleStorageService,
    private usersService: UsersService
  ) {}

  searching_users: User[];
  me: User;
  search: string;

  onSearch() {
    this.usersService.getUsers().subscribe((all_users) => {
     if(this.search){
      this.searching_users = all_users.filter((user) =>
        user.nickname.includes(this.search)
      ).slice(0,5);
     }
     else this.searching_users = [];

    });
  }
  ngOnInit(): void {
    this.localeStorageService.me$.subscribe((me) => {
      this.me = me;
    });

  }
}