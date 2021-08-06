import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { FormField } from 'src/app/shared/interfaces/form-field.interface';
import { CountryService, CountryType } from 'src/infrastructure/services/country.service';
import { isValidPhoneNumber } from 'src/infrastructure/utils/phone.util';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent implements OnInit {
  @Input() field: FormField;
  @Input() formInitValues;

  @Output() phoneNumberEmitter: EventEmitter<any> = new EventEmitter();

  public phoneNumberFormGroup: FormGroup;
  public selected: CountryType;
  public countries: CountryType[];

  private initPrefixNumber = CommonConstant.PHONE_CODE_VIETNAMESE;

  constructor(
    private readonly countryService: CountryService,
    private readonly formBuilder: FormBuilder,
    ) {}

  ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  private initData(){
     const listOptions = this.countryService.getCountriesData();
     this.countries = listOptions;
    this.selected = listOptions.find(o => o.dial_code === CommonConstant.PHONE_CODE_VIETNAMESE);
  }

  private initForm(){
    this.phoneNumberFormGroup = this.formBuilder.group({
      phoneNumberPrefix: [ this.selected , Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  public validate(requiered?: boolean) {
    if(!requiered){
      return;
    }
    const controls = this.phoneNumberFormGroup.controls;
    const phoneNumberPrefix = this.formatPhoneNumberPrefix(controls['phoneNumberPrefix'].value);
    const phoneNumber = controls['phoneNumber'].value;
    const completePhone = phoneNumberPrefix + phoneNumber;
    console.log(completePhone);
    let errors = controls.phoneNumber.errors;
    if (!isValidPhoneNumber(completePhone)) {
      if (!errors) {
        errors = {};
        this.phoneNumberEmitter.next(completePhone);
      }
      errors.isValid = "Số điện thoại không hợp lệ";
      controls.phoneNumber.setErrors(errors);
    } else {
      if (errors && errors.isValid) {
        delete errors.isValid;
      }
      this.phoneNumberEmitter.next(completePhone);
      controls.phoneNumber.setErrors(errors);
    }
  }

  private formatPhoneNumberPrefix(value): string{
    if(!typeof(value === 'object')){
      return value;
    }
    return value['dial_code'];
  }
}
