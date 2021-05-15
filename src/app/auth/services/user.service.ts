import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { AuthService } from './auth.service';
import jwtDecode from 'jwt-decode';

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

  private logged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(
    @Inject(BROWSER_STORAGE) public storage: Storage,
    public authService: AuthService
  ) { }

  signInByGoogle() {
    return this.authService.GoogleAuth();
  }


  public getUserProfile() {
    return this.userProfile;
  }

  public setUserProfile(userProfile) {
    this.userProfile = userProfile;
  }

  public setUserToken(signin: { token: string }) {
    this.storage.setItem(CommonConstant.USER_TOKEN, JSON.stringify(signin));
    this.setUser(signin);
  }

  public getToken() {
    return this.token;
  }

  public logout() {
    this.user = undefined;
    this.clearUserToken();
    this.setLogged(false);
  }

  public getUser() {
    return this.user;
  }

  public setLogged(status: boolean) {
    this.logged$.next(status);
  }

  public getLogged() {
    return this.logged$.asObservable();
  }

  private refreshUserToken() {
    const userToken = this.storage.getItem(CommonConstant.USER_TOKEN);
    if (userToken) {
      const token = JSON.parse(userToken);
      this.setUser(token);
      this.setLogged(true);
    }
  }

  private setUser(signin: { token: string }) {
    this.token = signin.token;
    this.user = jwtDecode(this.token);
    this.setLogged(true);
  }

  private clearUserToken() {
    this.storage.removeItem(CommonConstant.USER_TOKEN);
    this.token = undefined;
  }
}
