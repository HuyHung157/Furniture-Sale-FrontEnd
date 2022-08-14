import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthModeEnum } from '../enums/auth-mode.enum';

@Injectable()
export class AuthResolver implements Resolve<any> {
  constructor(private readonly router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const mode = route.queryParams['mode'];
    if (!mode) {
      return;
    }
    const code = route.queryParams['oobCode'];
    if (mode === AuthModeEnum.RESET_PASSWORD) {
      this.router.navigate(['auth' , 'reset-password'], { queryParams: { oobCode: code } }); 
    }
    if (mode === AuthModeEnum.VERIFY_EMAIL) {
      this.router.navigate(['auth' , 'verify-email'], { queryParams: { oobCode: code } });
    }
  }
}
