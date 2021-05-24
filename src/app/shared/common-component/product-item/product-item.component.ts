import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  products: Product[];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listRate = Array(4).fill(1);
  }

  clickedProduct(product) {
    this.router.navigate(['/detail', product.id]);
  }

  addToCart(product) {
    console.log('add', product)
  }

}
