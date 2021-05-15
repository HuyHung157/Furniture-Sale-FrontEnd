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
      }
    }
  }
`;

const queryGetProductById = gql`
  query getProductById($id: String!) {
    getProductById(id: $id) {
      id
      name
      type
      index
      description
      price
      referencePrice
      pictureUrl
      categories{
        category{
          id
          name
          type
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ProductGqlService {

  constructor(protected readonly apollo: Apollo) { }

  public getProducts(input) {
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

  public getProductById(id: string){
    return this.apollo.query({
      query: queryGetProductById,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
  }
}
