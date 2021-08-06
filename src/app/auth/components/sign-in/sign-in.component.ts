import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @ViewChild('formLogin') formLoginGroup;
  @ViewChild('inputPass') inputPass;

  public iconPassword = 'fa fa-eye';
  public inputTypePassword = 'password';
  public tooltipContent = 'Hiển thị mật khẩu';

  unsubscribe$ = new Subject<any>();

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  changeType(inputType) {
    if (inputType === 'password') {
      this.iconPassword = 'fa fa-eye-slash';
      this.inputTypePassword = 'text';
      this.tooltipContent = 'Ẩn mật khẩu';
    } else {
      this.iconPassword = 'fa fa-eye';
      this.inputTypePassword = 'password';
      this.tooltipContent = 'Hiển thị mật khẩu';
    }
  }

  async login(formLogin) {
    if (formLogin.valid) {
      const value = formLogin.form.value;
      
      this.userService.signIn(value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
          console.log(res);
          localStorage.setItem('user', res?.token);
        })
      
      // this.toastr.success('Đăng nhập thành công!');
      // this.router.navigate(['admin']);

    } else {
      this.formLoginGroup.form.markAllAsTouched();
    }
  }

  signInByGoogle() {
    this.userService.signInByGoogle();
  }

  signInByFacebook() {
    alert('Sẽ sớm có tính năng này!');
  }
}
