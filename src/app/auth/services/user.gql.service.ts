import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

const mutationSignUp = gql`
mutation signUp($input: SignUpRequestType!){
  signUp(input: $input){
  	message
    statusCode
  }
}`;

const mutationSignIn = gql`
mutation signIn($input: SignInRequestType!){
  signIn(input: $input){
    token
    refreshToken
  }
}`;


@Injectable({
  providedIn: 'root',
})
export class UserGqlService {

  constructor(protected readonly apollo: Apollo) { }

  signUp(input: any) {
    return this.apollo.mutate({
      mutation: mutationSignUp,
      variables: {
        input,
      }
    });
  }

  signIn(input: any) {
    return this.apollo.mutate({
      mutation: mutationSignIn,
      variables: {
        input,
      }
    });
  }

}
