import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
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

  public addToCart(product, event) {
    event.preventDefault();
    console.log('add', product)
  }

}
