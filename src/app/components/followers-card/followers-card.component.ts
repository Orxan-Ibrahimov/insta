import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-followers-card',
  templateUrl: './followers-card.component.html',
  styleUrls: ['./followers-card.component.scss'],
})
export class FollowersCardComponent implements OnInit {
  followers:User[];
  constructor(
    private usersService:UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((all_users) => {
      this.followers = all_users.slice(0,5);
    });
  }
}
