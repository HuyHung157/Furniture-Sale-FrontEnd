import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductCreateComponent } from './product-create/product-create.component';



@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, ProductUpdateComponent, ProductCreateComponent],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
