import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject, pipe } from 'rxjs';
import { Injector } from '@angular/core';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import jwtDecode from 'jwt-decode';
import { UserGqlService } from './user.gql.service';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';

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
    public afAuth: AngularFireAuth,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
    private readonly authLocalGqlService: UserGqlService,
    injector: Injector
  ) { 
    this.toastr = injector.get(ToastrService);
  }

  

  public setUserToken(signin: { token: string }) {
    this.localStorageService.setItem(CommonConstant.USER_TOKEN, JSON.stringify(signin));
    this.setUser(signin);
  }

  public getToken() {
    return this.token;
  }

  public checkEmailExisted(email: string) {
    return this.authLocalGqlService.checkEmailExisted(email)
    .pipe(
      map( (res: any) => res.data.checkEmailUsed )
    );
  }

  private refreshUserToken() {
    const userToken = this.localStorageService.getItem(CommonConstant.USER_TOKEN);
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
    this.localStorageService.removeItem(CommonConstant.USER_TOKEN);
    this.token = undefined;
  }

  public setLogged(status: boolean) {
    this.logged$.next(status);
  }

  public getLogged() {
    return this.logged$.asObservable();
  }

}
