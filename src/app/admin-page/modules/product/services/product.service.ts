import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Injectable()
export class ProductService {

  constructor(
    private dataService: DataService,

  ) { }

  public getListProduct(): any {
    // this.http.get('/productList').subscribe(res => console.log(res));
    this.dataService.get('/productList').subscribe(res => {
      console.log(res);
    });
  }

}
