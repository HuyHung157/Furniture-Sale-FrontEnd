import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  public createForm: FormGroup;
  public submitted = false;
  public listCategory;
  public product: Product;

  constructor(
    private formBuilder: FormBuilder,
    private readonly location: Location
  ) { }

  ngOnInit(): void {
    this.listCategory = [
      {
        value: '1',
        label: 'Bán chạy'
      },
      {
        value: '2',
        label: 'Phòng ngủ'
      }
    ];
    this.createForm = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      product_code: ['', Validators.required],
      price: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      description: [''],
      is_available: [''],
      srcImg: ['', Validators.required],
    });
  }

  submit(form) {
    this.submitted = true;
    if (form) {
      const data = { ...form.value };
      console.log(data);
    } else {
      form.markAllAsTouched();
    }
  }

  public cancel(): void {
    this.location.back();
  }

  public changeStatus(e): void {
    console.log(e);
  }
}
