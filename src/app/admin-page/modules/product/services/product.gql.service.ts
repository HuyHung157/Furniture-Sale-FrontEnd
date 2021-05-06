import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

const queryGetProducts = gql`
  query getProductList($input: ProductListRequestType!) {
    getProductList(input: $input) {
      totalItems
      items{
        id
        name
        index
        type
        categoryIds
      }
    }
  }
`;
@Injectable()
export class ProductGqlService {

  constructor(protected readonly apollo: Apollo) { }

  getProducts(input) {
    return this.apollo.query({
      query: queryGetProducts,
      variables: {
        input,
      },
      fetchPolicy: 'network-only',
    });
    // .pipe(
    //   map(({ data }: any) => data.getOrders as OrderResponse)
    // );
  }
}
