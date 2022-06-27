import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoAndSearchComponent } from './components/logo-and-search/logo-and-search.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { FollowersCardComponent } from './components/followers-card/followers-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LogoAndSearchComponent,
    ProfileCardComponent,
    FollowersCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
