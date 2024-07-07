import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/postData';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-post-side',
  templateUrl: './post-side.component.html',
  styleUrls: ['./post-side.component.scss'],
})
export class PostSideComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private localeStorageService: LocaleStorageService,
    private usersService: UsersService,
    private postService: PostService
  ) {}

  @Input('profilePage') myProfile: boolean;
  user: User;
  special_posts:Post[];

  PostRefreshed() {
    this.postService.getPosts().subscribe((updated_posts) => {
      this.special_posts = updated_posts;
    });
  }


   
  ngOnInit(): void {
    
    let token = this.localeStorageService.getItem();
    let decodedToken = this.jwtService.decodeToken(token);
    this.usersService
      .getUserById(decodedToken.userId)
      .subscribe((db_user: User) => {
        this.user = db_user;
        // console.log(this.user);

      });
    this.postService.getPosts().subscribe((posts) => {
      this.special_posts = posts;
    });
  }
}
