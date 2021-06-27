import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';


@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule
  ],
  declarations: [
    CartComponent, 
    CartDetailComponent, CartCheckoutComponent
  ],
})
export class CartModule { }
