import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { ModeForm } from 'src/app/shared/enums/product.enum';
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
  public callback;

  constructor(
    private formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly snackBar: MatSnackBar,
    private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.callback = this.route.snapshot.queryParams?.callback;
    this.config();
  }

  private config(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.mode = ModeForm.MODE_UPDATE;
    }
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      // category_code: [''],
      is_available: ['', Validators.required],
      description: [false]
    });

    if (this.mode === ModeForm.MODE_UPDATE) {
      this.getCategoryById();
    }
  }

  public submit(form): void {
    this.submitted = true;
    if (form.valid) {
      if (this.mode === ModeForm.MODE_CREATE) {
        const data = { ...form.value };
        this.categoryService.createItemCategory(data).subscribe(res => {
          this.showSuccessSnackBar();
          this.location.back();
        });
      } else {
        const data = { ...form.value };
        this.categoryService.updateItemCategory(this.categoryId, data).subscribe(res => {
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

  private getCategoryById() {
    this.categoryService.getCategoryById(this.categoryId).subscribe(res => {
      this.category = res;
    });
  }

}
