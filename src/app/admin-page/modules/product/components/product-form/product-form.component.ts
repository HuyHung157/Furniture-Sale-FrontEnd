import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { ModeForm } from '../../enums/product.enum';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  public product: any = {};
  public createForm: FormGroup;
  public submitted = false;
  public category;
  public productId: string;
  public mode = ModeForm.MODE_CREATE;
  public callback;

  constructor(
    private formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
    this.callback = this.route.snapshot.queryParams?.callback;
    this.config();
  }

  private config(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    // if (!isNaN(Number(this.productId))) {
    if (this.productId) {
      this.mode = ModeForm.MODE_UPDATE;
    }
    this.category = [
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
      // product_code: ['', Validators.required],
      price: ['', Validators.required],
      price_before: [''],
      size: ['', Validators.required],
      color: ['', Validators.required],
      description: [''],
      is_available: [''],
      image_url: ['', Validators.required],
    });

    if (this.mode === ModeForm.MODE_UPDATE) {
      this.getProductById();
    }
  }

  public submit(form): void {
    this.submitted = true;
    if (form) {
      if (this.mode === ModeForm.MODE_CREATE) {
        const data = { ...form.value };
        this.productService.createItemProduct(data).subscribe(res => {
          this.showSuccessSnackBar();
          this.location.back();
        });
      } else {
        const data = { ...form.value };
        this.productService.updateItemProduct(this.productId, data).subscribe(res => {
          this.showSuccessSnackBar();
          this.location.back();
        });
      }
    } else {
      form.markAllAsTouched();
    }
  }

  public cancel(): void {
    this.location.back();
  }

  private showSuccessSnackBar(message?: string): void {
    const msg = message || 'Đã tạo thành công !';
    this.snackBar.open(msg, null, CommonConstant.SUCCESS_SNACKBAR_CONFIG);
  }

  private getProductById() {
    this.productService.getProductById(this.productId).subscribe(res => {
      this.product = res;
    });
  }
}
