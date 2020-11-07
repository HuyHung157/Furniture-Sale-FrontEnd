import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/admin-page/modules/product/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  public listProductInCart = [];
  public listRate = [];

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('listCart')) {
      this.listProductInCart = this.getLocalStorage();
    }
    this.listRate = Array(4).fill(1);
  }

  public addProductToCart(product): void {
    if (this.listProductInCart.length > 0) {
      const isDuplicate = this.listProductInCart.some(row => row === product);
      if (!isDuplicate) {
        this.listProductInCart.push(product);
        this.setLocalStorage();
      }
    } else {
      this.listProductInCart.push(product);
      this.setLocalStorage();
    }
  }

  private getLocalStorage() {
    const list = JSON.parse(localStorage.getItem('listCart'));
    return list;
  }

  private setLocalStorage() {
    localStorage.setItem('listCart', JSON.stringify(this.listProductInCart));
  }

}
