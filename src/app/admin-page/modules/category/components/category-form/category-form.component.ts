import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { ModeForm } from 'src/app/shared/enums/product.enum';
import { LocalSpinnerService } from 'src/app/shared/services/local-spinner.service';
import { ErrorUtil } from 'src/app/util/error.util';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  public category: any = {};
  createForm: FormGroup;
  submitted = false;
  public categoryId: string;
  public mode = ModeForm.MODE_CREATE;
  public spinnerId = 'product-form-spinner-id';

  unsubscribe$ = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly snackBar: MatSnackBar,
    private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly localSpinnerService: LocalSpinnerService,
  ) { }

  ngOnInit(): void {
    this.config();
  }

  private config(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.mode = ModeForm.MODE_UPDATE;
    }
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: [''],
      index: [0, Validators.required],
      icon: [''],
      // category_code: [''],
      isActive: [true],
      description: ['']
    });

    if (this.mode === ModeForm.MODE_UPDATE) {
      this.getCategoryById();
    }
  }

  public async submit(form) {
    this.submitted = true;
    if (form.valid) {
      try {
        this.localSpinnerService.startLocalSpinner(this.spinnerId);
        const data = { ...form.value };
        const input = this.mode === ModeForm.MODE_CREATE
          ? data
          : await this.formatFormUpdate(data);

        const categoryFormAction$ =
          this.mode === ModeForm.MODE_CREATE
            ? this.categoryService.createCategory(input)
            : this.categoryService.updateCategory(input)

        categoryFormAction$
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (res) => {
              this.showSuccessSnackBar();
              this.location.back();
            },
            (error) => {
              const msg = ErrorUtil.getGqlErorMessage(error);
              this.snackBar.open(msg, null, CommonConstant.FAILURE_SNACKBAR_CONFIG);
            }
          )
      } catch (err) {
        const msg = ErrorUtil.getGqlErorMessage(err);
        this.snackBar.open(msg, null, CommonConstant.FAILURE_SNACKBAR_CONFIG);
      }
      finally {
        this.localSpinnerService.stopLocalSpinner(this.spinnerId);
      }
    } else {
      form.markAllAsTouched();
    }
  }

  public cancel(): void {
    this.location.back();
  }

  private async formatFormUpdate(data) {
    data.id = this.categoryId;
    return data;
  }

  private showSuccessSnackBar(message?: string): void {
    const msg = message || 'Đã tạo thành công !';
    this.snackBar.open(msg, null, CommonConstant.SUCCESS_SNACKBAR_CONFIG);
  }

  private getCategoryById() {
    this.categoryService.getCategoryById(this.categoryId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => { this.category = res; });
  }

}
