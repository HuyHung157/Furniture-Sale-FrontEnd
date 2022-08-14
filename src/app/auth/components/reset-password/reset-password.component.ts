import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public formResetPassword: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formResetPassword = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  public submitResetPassword(): void {
    const password = this.formResetPassword.controls['password'].value;
    const confirmPassword =
      this.formResetPassword.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      // react to error
      return;
    }
    const code = this.route.snapshot.queryParams['oobCode'];
    this.firebaseService.confirmResetPassword(code, password).then(
      (res) => {
        console.log(res);
      }
    )
  }
}
