import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
   private actived_router:ActivatedRoute,
   private user_serveices:UsersService
  ) {}

  spec_user:User;

  isProfile: boolean = true;
  ngOnInit(): void {
    this.actived_router.params.subscribe((params) => {      
      this.user_serveices.getUserById(params['pid']).subscribe((user) => {
        this.spec_user = user;
        console.log(this.spec_user.posts);
        
      });  
    });
  }
}
