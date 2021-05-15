import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { relative } from 'path';
import { empty } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/common-component/confirm-dialog/confirm-dialog.component';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public pureData;
  public displayedColumns;
  public tooltipContent: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getListProduct();
    this.config();
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
    ).subscribe(() => {
      this.getListProduct(),
        this.showSuccessSnackBar();
    });

  }

  private config(): void {
    this.displayedColumns = [
      'id',
      // 'product_code',
      'name',
      'price_before',
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

  private getListProduct(): void {
    const input = {
      paging: {
        pageIndex: 1,
        pageSize: 10
      }
    };
      this.productService.getProducts(input).subscribe(res => {
        console.log(res);
        this.pureData = res.items
      });
  }

}
