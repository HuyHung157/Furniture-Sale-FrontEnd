import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { ModeForm } from 'src/app/shared/enums/product.enum';
import { CategoryService } from '../../../category/services/category.service';
import { ProductService } from '../../services/product.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  public product: any = {};
  public category: any;
  public createForm: FormGroup;
  public submitted = false;
  public productId: string;
  public mode = ModeForm.MODE_CREATE;

  title = 'cloudsStorage';
  selectedFile: File = null;
  downloadURL: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly storage: AngularFireStorage
  ) {
    this.createForm = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      // product_code: ['', Validators.required],
      price_before: [''],
      price: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      description: [''],
      is_available: [true],
      image_url: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.config();
  }

  private async config() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.mode = ModeForm.MODE_UPDATE;
    }
    await this.categoryService.getListCategory().subscribe(res => {
      this.category = res;
    });

    if (this.mode === ModeForm.MODE_UPDATE) {
      this.getProductById();
    }
  }


  // TODO Upload file After Submit form (success upload file to firebase)
  onFileSelected(event) {
    console.log(event.target.files);
    const file = event.target.files[0];
    console.log(file);
    const filePath = `product/${file.name}`;
    // const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(`product/${file.name}`, file);
    // task
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       this.downloadURL = fileRef.getDownloadURL();
    //       this.downloadURL.subscribe(url => {
    //         if (url) {
    //           console.log(url);
    //         }
    //       });
    //     })
    //   )
    //   .subscribe(url => {
    //     if (url) {
    //       console.log(url);
    //     }
    //   });
  }

  public submit(form): void {
    this.submitted = true;
    if (form.valid) {
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
