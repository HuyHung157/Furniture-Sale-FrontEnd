import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';

@Injectable()
export class ProductService {

  constructor(
    private dataService: DataService,

  ) { }

  public getListProduct(): Observable<any> {
    return this.dataService.get('/productItem')
      .pipe(map((data: any) => data));
  }

  public createItemProduct(): Observable<any> {
    return this.dataService.post('/productItem')
      .pipe(map((data: any) => data));
  }

}
