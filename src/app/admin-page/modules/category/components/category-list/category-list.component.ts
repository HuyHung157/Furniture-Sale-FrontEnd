import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { empty, Observable, Subject } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
import { BasePaginationComponent } from 'src/app/shared/common-component/base-component/base-pagination.component';
import { ConfirmDialogComponent } from 'src/app/shared/common-component/confirm-dialog/confirm-dialog.component';
import { BasePaginator } from 'src/app/shared/common-component/custom-pagination/interfaces/paginator.interface';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { InputGetCategoryList } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends BasePaginationComponent<any> {

  public listCategory = [];
  public totalItems;
  public paging: BasePaginator;
  public displayedColumns;
  public tooltipContent: string;

  unsubscribe$ = new Subject<any>();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) {
    super();
  }

  async ngOnInit() {
    this.configPagination();
    await this.getListCategory();
    this.configColumn();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  private configColumn() {
    this.displayedColumns = [
      'index',
      'indexHome',
      'id',
      'name',
      'type',
      'status',
      'actions'
    ];
  }

  private configPagination() {
    this.paging = {
      pageSize: 5,
      pageIndex: 0,
      pageSizeOptions: [5, 10, 20, 100]
    }
  }

  public addNew(): void {
    this.router.navigate(['create'], { relativeTo: this.route.parent });
  }

  public gotoCategoryDetail(row): void {
    this.router.navigate([`update/${row.id}`], { relativeTo: this.route.parent });
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

  private getListCategory() {
    const input: InputGetCategoryList = {
      paging: {
        pageIndex: 1,
        pageSize: 20
      }
    };

    this.categoryService.getCategoriesWithPaging(input)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        this.listCategory = res.items;
        this.totalItems = res.totalItems;
      });
  }

  protected internalLoadData(): Observable<any> {
    const input: InputGetCategoryList = {
      paging: {
        pageIndex: this.paging.pageIndex,
        pageSize: this.paging.pageSize
      }
    };
    return this.categoryService.getCategoriesWithPaging(input);
  }

}
