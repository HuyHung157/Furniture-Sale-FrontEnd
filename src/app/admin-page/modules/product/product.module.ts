import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductService } from './services/product.service';
import { DataService } from 'src/app/shared/services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CommonComponentModule } from 'src/app/shared/common-component/common-component.module';
import { ProductFormComponent } from './components/product-form/product-form.component';



@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    CommonComponentModule,
    SharedModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    DataService,
    ProductService,
  ]
})
export class ProductModule { }
