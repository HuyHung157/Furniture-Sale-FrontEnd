import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { HomeComponent } from './modules/home/home.component';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductComponent } from './modules/product/product.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomePageComponent,
    ShoppingCartComponent,
    NavbarComponent,
    ProductComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomePageRoutingModule,
  ]
})
export class HomePageModule { }
