import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private readonly categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getListProduct();
    this.displayedColumns = [
      'id',
      'name',
      'status',
    ];
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
    // this.categoryService.getListProduct()
    //   .subscribe((res: any) => {
    //     this.pureData = res;
    //   });
  }

}
