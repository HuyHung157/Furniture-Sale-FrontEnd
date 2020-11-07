import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-product-carousel',
  templateUrl: './list-product-carousel.component.html',
  styleUrls: ['./list-product-carousel.component.scss']
})
export class ListProductCarouselComponent implements OnInit {
  @Input() listTitle: string;
  @Input() listCarousel;

  constructor() { }

  ngOnInit(): void {
  }

}
