import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { empty } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/common-component/confirm-dialog/confirm-dialog.component';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  public pureData;
  public displayedColumns;
  public tooltipContent: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getListCategory();
    this.displayedColumns = [
      'id',
      'name',
      'status',
      'actions'
    ];
  }

  public addNew(): void {
    this.router.navigate(['create'], { relativeTo: this.route.parent });
  }

  public gotoCategoryDetail(row): void {
    this.router.navigate([`update/${row.id}`], { relativeTo: this.route.parent });
  }

  private getListCategory() {
    this.categoryService.getListCategory()
      .subscribe((res: any) => {
        this.pureData = res;
      });
  }

  public goToDelete($event, category): void {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Xóa sản phẩm',
        message: 'Bạn có chắc chắn muốn xóa',
        itemName: `${category.name}`
      }
    });

    // listen to response
    dialogRef.afterClosed().pipe(
      concatMap(isDeleteItem => {
        const $ = isDeleteItem ? this.categoryService.deleteCategory(category.id) : empty();
        return $;
      }),
    ).subscribe(() => {
      this.getListCategory(),
        this.showSuccessSnackBar();
    });

  }

  private showSuccessSnackBar(message?: string): void {
    const msg = message || 'Đã xóa thành công !';
    this.snackBar.open(msg, null, CommonConstant.SUCCESS_SNACKBAR_CONFIG);
  }

}
