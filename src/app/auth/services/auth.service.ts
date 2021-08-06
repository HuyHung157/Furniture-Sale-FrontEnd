import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { BehaviorSubject, pipe } from 'rxjs';
import { Injector } from '@angular/core';
import { BROWSER_STORAGE } from './user.service';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private toastr: ToastrService;
  private token: string;
  private user: any;
  private userProfile: any;

  private logged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(BROWSER_STORAGE) public storage: Storage,
    public afAuth: AngularFireAuth,
    private readonly router: Router,
    injector: Injector
  ) { 
    this.toastr = injector.get(ToastrService);
  }

  loginWithGoogle() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.toastr.success('Đăng nhập thành công!');
        this.router.navigate(['admin']);
      }).catch((error) => {
        this.toastr.error(error);
      });
  }

  public setUserToken(signin: { token: string }) {
    this.storage.setItem(CommonConstant.USER_TOKEN, JSON.stringify(signin));
    this.setUser(signin);
  }

  public getToken() {
    return this.token;
  }

  private refreshUserToken() {
    const userToken = this.storage.getItem(CommonConstant.USER_TOKEN);
    if (userToken) {
      const token = JSON.parse(userToken);
      this.setUser(token);
    }
  }

  private setUser(signin: { token: string }) {
    this.token = signin.token;
    this.user = jwtDecode(this.token);
    this.setLogged(true);
  }

  public clearUserToken() {
    this.storage.removeItem(CommonConstant.USER_TOKEN);
    this.token = undefined;
  }

  public setLogged(status: boolean) {
    this.logged$.next(status);
  }

  public getLogged() {
    return this.logged$.asObservable();
  }

}
