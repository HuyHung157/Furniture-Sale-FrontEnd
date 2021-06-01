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
        pictureUrl
        iconFa
        description
        isActive
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
        pictureUrl
        iconFa
        description
        isActive
      }
    }
  }
`;

const queryGetCategoryById = gql`
  query getCategoryById($id: String!) {
    getCategoryById(id: $id) {
      id
      name
      index
      type
      pictureUrl
      iconFa
      description
      isActive
    }
  }
`;

const mutationCreateCategory = gql`
  mutation createCategory($input: CategoryCreateRequestType!) {
    createCategory(input: $input) {
      message
      statusCode
    }
  }
`;

const mutationUpdateCategory = gql`
  mutation updateCategory($input: CategoryUpdateRequestType!) {
    updateCategory(input: $input) {
      message
      statusCode
    }
  }
`;

const mutationDeleteCategory = gql`
  mutation deleteCategory($id: String!) {
    deleteCategory(id: $id) {
      message
      statusCode
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

  public getCategoriesWithPaging(input: any) {
    return this.apollo.query({
      query: queryGetCategoriesWithPaging,
      variables: {
        input,
      },
      fetchPolicy: 'network-only',
    });
  }

  public getCategoryById(id: string) {
    return this.apollo.query({
      query: queryGetCategoryById,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
  }

  public createCategory(input: any) {
    return this.apollo.mutate({
      mutation: mutationCreateCategory,
      variables: {
        input,
      }
    });
  }

  public updateCategory(input: any) {
    return this.apollo.mutate({
      mutation: mutationUpdateCategory,
      variables: {
        input,
      }
    });
  }

  public deleteCategory(id: string) {
    return this.apollo.mutate({
      mutation: mutationDeleteCategory,
      variables: {
        id,
      }
    });
  }
}
