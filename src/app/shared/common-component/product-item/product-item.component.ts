import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/admin-page/modules/product/models/product.model';
import { CartAction } from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  public listProductInCart = [];
  public listRate = [];

  products: Product[];

  constructor(
    private router: Router,
    private cartStore: CartAction
  ) { }

  ngOnInit(): void {
    this.listRate = Array(4).fill(1);
  }


  // Dynamic route for detail info when a product is clicked
  clickedProduct(product) {
    this.router.navigate(['/detail', product.id]);
  }

  // When add to cart button is clicked
  addToCart(product) {
    this.cartStore.addToCart(product, 1);
  }

}
