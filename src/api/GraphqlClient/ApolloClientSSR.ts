import ApolloClient from 'apollo-boost';
import { NextPageContext } from 'next';
import fetch from 'node-fetch';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const getTokenFromCookies = (cookies) => {
    return cookies.replace(/(?:(?:^|.*;\s*)authToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
};

export class ApolloClientSSR {
    public client: ApolloClient<any>;

    constructor(req: NextPageContext['req']) {
        this.client = new ApolloClient<unknown>({
            uri: publicRuntimeConfig.endpoint,
            credentials: 'include',
            headers: {
                Authorization: getTokenFromCookies(req.headers.cookie),
            },
            fetch,
        });
    }
}
