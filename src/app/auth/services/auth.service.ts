import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private toastr: ToastrService;
  constructor(
    public afAuth: AngularFireAuth,
    private readonly router: Router,
    injector: Injector
  ) { 
    this.toastr = injector.get(ToastrService);
  }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.toastr.success('Đăng nhập thành công!');
        this.router.navigate(['admin']);
      }).catch((error) => {
        this.toastr.error(error);
      });
  }

}
