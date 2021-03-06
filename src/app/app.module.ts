import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    TrendCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
