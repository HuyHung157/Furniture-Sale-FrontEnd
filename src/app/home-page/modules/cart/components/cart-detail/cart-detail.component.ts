import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/admin-page/modules/product/interfaces/product.interface';
import { CartDataService } from '../../services/cart-data.service';
import { CartUtil } from '../../utils/cart.util';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  public cart: Product[] = [];
  public totalCost: number;
  public totalQuantity: number;

  unSubscribe$ = new Subject<any>();

  constructor(
    private readonly cartDataService: CartDataService
  ) { }

  ngOnInit() {
   this.initSubscription();
  }

  public ngOnDestroy() {
    this.unSubscribe$.next();
  }


  public increment(product): void{
    this.cartDataService.addItemToCart(CartUtil.productToCartItem(product, 1))
  }

  public decrement(product): void{
    this.cartDataService.reduceItemFromCart(product.id, 1);
  }

  public removeProduct(product): void{
    this.cartDataService.clearItemFromCart(product.id);
  }

  public checkout(): void{
    alert('Sorry! Checkout will be coming soon!');
  }


  private initSubscription(){
    this.cartDataService.getCartItems()
    .pipe(
      takeUntil(this.unSubscribe$)
    ).subscribe(cartItems => {
      this.cart = cartItems;
    })

    this.cartDataService.getCartTotalItem()
    .pipe(
      takeUntil(this.unSubscribe$)
    ).subscribe(total => {
      this.totalQuantity = total;
    });

    this.cartDataService.getCartTotalCost()
    .pipe(
      takeUntil(this.unSubscribe$)
    ).subscribe(total => {
      this.totalCost = total;
    })
  }

}
