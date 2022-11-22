import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, timer } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { FormFieldType } from 'src/app/shared/enums/form-field-type.enum';
import { FormField } from 'src/app/shared/interfaces/form-field.interface';
import { OptionInterface } from 'src/app/shared/interfaces/gender.interface';
import { confirmPasswordNotMatch } from 'src/infrastructure/validators/confirm-password-not-match.validator';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { splitPhoneNumber } from 'src/infrastructure/utils/phone.util';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isLinear = false;
  public filedPhoneNumber: FormField;
  public genders: OptionInterface[];
  public cities: any[];
  public districts: any[];
  public wards: any[];

  public signUpFormGroup: FormGroup;

  public iconPassword = 'fa fa-eye';
  public inputTypePassword = 'password';
  public tooltipContent = 'Hiển thị mật khẩu';

  unsubscribe$ = new Subject<any>();

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly toastr: ToastrService,
    private readonly _formBuilder: FormBuilder,
    private readonly firebaseService: FirebaseService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  public changeType(inputType) {
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

  public setPhoneNumber(value: string, formControl) {
    formControl.setValue(value);
  }

  public async signUp() {
    if (this.signUpFormGroup.invalid){
      this.signUpFormGroup.markAllAsTouched();
      return;
    }
    const valueForm = this.signUpFormGroup.value
    const dataInput = await this.formatFormInput(valueForm);

      const userCredential = await this.firebaseService.createUserWithEmailAndPassword(
        valueForm.email,
        valueForm.password
      ).then(res => {}).catch(err => {
        this.toastr.error(err.message);
      });

      delete valueForm.password;

      this.userService.signUp(dataInput)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (res) => {
          console.log(res);
          (error) => {
            this.toastr.error(error.message);
          }
        })


      // localStorage.setItem('user', value);
      // this.toastr.success('Đăng nhập thành công!');
      // this.router.navigate(['admin']);
  }

  private initForm() {
    // this.signUpFormGroup = this._formBuilder.group({
    //   email: ['', [ Validators.required, Validators.email ]],
    //   password: ['', [ Validators.required, Validators.minLength(8) ]],
    //   confirmPassword: ['', [Validators.required, confirmPasswordNotMatch() ] ],
    // });
    this.signUpFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email], [this.isEmailExist()]],
      phone: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, confirmPasswordNotMatch()]],
    });
    this.filedPhoneNumber = {
      key: 'phone',
      type: FormFieldType.PHONE,
      placeholder: 'Số điện thoại',
      required: true,
    }
  }

  private formatFormInput(value) {
    let dataInput;
    const phone = value.phone;
    const { phoneNumber, phoneNumberPrefix } = splitPhoneNumber(phone.toString());
    delete value.phone;
    delete value.confirmPassword;
    dataInput = {
      ...value,
      phoneNumberPrefix,
      phoneNumber,
    }
    return dataInput;
  }

  private isEmailExist(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      const valueEmail = control.value;
      return timer(500).pipe(
        switchMap(() => this.authService.checkEmailExisted(valueEmail)),
        map(res => {
          return res.isEmailUsed ? {exist: true} : null;
        })
      );
    };
  }

}
