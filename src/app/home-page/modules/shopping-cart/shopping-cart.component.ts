import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartAction } from 'src/app/store/actions/cart.actions';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {


  public cart = [];
  public totalPrice: number;
  public totalQuantity: number;
  public cartSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private cartStore: CartAction,
  ) { }

  removeProduct(product) {
    this.cartStore.removeFromCart(product)
  }

  checkout() {
    alert('Sorry! Checkout will be coming soon!')
  }

  getTotalPrice() {
    const totalCost: Array<number> = [];
    const quantity: Array<number> = [];
    let intPrice: number;
    let intQuantity: number;
    this.cart.forEach((item, i) => {
      intPrice = parseInt(item.price, 10);
      intQuantity = parseInt(item.quantity, 10);
      totalCost.push(intPrice);
      quantity.push(intQuantity);
    });

    this.totalPrice = totalCost.reduce((acc, item) => {
      return acc += item;
    }, 0);
    this.totalQuantity = quantity.reduce((acc, item) => {
      return acc += item;
    }, 0);
  }

  ngOnInit() {
    this.cartSubscription = this.cartStore.getState().subscribe(res => {
      this.cart = res.products;
      this.getTotalPrice();
    });
  }

  public increment() {

  }

  public decrement() {

  }

  public reset() {

  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
