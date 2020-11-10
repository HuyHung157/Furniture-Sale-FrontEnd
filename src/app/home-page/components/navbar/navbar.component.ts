import { Component, OnInit } from '@angular/core';
import { CartAction } from 'src/app/store/actions/cart.actions';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public cart: any = [];

  public totalQuantity: any;

  constructor(
    private cartStore: CartAction
  ) { }

  ngOnInit() {
    this.cartStore.getState().subscribe(res => {
      this.cart = res;
      this.getTotalQuantity();
    });
  }

  getTotalQuantity() {
    const quantity: Array<number> = [];

    let intQuantity: number;

    this.cart.products.forEach((item, i) => {
      intQuantity = parseInt(item.quantity);
      quantity.push(intQuantity);
    });

    this.totalQuantity = quantity.reduce((acc, item) => {
      return acc += item;
    }, 0);

  }

}
