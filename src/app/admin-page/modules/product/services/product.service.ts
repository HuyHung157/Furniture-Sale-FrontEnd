import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';
import { ProductGqlService } from './product.gql.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(
    private dataService: DataService,
    private productGqlService: ProductGqlService
  ) { }

  getProducts(input) {
    return this.productGqlService.getProducts(input);
  }

  public getListProduct(): Observable<any> {
    return this.dataService.get('/product')
      .pipe(map((data: any) => data));
  }

  public getProductById(id): Observable<any> {
    return this.dataService.get(`/product/${id}`)
      .pipe(map((data: any) => data));
  }

  public createItemProduct(input): Observable<any> {
    return this.dataService.post('/product', input)
      .pipe(map((data: any) => data));
  }

  public updateItemProduct(id: string, input): Observable<any> {
    return this.dataService.put(`/product/${id}`, input)
      .pipe(map((data: any) => data));
  }

  public deleteProduct(id: string): Observable<any> {
    return this.dataService.delete(`/product/${id}`)
      .pipe(map((data: any) => data));
  }

}
