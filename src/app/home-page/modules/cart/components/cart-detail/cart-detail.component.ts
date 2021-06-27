import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  public cart = [];
  public totalPrice: number;
  public totalQuantity: number;

  constructor(
  ) { }

  removeProduct(product) {
    console.log(product);
  }

  checkout() {
    alert('Sorry! Checkout will be coming soon!');
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
   
  }

  public increment() {
  }

  public decrement() {

  }

  public reset() {

  }
}
