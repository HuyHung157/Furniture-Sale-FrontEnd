import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CartUtil } from '../utils/cart.util';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';

export class CartItem {
  id: string;
  name: string;
  pictureUrl: string;
  price: number;
  quantity: number;
  weight: number;
  itemPrice: number;
  itemWeight: number;

  totalPrice: number;
  // totalPriceIncludedTax: number;
  // totalTaxFee: number;
  // limitedDelivery: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CartDataService {

  private readonly LS_CART_KEY = 'checkout';

  private cartItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.getCartFromLS());

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {
  }

  public addItemToCart(item: CartItem, overrideQuantity = false) {
    if (item.quantity <= 0) {
      return;
    }
    let items = this.getCartFromLS();
    const existItem = items.find((x) => x.id === item.id);
    if (existItem) {
      const quantity = overrideQuantity ? item.quantity : existItem.quantity + item.quantity;
      const updatedItem = CartUtil.cloneCartItemWithQuantity(existItem, quantity);
      items = items.map(i => i.id === existItem.id ? updatedItem : i);
    } else {
      items = [...items, item];
    }
    this.setCartItems(items);
  }

  public removeItemFromCart(id: string, quantity: number) {
    if (quantity <= 0) {
      return;
    }
    let items = this.getCartFromLS();
    const existItem = items.find((x) => x.id === id);
    if (existItem) {
      const newQuantity = existItem.quantity - quantity;
      if (newQuantity <= 0) {
        items = items.filter((x) => x.id !== id);
      } else {
        const updatedItem = CartUtil.cloneCartItemWithQuantity(existItem, newQuantity);
        items = items.map(i => i.id === existItem.id ? updatedItem : i);
      }
    }
    this.setCartItems(items);
  }

  public clearItemFromCart(id: string) {
    let items = this.getCartFromLS();
    items = items.filter((x) => x.id !== id);
    this.setCartItems(items);
  }

  public clearItemsFromCart(ids: string[]) {
    let items = this.getCartFromLS();
    items = items.filter((x) => !ids.includes(x.id));
    this.setCartItems(items);
  }

  public getCartItems(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }

  public getCurrentCartItems(): CartItem[] {
    return this.cartItems$.value;
  }

  public getCartTotalItem(): Observable<number> {
    return this.getCartItems().pipe(
      map(items => items.reduce((total, item) => total + item.quantity, 0)),
    );
  }

  public getCartTotalCost(): Observable<number> {
    return this.getCartItems().pipe(
      map(items => items.reduce((total, item) => total, 0)),
    );
  }

  public clearAllCheckoutProduct() {
    this.clearCartFromLs();
    this.cartItems$.next([]);
  }

  private setCartItems(items: CartItem[]) {
    this.saveCartToLs(items);
    this.cartItems$.next(items);
  }

  private getCartFromLS() {
    try {
      const checkoutProducts = this.localStorageService.getItem(this.LS_CART_KEY);
      return JSON.parse(checkoutProducts) || [];
    } catch {
      this.localStorageService.removeItem(this.LS_CART_KEY);
      return [];
    }
  }

  private saveCartToLs(cart: CartItem[]): void {
    this.localStorageService.setItem(this.LS_CART_KEY, JSON.stringify(cart));
  }

  private clearCartFromLs(): void {
    this.localStorageService.removeItem(this.LS_CART_KEY);
  }
}
