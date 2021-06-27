import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingConstants } from 'src/app/constants/app-routing.constant';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public cart: any = [];

  public totalQuantity: number = 0;

  constructor(
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {

  }

  public goToCartDetail(): void{
    if(this.totalQuantity <= 0){
      return;
    }
    this.router.navigate(AppRoutingConstants.CART_DETAIL)
  }

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




}
