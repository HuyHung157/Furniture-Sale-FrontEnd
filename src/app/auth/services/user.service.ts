import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { AuthService } from './auth.service';
import jwtDecode from 'jwt-decode';
import { UserGqlService } from './user.gql.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string;
  private user: any;
  private userProfile: any;


  constructor(
    @Inject(BROWSER_STORAGE) public storage: Storage,
    private readonly authService: AuthService,
    private readonly userGqlService: UserGqlService
  ) { }

  signInByGoogle() {
    return this.authService.loginWithGoogle();
  }

  signIn(input): Observable<any>{
    return this.userGqlService.signIn(input).pipe(
      map((res: any) => res?.data?.signIn)
    )
  }

  signUp(input): Observable<any>{
    return this.userGqlService.signUp(input).pipe(
      map((res: any) => res?.data?.signUp)
    )
  }


  public getUserProfile() {
    return this.userProfile;
  }

  public logout() {
    this.user = undefined;
    this.authService.clearUserToken();
    this.authService.setLogged(false);
  }

  public getUser() {
    return this.user;
  }

}
