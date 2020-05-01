import { NextPageContext } from 'next';
import { KEYS } from '~/consts/localStorageKeys';
import Cookies from 'js-cookie';

export const isAuthenticated = (req: NextPageContext['req']): boolean => {
    const regexp = new RegExp('^' + KEYS.authToken + '=.{3,}$');
    return regexp.test(req.headers.cookie);
};

export const CheckCookies = (): boolean => {
    return Boolean(Cookies.get(KEYS.authToken));
};
