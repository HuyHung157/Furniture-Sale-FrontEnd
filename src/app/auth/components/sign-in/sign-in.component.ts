import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
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

  login(formLogin) {
    if (formLogin.valid) {
      const value = formLogin.form.value;
      localStorage.setItem('user', value);
      this.router.navigate(['admin']);

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
