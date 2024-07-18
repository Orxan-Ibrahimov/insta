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
  me: User;
  special_posts:Post[];
   
  ngOnInit(): void {
    
    this.localeStorageService.me$.subscribe((me) => {
      this.me = me;
    });
    this.postService.getPosts().subscribe((posts) => {      
      this.postService.data$.subscribe((data) => {
        this.special_posts = data.sort((a, b) => {return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()});
      });
    });
  }
}
