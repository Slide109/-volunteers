import { NextPageContext } from 'next';
import React, { Component } from 'react';
import { isAuthenticated, CheckCookies } from './utils';
import { UserRepository } from '~/features/User/UserRepository';

export function privateRoute(WrappedComponent: any) {
    return class extends Component<any> {
        state = {
            user: undefined,
        };

        static async getInitialProps({ req, res, pathname, query }: NextPageContext) {
            const authenticated = req ? isAuthenticated(req) : CheckCookies();

            if (!authenticated) {
                res.writeHead(302, { Location: '/login' });
                res.end();
            }

            const repository = new UserRepository(req);

            const user = await repository.getCurrentUser();

            return { user, query };
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}
