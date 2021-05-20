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
import { FormField } from 'src/app/shared/interfaces/form-field.interface';
import { FavieImageTemp } from 'src/app/shared/common-component/image-uploader/image-uploader.component';
import { ErrorUtil } from 'src/app/util/error.util';
import { LocalSpinnerService } from 'src/app/shared/services/local-spinner.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  public product: any;
  public category: any;
  public createForm: FormGroup;
  public submitted = false;
  public productId: string;
  public mode = ModeForm.MODE_CREATE;
  public spinnerId = 'product-form-spinner-id'

  title = 'cloudsStorage';
  selectedFile: File = null;
  downloadURL: Observable<string>;

  public field: FormField;
  public formInitValues;
  public allowEditPicture: boolean;

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
      category: ['', Validators.required],
      name: ['', Validators.required],
      // product_code: ['', Validators.required],
      price_before: [''],
      price: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      description: [''],
      is_available: [true],
      pictures: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.config();
    this.iniData();
  }

  private iniData(): void {
    this.categoryService.getAllCategories().subscribe(res => {
      this.category = res.items;
    })
  }

  private async config() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.mode = ModeForm.MODE_UPDATE;
    }

    if (this.mode === ModeForm.MODE_UPDATE) {
      this.getProductById();
    }
    const a = {
      key: 'pictures',
      labelOutSide: 'Hình ảnh sản phẩm',
      required: true,
      validators: [Validators.required],
      iconImage: 'assets/icons/bx_bxs-image-add.svg',
      limitImages: 2,
      title: 'upload',
      aspectRatio: {
        ratioWidth: 1,
        ratioHeight: 1,
      },
    } as FormField;
    this.field = a;
    this.allowEditPicture = true;
  }


  // TODO Upload file After Submit form (success upload file to firebase)
  // onFileSelected(event) {
  //   console.log(event.target.files);
  //   const file = event.target.files[0];
  //   console.log(file);
  //   const filePath = `product/${file.name}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`product/${file.name}`, file);
  //   task.snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         this.downloadURL.subscribe(url => {
  //           if (url) {
  //             console.log(url);
  //           }
  //         });
  //       })
  //     )
  //     .subscribe(url => {
  //       if (url) {
  //         console.log(url);
  //       }
  //     });
  // }

  public setImagesChange(images: FavieImageTemp[], formControl) {
    formControl.setValue(images);
  }

  public async submit(form): Promise<void> {
    this.submitted = true;
    if (form.valid) {
      if (this.mode === ModeForm.MODE_CREATE) {
        this.localSpinnerService.startLocalSpinner(this.spinnerId);
        const data = { ...form.value };
        await this.handleUploadImage(data);
        try {
          setTimeout(() => {
            this.productService.createItemProduct(data).subscribe(
              (res) => {
                this.showSuccessSnackBar();
                this.location.back();
              },
              (error) => { }
            );
          }, 5000)
        } catch (err) {
          const msg = ErrorUtil.getGqlErorMessage(err);
          this.snackBar.open(msg, null, CommonConstant.FAILURE_SNACKBAR_CONFIG);
        } finally {
          this.localSpinnerService.stopLocalSpinner(this.spinnerId);
        }
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

  private async handleUploadImage(data) {
    data.pictureUrls = [];
    for (const picture of data.pictures) {
      const urlUploadedImage = await this.firebaseService.uploadFile(
        picture.file,
        `product/${picture.file.name}`
      );
      data.pictureUrls.push(urlUploadedImage);
    }
    delete data.pictures;
    data.imageUrls = data.pictureUrls;
    delete data.pictureUrls;
    console.log(data);
  }

  private showSuccessSnackBar(message?: string): void {
    const msg = message || 'Đã tạo thành công !';
    this.snackBar.open(msg, null, CommonConstant.SUCCESS_SNACKBAR_CONFIG);
  }

  private getProductById() {
    this.productService.getProductById(this.productId).subscribe(res => {
      console.log(res)
      this.product = res;
    });
  }
}
