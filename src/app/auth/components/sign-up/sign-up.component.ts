import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormFieldType } from 'src/app/shared/enums/form-field-type.enum';
import { GenderEnum } from 'src/app/shared/enums/gender.enum';
import { FormField } from 'src/app/shared/interfaces/form-field.interface';
import { OptionInterface } from 'src/app/shared/interfaces/gender.interface';
import { DataVNService } from 'src/app/shared/services/data-vn/data-vn.service';
import { confirmPasswordNotMatch } from 'src/infrastructure/validators/confirm-password-not-match.validator';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import moment from 'moment';
import { splitPhoneNumber } from 'src/infrastructure/utils/phone.util';
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

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;

  public iconPassword = 'fa fa-eye';
  public inputTypePassword = 'password';
  public tooltipContent = 'Hiển thị mật khẩu';

  unsubscribe$ = new Subject<any>();

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly dataVNService: DataVNService,
    private readonly toastr: ToastrService,
    private readonly _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initData();
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

  public onNext(formGroup: FormGroup): void {
    if (formGroup.valid) {
      return;
    }
    formGroup.markAllAsTouched();
  }

  public async signUp() {
    if (this.thirdFormGroup.valid) {
      const valueForm = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
      }
      console.log(valueForm)
      const dataInput = await this.formatFormInput(valueForm);
      this.userService.signUp(dataInput)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
          console.log(res);
        })


      // localStorage.setItem('user', value);
      // this.toastr.success('Đăng nhập thành công!');
      // this.router.navigate(['admin']);
    }
    this.thirdFormGroup.markAllAsTouched();
  }

  public onCityChange(ev) {
    const value = ev.value;
    this.getListDistrictByCityCode(value);
    this.wards = null;
  }

  public onDistrictChange(ev) {
    const value = ev.value;
    this.getListWardByDistrictCode(value);
  }

  private initForm() {
    // this.firstFormGroup = this._formBuilder.group({
    //   email: ['', [ Validators.required, Validators.email ]],
    //   password: ['', [ Validators.required, Validators.minLength(8) ]],
    //   confirmPassword: ['', [Validators.required, confirmPasswordNotMatch() ] ],
    // });
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      ward: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
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
    const { phoneNumber, phoneNumberPrefix } = splitPhoneNumber(phone);
    delete value.phone;
    delete value.confirmPassword;
    dataInput = {
      ...value,
      phoneNumberPrefix,
      phoneNumber,
    }
    return dataInput;
  }

  private initData() {
    this.initListGender();
    this.getListCityVN();
  }

  private getListCityVN() {
    this.dataVNService.getListCityVN()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.cities = this.formatOptions(res.items);
      })
  }

  private getListDistrictByCityCode(id: string) {
    this.dataVNService.getListDistrictByCityCode(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.districts = this.formatOptions(res.items);
      })
  }

  private getListWardByDistrictCode(id: string) {
    this.dataVNService.getListWardByDistrictCode(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.wards = this.formatOptions(res.items);
      })
  }

  private formatOptions(items: any[]) {
    const optionsFormat = items.map(o => {
      return {
        ...o,
        value: o.code,
        label: this.formaLabel(o.name),
      }
    });
    return this.sortName(optionsFormat);
  }

  private formaLabel(label) {
    if (Number(label) >= 0) {
      return Number(label);
    }
    return label;
  }

  private sortName(options) {
    return options.sort(function (a, b) {
      if (Number(a.name) >= 0 && Number(b.name) >= 0) {
        return a.name - b.name;
      }
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  private initListGender() {
    const options: OptionInterface[] = [
      {
        label: "Nam",
        value: GenderEnum.MALE,
      },
      {
        label: "Nữ",
        value: GenderEnum.FEMALE,
      },
    ];
    this.genders = options;
  }
}
