import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../auth/services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';
  constructor(
    private readonly userService: UserService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.userService.getToken();
    // const refreshToken = this.userService.getRefreshToken();

    let headers = request.headers;
    if (token) {
      const authorizationValue = 'Bearer ' + token;
      headers = headers.set(this.AUTH_HEADER, authorizationValue);
    }
    // if (refreshToken) {
    //   headers = headers.set('x-token', refreshToken);
    // }

    const changedRequest = request.clone({headers});
    return next.handle(changedRequest);
  }
}
