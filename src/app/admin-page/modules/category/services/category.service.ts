import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';

@Injectable()
export class CategoryService {

  constructor(
    private dataService: DataService,
  ) { }

  public getListCategory(): Observable<any> {
    return this.dataService.get('/category')
      .pipe(map((data: any) => data));
  }

  public getCategoryById(id): Observable<any> {
    return this.dataService.get(`/category/${id}`)
      .pipe(map((data: any) => data));
  }

  public createItemCategory(input): Observable<any> {
    return this.dataService.post('/category', input)
      .pipe(map((data: any) => data));
  }

  public updateItemCategory(id: string, input): Observable<any> {
    return this.dataService.put(`/category/${id}`, input)
      .pipe(map((data: any) => data));
  }

  public deleteCategory(id: string): Observable<any> {
    return this.dataService.delete(`/category/${id}`)
      .pipe(map((data: any) => data));
  }

}
