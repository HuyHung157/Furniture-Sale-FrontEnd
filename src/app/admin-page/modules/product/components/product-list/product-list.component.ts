import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { empty, Subject, Observable } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
import { BasePaginationComponent } from 'src/app/shared/common-component/base-component/base-pagination.component';
import { ConfirmDialogComponent } from 'src/app/shared/common-component/confirm-dialog/confirm-dialog.component';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { InputGetProductList } from '../../interfaces/product.inteface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BasePaginationComponent<any> implements OnInit {
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public totalItems;
  public currentPageSize = 1;
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
    await this.getListProduct();
    this.config();
    this.dataSource.paginator = this.paginator;
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

  private showSuccessSnackBar(message?: string): void {
    const msg = message || 'Đã xóa thành công !';
    this.snackBar.open(msg, null, CommonConstant.SUCCESS_SNACKBAR_CONFIG);
  }

  private async getListProduct(): Promise<void> {
    const input: InputGetProductList = {
      paging: {
        pageIndex: 1,
        pageSize: 20
      }
    };
    await this.productService.getProducts(input).subscribe(res => {
      this.dataSource = res.items;
      this.totalItems = res.totalItems;
    });
  }

  protected internalLoadData(): Observable<any> {
    const input: InputGetProductList = {
      paging: {
        pageIndex: 1,
        pageSize: 20
      }
    };
    return this.productService.getProducts(input);
  }

}
