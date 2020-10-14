import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  changeType(inputType) {
    if (inputType === 'password') {
      this.iconPassword = 'fa fa-eye-slash';
      this.inputTypePassword = 'text';
    } else {
      this.iconPassword = 'fa fa-eye';
      this.inputTypePassword = 'password';
    }
  }

  login(formLogin) {
    if (formLogin.valid) {
      const value = formLogin.form.value;
      console.log(value);
      const input = {

      };

    } else {
      this.formLoginGroup.form.markAllAsTouched();
    }
  }

}
