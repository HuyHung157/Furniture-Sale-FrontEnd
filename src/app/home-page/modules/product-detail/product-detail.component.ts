import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public productId: string;

  constructor(
    private readonly route: ActivatedRoute,
  ) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

  // addToCart(product: Product) {
  //   this.cartService.add(product, this.quantity.value);

  // }

}
