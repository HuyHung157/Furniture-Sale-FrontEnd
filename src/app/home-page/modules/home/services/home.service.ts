import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryGqlService } from 'src/app/admin-page/modules/category/services/cateogry.gql.service';

@Injectable()
export class HomeService {

  constructor(
    private readonly categoryGqlService: CategoryGqlService
  ) { }

  public getCategoryShowHome(): Observable<any> {
    return this.categoryGqlService.getListCategoryShowHome().pipe(
      map((res: any) => res?.data?.getListCategoryShowHome)
    );
  }

}
