import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  createForm: FormGroup;
  submitted = false;
  listLanguages;

  constructor(
    private formBuilder: FormBuilder,
    private readonly location: Location
  ) { }

  ngOnInit(): void {
    this.listLanguages = [
      {
        value: 'fr',
        label: 'France'
      },
      {
        value: 'en',
        label: 'EngLish'
      }
    ];
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      language: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  submit(form) {
    this.submitted = true;
    if (form) {
      console.log(form.value);
      const data = { ...form.value };
      console.log(data);
    } else {
      form.markAllAsTouched();
    }
  }
  public cancel(): void {
    this.location.back();
  }
}
