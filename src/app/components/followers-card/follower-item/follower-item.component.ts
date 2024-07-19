import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-follower-item',
  templateUrl: './follower-item.component.html',
  styleUrls: ['./follower-item.component.scss'],
})
export class FollowerItemComponent implements OnInit {
  constructor(
    private localeStorageService: LocaleStorageService,
    private usersService: UsersService
  ) {}

  @Input() follower: User;
  me: User;
  followed: boolean;

  Follow() {
    this.usersService.follow(this.me.id, this.follower.id).subscribe(
      (user) => {
        this.me = user;
        this.followed = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    this.localeStorageService.me$.subscribe((me) => {
      this.me = me;      
      this.me.followers.filter((follower) => {
        if (follower?.id === this.follower?.id) this.followed = true;
      });
    });
  }
}
