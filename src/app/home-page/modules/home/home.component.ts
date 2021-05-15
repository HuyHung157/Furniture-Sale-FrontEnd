import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/admin-page/modules/product/models/product.model';
import { ProductService } from 'src/app/admin-page/modules/product/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isBanner = true;
  public slideBanner = [];
  public slideTopSell;
  public slideLivingRoom;
  public slideBedRoom;
  public slideKitchen;
  public titleTopSale = 'bán chạy';
  public titleLivingRoom = 'phòng khách';
  public titleBedRoom = 'phòng ngủ';
  public titleKitchen = 'nhà bếp';

  constructor() { }

  ngOnInit(): void {
    this.getListProductTopSell();

    this.slideBanner = [
      {
        image_src: 'https://chonoithat.vn/assets/library/files/WebBN.jpg',
        image_alt: 'banner-1'
      },
      {
        image_src: 'https://elements-cover-images-0.imgix.net/ee1f5b2b-7597-47f4-9291-157e5c528537?auto=compress%2Cformat&fit=max&w=710&s=0d5bf6fa2550fa362e3179ab673bacc9',
        image_alt: 'banner-2'
      },
    ];
  }

  public getListProductTopSell(): void {
    // this.productService.getListProduct().subscribe(res => {
    //   this.slideTopSell = res;
    //   this.slideLivingRoom = res.slice(3, 100).reverse();
    //   this.slideBedRoom = res.slice(2, 100);
    //   this.slideKitchen = res.slice().reverse();
    // });
  }

}
