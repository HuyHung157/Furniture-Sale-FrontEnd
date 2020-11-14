import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
  ) { }

  removeProduct(product) {
  }

  checkout() {
    alert('Sẽ sớm cập nhật tính năng này');
  }

  ngOnInit() {

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
