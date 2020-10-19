import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-carousel',
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.scss']
})
export class BannerCarouselComponent implements OnInit {
  @Input() slides;
  public slideConfig;
  constructor() { }

  ngOnInit(): void {
    this.slideConfig = this.getSlideConfig();
  }

  private getSlideConfig() {
    return {
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: `<button class="btn-slide next-banner" ><i class="fa fa-chevron-right"></i></button>`,
      prevArrow: `<button class="btn-slide pre-banner" ><i class="fa fa-chevron-left"></i></button>`,
      dots: true,
      infinite: false,
    };
  }

}
