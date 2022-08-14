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

const mutationSignInWithProvider = gql`
mutation signInWithProvider($input: SignUpByProviderRequestType!){
  signInWithProvider(input: $input){
    token
    refreshToken
  }
}`;

const queryCheckEmailExisted = gql`
query checkEmailUsed($email: String!) {
  checkEmailUsed(email: $email) {
      isEmailUsed
    }
  }
`;


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


  public signInWithProvider(input) {
    return this.apollo.mutate({
      mutation: mutationSignInWithProvider,
      variables: {
        input,
      }
    })
  }

  public checkEmailExisted(email) {
    return this.apollo.query({
      query: queryCheckEmailExisted,
      variables: {
        email,
      },
      fetchPolicy: 'network-only',
    });
  }

}
