import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-product-carousel',
  templateUrl: './list-product-carousel.component.html',
  styleUrls: ['./list-product-carousel.component.scss']
})
export class ListProductCarouselComponent implements OnInit {
  @Input() listTitle: string;
  @Input() listProduct;
  public slideConfig;

  constructor() { }

  ngOnInit(): void {
    this.slideConfig = this.getConfigCarousel();
  }

  private getConfigCarousel() {
    return {
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: `<button class="btn-slide next-list" ><i class="fa fa-chevron-right"></i></button>`,
      prevArrow: `<button class="btn-slide pre-list" ><i class="fa fa-chevron-left"></i></button>`,
      dots: false,
      infinite: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };
  }

}
