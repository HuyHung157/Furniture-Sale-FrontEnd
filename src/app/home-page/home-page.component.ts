import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public listProductInCart = [];

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.listProductInCart = JSON.parse(localStorage.getItem('listCart'));
    console.log(this.listProductInCart);
    this.storageService.watchStorage().subscribe(data => {
      console.log(data);
    });
  }

}
