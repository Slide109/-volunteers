import { ApolloClient } from 'apollo-client';

export interface GraphqlClientInterface {
    client: ApolloClient<any>;
}
