import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { empty, Subject, Observable } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
import { BasePaginationComponent } from 'src/app/shared/common-component/base-component/base-pagination.component';
import { ConfirmDialogComponent } from 'src/app/shared/common-component/confirm-dialog/confirm-dialog.component';
import { BasePaginator } from 'src/app/shared/common-component/custom-pagination/interfaces/paginator.interface';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { InputGetProductList } from '../../interfaces/product-form.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BasePaginationComponent<any> {

  public listProduct = [];
  public totalItems;
  public paging: BasePaginator;
  public displayedColumns;
  public tooltipContent: string;

  unsubscribe$ = new Subject<any>();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly productService: ProductService,
  ) {
    super();
  }

  async ngOnInit() {
    this.configPagination();
    await this.getListProduct();
    this.config();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  public addNew(): void {
    this.router.navigate(['create'], { relativeTo: this.route.parent });
  }

  public gotoProductDetail(row): void {
    this.router.navigate([`update/${row.id}`], { relativeTo: this.route.parent });
  }

  public goToDelete($event, product): void {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Xóa sản phẩm',
        message: 'Bạn có chắc chắn muốn xóa',
        itemName: `${product.name}`
      }
    });

    // listen to response
    dialogRef.afterClosed().pipe(
      concatMap(isDeleteItem => {
        const $ = isDeleteItem ? this.productService.deleteProduct(product.id) : empty();
        return $;
      }),
    )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.getListProduct(),
          this.showSuccessSnackBar();
      });

  }

  changePage(event) {
    const isPageSizeChange = event.pageSize === this.paging.pageSize;
    const newPagination = { ...this.paging };
    newPagination.pageIndex = !isPageSizeChange ? 0 : event.pageIndex;
    newPagination.pageSize = event.pageSize;
    this.paging = newPagination;

    this.getListProduct();
  }

  private config(): void {
    this.displayedColumns = [
      'index',
      // 'product_code',
      'name',
      'referencePrice',
      'price',
      'size',
      'color',
      'status',
      'actions',
    ];
  }

  private configPagination() {
    this.paging = {
      pageSize: 10,
      pageIndex: 0,
      pageSizeOptions: [10, 20, 100]
    }
  }

  private showSuccessSnackBar(message?: string): void {
    const msg = message || 'Đã xóa thành công !';
    this.snackBar.open(msg, null, CommonConstant.SUCCESS_SNACKBAR_CONFIG);
  }

  private async getListProduct(): Promise<void> {
    const input: InputGetProductList = {
      paging: {
        pageIndex: this.paging.pageIndex + 1,
        pageSize: this.paging.pageSize
      }
    };
    await this.productService.getProducts(input).subscribe(res => {
      this.listProduct = res.items;
      this.totalItems = res.totalItems;
    });
  }

  protected internalLoadData(): Observable<any> {
    const input: InputGetProductList = {
      paging: {
        pageIndex: this.paging.pageIndex,
        pageSize: this.paging.pageSize
      }
    };
    return this.productService.getProducts(input);
  }

}
