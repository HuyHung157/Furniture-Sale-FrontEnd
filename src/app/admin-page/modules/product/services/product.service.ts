import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';
import { InputCreateProduct, InputGetProductList, InputUpdateProduct } from '../interfaces/product.inteface';
import { ProductGqlService } from './product.gql.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(
    private dataService: DataService,
    private productGqlService: ProductGqlService
  ) { }

  public getProducts(input: InputGetProductList): Observable<any> {
    return this.productGqlService.getProducts(input).pipe(
      map((res: any) => res?.data?.getProductList)
    );
  }

  public getProductById(id: string): Observable<any> {
    return this.productGqlService.getProductById(id).pipe(
      map((res: any) => res?.data?.getProductById)
    );
  }

  public createProduct(input: InputCreateProduct): Observable<any>{
    return this.productGqlService.createProduct(input).pipe(
      map((res: any) => res?.data?.createProduct)
    );
  }

  public updateProduct(input: InputUpdateProduct): Observable<any> {
    return this.productGqlService.updateProduct(input).pipe(
      map((res: any) => res?.data?.updateProduct)
    );
  }

  public deleteProduct(id: string): Observable<any> {
    return this.productGqlService.deleteProduct(id)
      .pipe(map((res: any) => res?.data?.deleteProduct));
  }

  // RestAPI
  // public getListProduct(): Observable<any> {
  //   return this.dataService.get('/product')
  //     .pipe(map((data: any) => data));
  // }

  // public getProductById(id): Observable<any> {
  //   return this.dataService.get(`/product/${id}`)
  //     .pipe(map((data: any) => data));
  // }

  // public createItemProduct(input): Observable<any> {
  //   return this.dataService.post('/product', input)
  //     .pipe(map((data: any) => data));
  // }

  // public updateItemProduct(id: string, input): Observable<any> {
  //   return this.dataService.put(`/product/${id}`, input)
  //     .pipe(map((data: any) => data));
  // }

  // public deleteProduct(id: string): Observable<any> {
  //   return this.dataService.delete(`/product/${id}`)
  //     .pipe(map((data: any) => data));
  // }

}
