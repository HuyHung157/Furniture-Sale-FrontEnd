import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';
import { InputGetCategoryList } from '../interfaces/category.interface';
import { CategoryGqlService } from './cateogry.gql.service';

@Injectable()
export class CategoryService {

  constructor(
    private dataService: DataService,
    private readonly categoryGqlService: CategoryGqlService
  ) { }

  public getAllCategories(): Observable<any> {
    return this.categoryGqlService.getAllCategories().pipe(
      map((res: any) => res?.data?.getListCategory)
    );
  }

  public getCategoriesWithPaging(input: InputGetCategoryList): Observable<any> {
    return this.categoryGqlService.getCategoriesWithPaging(input).pipe(
      map((res: any) => res?.data?.getListCategoryWithPaging)
    );
  }

  public getCategoryById(id: string): Observable<any> {
    return this.categoryGqlService.getCategoryById(id).pipe(
      map((res: any) => res?.data?.getCategoryById)
    );
  }

  public createCategory(input): Observable<any> {
    return this.categoryGqlService.createCategory(input).pipe(
      map((res: any) => res?.data?.createCategory)
    );
  }

  public updateCategory(input): Observable<any> {
    return this.categoryGqlService.updateCategory(input).pipe(
      map((res: any) => res?.data?.updateCategory)
    );
  }

  public deleteCategory(id: string): Observable<any> {
    return this.categoryGqlService.deleteCategory(id).pipe(
      map((res: any) => res?.data?.deleteCategory)
    );
  }

  //RestAPI
  // public getListCategory(): Observable<any> {
  //   return this.dataService.get('/category')
  //     .pipe(map((data: any) => data));
  // }

  // public getCategoryById(id): Observable<any> {
  //   return this.dataService.get(`/category/${id}`)
  //     .pipe(map((data: any) => data));
  // }

  // public createItemCategory(input): Observable<any> {
  //   return this.dataService.post('/category', input)
  //     .pipe(map((data: any) => data));
  // }

  // public updateItemCategory(id: string, input): Observable<any> {
  //   return this.dataService.put(`/category/${id}`, input)
  //     .pipe(map((data: any) => data));
  // }

  // public deleteCategory(id: string): Observable<any> {
  //   return this.dataService.delete(`/category/${id}`)
  //     .pipe(map((data: any) => data));
  // }

}
