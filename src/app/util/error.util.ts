export class ErrorUtil {
  public static getGqlErorMessage(error: any): string {
    if (error.networkError) {
      const networkError = error.networkError;
      if (networkError.error?.errors?.length) {
        return networkError.error.errors[0].message;
      }
    }
    if (error.graphQLErrors) {
      const graphQLErrors = error.graphQLErrors;
      if (graphQLErrors.length) {
        const gqlError = error.graphQLErrors[0];
        return gqlError.message?.message || gqlError.message;
      }
    }
    return error?.message || error;
  }
}
