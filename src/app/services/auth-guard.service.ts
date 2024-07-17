import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocaleStorageService } from './locale-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router, private tokenStorage:LocaleStorageService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token = this.tokenStorage.getItem()?.split('.')[1];
  console.log("token",token);
  
  
    if(token)  {
      const tokenData = JSON.parse(atob(token));
      if(this._getTokenExp(tokenData.exp))
      return true
      }   
   
  this.router.navigateByUrl('/auth/login');
  return false;
  }
  private _getTokenExp(expiration:number):boolean {
    if(Math.floor(new Date().getTime() / 1000) >= expiration)
    return false;

    return true;
  }
}
