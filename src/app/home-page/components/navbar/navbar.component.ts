import { Component, OnInit } from '@angular/core';
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
    this.cartStore.getState().subscribe(res => {
      this.cart = res;
      this.getTotalPrice();
    });
  }


}
