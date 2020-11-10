import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getUser } from '../shared/utils/common-util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) {

  }

  canActivate() {
    if (getUser()) {
      return true;
    } else {
      this.router.navigate(['auth/sign-in']);
      return false;
    }

  }

}
