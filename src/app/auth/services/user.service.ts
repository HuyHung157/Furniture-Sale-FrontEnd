import { Injectable, Injector, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { UserGqlService } from './user.gql.service';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';

@Injectable()
export class UserService implements OnDestroy{
  private token: string;
  private user: any;
  private userProfile: any;
  private toastr: ToastrService;  
  private unsubScribe$ = new Subject<any>();

  constructor(
    injector: Injector,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly firebaseService: FirebaseService,
    private readonly userGqlService: UserGqlService,
  ) { 
    this.toastr = injector.get(ToastrService);
  }

  ngOnDestroy(): void {
      this.unsubScribe$.next();
  }

  async signInByGoogle() {
    try{
      const user =  await this.firebaseService.loginWithGoogle();
      return this.checkIsNewUser(user);
    }catch(error){
      throw error;
    }
  }

  async signInByFacebook() {
    try{
      const user = await this.firebaseService.loginByFacebook();
      return this.checkIsNewUser(user);
    }catch(error){
      throw error;
    }
  }

  checkIsNewUser(user){
    if(!user){
      this.toastr.error("Lỗi đăng nhập thử lại sau");
      return;
    }
    const isNewUser = user?.additionalUserInfo.isNewUser;
    if(!isNewUser){
      // this.localStorageService.setItem('user', JSON.stringify(user));
      console.log('WIP');
    }else{
      const profile = user?.additionalUserInfo?.profile;
      const input = {
        email: profile?.email,
        fullName: profile?.name,
        firebaseUid: user?.user?.uid,
        providerId: user?.additionalUserInfo?.providerId,
        pictureUrl: profile?.picture?.data?.url ? profile?.picture?.data?.url : profile?.picture,
      }
      return this.signInWithProvider(input)
        .pipe(takeUntil(this.unsubScribe$))
        .subscribe((res) => {
          console.log(res);
          this.localStorageService.setItem('user', res?.token);
        });
      }
      this.toastr.success('Đăng nhập thành công!');
      this.router.navigate(['']);
  }

  signInWithProvider(input): Observable<any>{
    return this.userGqlService.signInWithProvider(input).pipe(
      map((res: any) => res?.data)
    )
  }

  signIn(input): Observable<any>{
    return this.userGqlService.signIn(input).pipe(
      map((res: any) => res?.data?.signin)
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
