import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import getConfig from 'next/config';

import { GraphqlClientInterface } from './GraphqlClientInterface';
import { getAuthLink } from './apolloLinks/authorization';
import { getErrorLink } from './apolloLinks/error';

const { publicRuntimeConfig } = getConfig();

const getHttpLink = () => createHttpLink({ uri: publicRuntimeConfig.endpoint, fetch });

const cache = new InMemoryCache();

const apolloLinks = ApolloLink.from([getAuthLink(), getErrorLink(), getHttpLink()]);

class Apollo implements GraphqlClientInterface {
    private static instance: Apollo;

    public client: ApolloClient<any>;

    private constructor() {
        this.client = new ApolloClient({
            ssrMode: !process.browser,
            link: apolloLinks,
            cache,
            defaultOptions: {
                query: {
                    fetchPolicy: 'no-cache',
                },
            },
        });
    }

    public static getInstance(): Apollo {
        if (!Apollo.instance) {
            Apollo.instance = new Apollo();
        }

        return Apollo.instance;
    }
}

export { Apollo };
