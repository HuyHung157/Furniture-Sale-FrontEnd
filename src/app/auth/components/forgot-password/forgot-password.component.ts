import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public formForgotPassword: FormGroup;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formForgotPassword = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  sendPasswordResetRequest(): void {
    if(this.formForgotPassword.invalid){
      return;
    }
    const email:  string = this.formForgotPassword.controls['email'].value;
    this.firebaseService.requestResetPassword(email).then((res) => {
      console.log(res);
    });
  }
}
