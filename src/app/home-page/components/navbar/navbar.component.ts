import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppRoutingConstants } from 'src/app/constants/app-routing.constant';
import { CartDataService } from '../../modules/cart/services/cart-data.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public cart: any = [];

  public totalItem: number = 0;
  public unSubscribe$ = new Subject();

  constructor(
    private readonly router: Router,
    private readonly cartDataService: CartDataService,
  ) { }

  public ngOnInit(): void {
    this.initSubscription();
  }

  public ngOnDestroy() {
    this.unSubscribe$.next();
  }

  public goToCartDetail(): void {
    if (this.totalItem <= 0) {
      return;
    }
    this.router.navigate(AppRoutingConstants.CART_DETAIL)
  }

  private initSubscription() {

    this.cartDataService.getCartTotalItem()
    .pipe(
      takeUntil(this.unSubscribe$)
    ).subscribe(total => {
      this.totalItem = total
    })


  }




}
