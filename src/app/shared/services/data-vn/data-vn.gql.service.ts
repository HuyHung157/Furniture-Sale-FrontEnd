import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

const queryGetListCityVN = gql`
query getListCityVN{
  getListCityVN{
    totalItems
    items{
      code
      name
      slug
      type
      nameWithType
    }
  }
}
`;

const queryGetListDistrictByCityCode = gql`
query getListDistrictByCityCode($cityCode: String!){
  getListDistrictByCityCode(cityCode: $cityCode){
    totalItems
    items{
      code
      name
      slug
      type
      path
      nameWithType
      pathWithType
      parentCode
    }
  }
}
`;

const queryGetListWardByDistrictCode = gql`
query getListWardByDistrictCode($districtCode: String!){
  getListWardByDistrictCode(districtCode: $districtCode){
    totalItems
    items{
      code
      name
      slug
      type
      path
      nameWithType
      pathWithType
      parentCode
    }
  }
}
`;


@Injectable({
  providedIn: 'root',
})
export class DataVNGqlService {

  constructor(protected readonly apollo: Apollo) { }

  public getListCityVN() {
    return this.apollo.query({
      query: queryGetListCityVN,
      fetchPolicy: 'network-only',
    });
  }


  public getListDistrictByCityCode(cityCode: string) {
    return this.apollo.query({
      query: queryGetListDistrictByCityCode,
      variables: {
        cityCode,
      },
      fetchPolicy: 'network-only',
    });
  }

  public getListWardByDistrictCode(districtCode: string) {
    return this.apollo.query({
      query: queryGetListWardByDistrictCode,
      variables: {
        districtCode,
      },
      fetchPolicy: 'network-only',
    });
  }
  
}
