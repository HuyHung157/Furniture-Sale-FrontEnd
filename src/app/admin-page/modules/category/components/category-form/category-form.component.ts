import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
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
