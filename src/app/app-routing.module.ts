import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AuthComponent } from './components/auth/auth.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  { path: '', component: AuthComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]  },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuardService] },
  { path: '**', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, DialogModule, ButtonModule],
})
export class AppRoutingModule {}
