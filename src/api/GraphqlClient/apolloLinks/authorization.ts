import { ApolloLink } from 'apollo-link';
import { KEYS } from '~/consts/localStorageKeys';
import Cookies from 'js-cookie';

const getToken = () => {
    return Cookies.get(KEYS.authToken);
};

const getAuthLink = () =>
    new ApolloLink((operation, forward) => {
        const token = getToken();

        operation.setContext({
            headers: {
                Authorization: token,
            },
        });

        return forward(operation);
    });

export { getAuthLink };
