import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public authService: AuthService
  ) { }

  signInByGoogle() {
    return this.authService.GoogleAuth();
  }
}
