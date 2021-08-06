import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataVNGqlService } from './data-vn.gql.service';
import { Observable } from 'rxjs';

@Injectable()
export class DataVNService {

  constructor(
    private dataVNGqlService: DataVNGqlService
  ) { }

  public getListCityVN(): Observable<any> {
    return this.dataVNGqlService.getListCityVN().pipe(
      map((res: any) => res?.data?.getListCityVN)
    );
  }

  public getListDistrictByCityCode(cityCode: string): Observable<any> {
    return this.dataVNGqlService.getListDistrictByCityCode(cityCode).pipe(
      map((res: any) => res?.data?.getListDistrictByCityCode)
    );
  }

  public getListWardByDistrictCode(districtCode: string): Observable<any> {
    return this.dataVNGqlService.getListWardByDistrictCode(districtCode).pipe(
      map((res: any) => res?.data?.getListWardByDistrictCode)
    );
  }

}
