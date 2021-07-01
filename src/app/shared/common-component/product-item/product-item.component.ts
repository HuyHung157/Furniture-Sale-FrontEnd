import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartDataService } from 'src/app/home-page/modules/cart/services/cart-data.service';
import { CartUtil } from 'src/app/home-page/modules/cart/utils/cart.util';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: any;
  public listProductInCart = [];
  public listRate = [];

  products: any[];

  constructor(
    private readonly router: Router,
    private readonly cartDataService: CartDataService,
  ) { }

  ngOnInit(): void {
    this.listRate = Array(4).fill(1);
  }

  public onClickAddToFavorite(product){
    console.log('Favorite', product)
  }

  public onClickProduct(product) {
    console.log('detail')
    // this.router.navigate(['/detail', product.id]);
  }

  public addToCart(event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartDataService.addItemToCart(CartUtil.productToCartItem(this.product, 1))
  }

}
