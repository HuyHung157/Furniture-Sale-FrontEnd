import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getListProduct();
    this.displayedColumns = [
      'id',
      'product_code',
      'name',
      'price',
      'size',
      'color',
      'status',
    ];
    this.tooltipContent = 'Không thể thay đổi trạng thái ở trang này';
  }

  public addNew(): void {
    console.log(this.route.parent);
    this.router.navigate(['create'], { relativeTo: this.route.parent });
  }

  public changeStatus(e): void {
    console.log(e);
  }

  public gotoProductDetail(row): void {
    console.log(row);
  }

  private getListProduct() {
    this.productService.getListProduct()
      .subscribe((res: any) => {
        this.pureData = res;
      });
  }


}
