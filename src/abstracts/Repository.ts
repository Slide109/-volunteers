import { Apollo } from '~/api/GraphqlClient/ApolloClient';
import { ApolloClientSSR } from '~/api/GraphqlClient/ApolloClientSSR';
import { NextPageContext } from 'next';

export abstract class Repository {
    public apollo: Apollo | ApolloClientSSR;

    constructor(public req?: NextPageContext['req']) {
        this.apollo = Boolean(req) ? new ApolloClientSSR(req) : Apollo.getInstance();
    }
}
