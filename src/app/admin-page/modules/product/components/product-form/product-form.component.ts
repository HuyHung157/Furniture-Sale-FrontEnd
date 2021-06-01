import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { ModeForm } from 'src/app/shared/enums/product.enum';
import { CategoryService } from '../../../category/services/category.service';
import { ProductService } from '../../services/product.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, takeUntil } from 'rxjs/operators';
import { FormField } from 'src/app/shared/interfaces/form-field.interface';
import { ImageTemp } from 'src/app/shared/common-component/image-uploader/image-uploader.component';
import { ErrorUtil } from 'src/app/util/error.util';
import { LocalSpinnerService } from 'src/app/shared/services/local-spinner.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { InputCreateProduct } from '../../interfaces/product.inteface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  public product;
  public categories: any;
  public createForm: FormGroup;
  public submitted = false;
  public productId: string;
  public pictures;
  public mode = ModeForm.MODE_CREATE;
  public spinnerId = 'product-form-spinner-id'

  title = 'cloudsStorage';
  selectedFile: File = null;
  downloadURL: Observable<string>;

  public field: FormField;
  public formInitValues;
  public allowEditPicture: boolean;

  unsubscribe$ = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly storage: AngularFireStorage,
    private readonly localSpinnerService: LocalSpinnerService,
    private readonly firebaseService: FirebaseService
  ) {
    this.createForm = this.formBuilder.group({
      categoryIds: ['', Validators.required],
      name: ['', Validators.required],
      index: ['', Validators.required],
      // product_code: ['', Validators.required],
      referencePrice: [''],
      price: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      description: [''],
      isActive: [true],
      pictures: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.config();
    this.iniData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  private iniData(): void {
    this.categoryService.getAllCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.categories = this.formatOptions(res.items);
      })
  }

  private async config() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.mode = ModeForm.MODE_UPDATE;
      this.getProductById();
    }

    const a = {
      key: 'pictures',
      labelOutSide: 'Hình ảnh sản phẩm',
      required: true,
      validators: [Validators.required],
      iconImage: 'assets/icons/bx_bxs-image-add.svg',
      limitImages: 1,
      title: 'upload',
      aspectRatio: {
        ratioWidth: 1,
        ratioHeight: 1,
      },
    } as FormField;
    this.field = a;
    this.allowEditPicture = true;
  }

  private formatFormInput(data) {
    let product = { ...data };
    product.categoryIds = product.categories.map(i => i.category?.id);
    delete product.categories;
    product.pictures = data.pictureUrl;
    return product;
  }

  private formatOptions(options) {
    return options.map(this.formatOptionHelper);
  }

  private formatOptionHelper(option) {
    return {
      value: option?.id,
      label: option?.name,
    };
  }

  public setImagesChange(images: ImageTemp[], formControl) {
    formControl.setValue(images);
  }

  public async submit(form): Promise<void> {
    this.submitted = true;
    if (form.valid) {
      this.localSpinnerService.startLocalSpinner(this.spinnerId);
      const data = { ...form.value };
      try {
        await this.handleUploadImage(data);
        await this.formatInputCreateProduct(data);

        const requestProductForm$ = this.mode === ModeForm.MODE_CREATE
          ? this.productService.createProduct(data)
          : this.productService.updateProduct(data);

        requestProductForm$
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (res) => {
              this.showSuccessSnackBar();
              this.location.back();
            },
            (error) => { }
          );
      } catch (err) {
        const msg = ErrorUtil.getGqlErorMessage(err);
        this.snackBar.open(msg, null, CommonConstant.FAILURE_SNACKBAR_CONFIG);
      } finally {
        this.localSpinnerService.stopLocalSpinner(this.spinnerId);
      }
    } else {
      form.markAllAsTouched();
    }
  }

  public cancel(): void {
    this.location.back();
  }

  private async handleUploadImage(data) {
    if (!this.product) {
      data.pictureUrls = [];
      for (const picture of data.pictures) {
        const urlUploadedImage = await this.firebaseService.uploadFile(
          picture.file,
          `product/${picture.file.name}`
        );
        data.pictureUrls.push(urlUploadedImage);
      }

    }
    data.pictureUrl = this.product ? data.pictures : data.pictureUrls[0];
    delete data.pictures;
    delete data.pictureUrls;
  }

  private formatInputCreateProduct(input): InputCreateProduct {
    // input.categoryIds = input.categoryIds.map(c => c.id);
    input.referencePrice = input.referencePrice ? input.referencePrice : 0;
    if (this.mode !== ModeForm.MODE_CREATE) {
      input.id = this.productId;
    }
    return input;
  }

  private showSuccessSnackBar(message?: string): void {
    const msg = message || 'Đã tạo thành công !';
    this.snackBar.open(msg, null, CommonConstant.SUCCESS_SNACKBAR_CONFIG);
  }

  private getProductById() {
    this.productService.getProductById(this.productId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.product = res;
        this.formInitValues = {}
        this.formInitValues['pictures'] = [
          {
            src: this.product?.pictureUrl,
            id: this.productId,
          }
        ]
        this.createForm.patchValue(this.formatFormInput(res));
      });

  }
}
