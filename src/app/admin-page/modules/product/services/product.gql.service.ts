import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { InputCreateProduct, InputUpdateProduct } from '../interfaces/product.inteface';

const queryGetProducts = gql`
  query getProductList($input: ProductListRequestType!) {
    getProductList(input: $input) {
      totalItems
      items{
        id
        name
        index
        type
        size
        color
        discount
        pictureUrl
        price
        referencePrice
        isActive
        categories{
          category{
            id
            name
          }
        }
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
      color
      size
      referencePrice
      pictureUrl
      isActive
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

const mutationCreateProduct = gql`
mutation createProduct($input: ProductCreateRequestType!){
  createProduct(input: $input){
  	message
    statusCode
  }
}`;

const mutationUpdateProduct = gql`
mutation updateProduct($input: ProductUpdateRequestType!){
  updateProduct(input: $input){
  	message
    statusCode
  }
}`;

const mutationDeleteProduct = gql`
mutation deleteProduct($id: String!){
  deleteProduct(id: $id){
  	message
    statusCode
  }
}`;

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

  public createProduct(input: InputCreateProduct){
    return this.apollo.mutate({
      mutation: mutationCreateProduct,
      variables: {
        input,
      }
    });
  }

  public updateProduct(input: InputUpdateProduct){
    return this.apollo.mutate({
      mutation: mutationUpdateProduct,
      variables: {
        input,
      }
    });
  }

  public deleteProduct(id: string){
    return this.apollo.mutate({
      mutation: mutationDeleteProduct,
      variables: {
        id,
      }
    });
  }

  
}
