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
  Posts: Post[];
  // [
  //   {id: 1, name: "Tzuyu", likes: 2300, liked:true, desc: "Happy New Year All friends! #2023", image:"postpic1.jpg" },
  //   {id: 2, name: "Maryam", likes: 2300, liked:false, desc: "Party time :)", image:"postpic2.jpg" },
  //   {id: 3, name: "Selena Gomez", likes: 800, liked:false, desc: "At Archery Festival", image:"postpic3.JPG" },
  // ]

  PostRefreshed(){
    this.postService.getPosts().subscribe((updated_posts) => {
      this.Posts = updated_posts;
    });
  }
  ngOnInit(): void {
    let token = this.localeStorageService.getItem();
    let decodedToken = this.jwtService.decodeToken(token);
    this.usersService
      .getUserById(decodedToken.userId)
      .subscribe((db_user: User) => {
        this.Posts = db_user.posts;        
      });
  }
}
