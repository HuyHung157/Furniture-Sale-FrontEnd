import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

const queryGetCategoryList = gql`
  query getCategoryList {
    getCategoryList {
      totalItems
      items{
        id
        name
        index
        type
        description
      }
    }
  }
`;

const queryGetCategoriesWithPaging = gql`
  query getCategoryListWithPaging($input: BaseSearchInput!) {
    getCategoryListWithPaging(input: $input) {
      totalItems
      items{
        id
        name
        index
        type
        description
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CategoryGqlService {

  constructor(protected readonly apollo: Apollo) { }

  public getAllCategories() {
    return this.apollo.query({
      query: queryGetCategoryList,
      fetchPolicy: 'network-only',
    });
  }

  public getCategoriesWithPaging(input: any){
    return this.apollo.query({
      query: queryGetCategoriesWithPaging,
      variables: {
        input,
      },
      fetchPolicy: 'network-only',
    });
  }
}
