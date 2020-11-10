import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './modules/home/home.component';
import { ProductService } from '../admin-page/modules/product/services/product.service';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart.component';
import { StorageService } from '../shared/services/storage.service';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    HomePageComponent,
    HomeComponent,
    ShoppingCartComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomePageRoutingModule,
  ],
  providers: [
    ProductService,
    StorageService
  ]
})
export class HomePageModule { }
