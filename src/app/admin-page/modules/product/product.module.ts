import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductService } from './services/product.service';
import { DataService } from 'src/app/shared/services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CategoryService } from '../category/services/category.service';
import { ProductGqlService } from './services/product.gql.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    FlexLayoutModule
  ],
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  providers: [
    DataService,
    ProductService,
    ProductGqlService,
    CategoryService
  ]
})
export class ProductModule { }
