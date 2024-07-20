import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoAndSearchComponent } from './components/logo-and-search/logo-and-search.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { FollowersCardComponent } from './components/followers-card/followers-card.component';
import { PostSideComponent } from './components/post-side/post-side.component';
import { PostShareComponent } from './components/post-share/post-share.component';
import { PostsComponent } from './components/posts/posts.component';
import { RightSideComponent } from './components/right-side/right-side.component';
import { TrendCardComponent } from './components/trend-card/trend-card.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { InfoCardComponent } from './components//info-card/info-card.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostModalComponent } from './components/modals/post-modal/post-modal.component';
import { ProfileEditModalComponent } from './components/modals/profile-edit-modal/profile-edit-modal.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './components/auth/auth.module';
import { FollowerItemComponent } from './components/followers-card/follower-item/follower-item.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentItemComponent } from './components/comments/comment-item/comment-item.component';
import { MakeCommentComponent } from './components/comments/make-comment/make-comment.component';
import { GifsComponent } from './components/gifs/gifs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LogoAndSearchComponent,
    ProfileCardComponent,
    FollowersCardComponent,
    PostSideComponent,
    PostShareComponent,
    PostsComponent,
    RightSideComponent,
    TrendCardComponent,
    ProfilePageComponent,
    InfoCardComponent,
    AuthComponent,
    SignUpComponent,
    LoginComponent,
    PostModalComponent,
    ProfileEditModalComponent,
    FollowerItemComponent,
    CommentsComponent,
    CommentItemComponent,
    MakeCommentComponent,
    GifsComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DialogModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputMaskModule,
    FormsModule
  ],
  providers: [AuthGuardService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
