import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public isBanner = true;
  public slideBanner = [];
  public listCategory = [];

  unsubscribe$ = new Subject<any>();

  constructor(
    private readonly homeService: HomeService
  ) { }

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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  public getListProductTopSell(): void {
    this.homeService.getCategoryShowHome()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          this.listCategory = res.items;
        }
      )
  }

}
