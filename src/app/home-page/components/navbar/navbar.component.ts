import { Component, OnInit } from '@angular/core';
import { CartAction } from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public cart: any = [];

  public totalQuantity: any;

  constructor(

  ) { }

  getTotalPrice() {
    const quantity: Array<number> = [];
    let intQuantity: number;

    this.cart.products.forEach((item, i) => {
      intQuantity = parseInt((item.quantity), 10);
      quantity.push(intQuantity);
    });

    this.totalQuantity = quantity.reduce((acc, item) => {
      return acc += item;
    }, 0);

  }
  ngOnInit() {
  }


}
