import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductService } from './services/product.service';
import { DataService } from 'src/app/shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductUpdateComponent,
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ],
  providers: [
    DataService,
    ProductService,
  ]
})
export class ProductModule { }
