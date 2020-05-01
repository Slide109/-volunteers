import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { store } from 'react-notifications-component';

import styles from './login.module.css';

import { EmptyLayout } from '~/components/layout/empty-layout';
import { LoginForm } from '~/components/login/login-form';
import { AuthorizationRepository } from '~/features/Authorization';
import { KEYS } from '~/consts/localStorageKeys';
import { GQLUserRole } from '~/types/gql';

const authorization = new AuthorizationRepository();

const Login: React.FC = () => {
    const [phone, setPhone] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const router = useRouter();

    const handleRedirect = async (userRole: GQLUserRole): Promise<void> => {
        let destination = '/';
        switch (userRole) {
            case GQLUserRole.User:
                destination = '/a/personal';
                break;
            case GQLUserRole.Volunteer:
                destination = '/a/dashboard';
                break;
        }
        await router.push(destination);
    };

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            const authData = await authorization.authorize({
                phone,
                password,
            });

            if (authData) {
                Cookies.set(KEYS.authToken, authData.token);
                await handleRedirect(authData.user.role);
            }
        } catch (e) {
            store.addNotification({
                type: 'danger',
                title: 'Error',
                message: e.message,
                container: 'top-right',
                dismiss: {
                    duration: 2000,
                },
            });
        }
    };

    return (
        <EmptyLayout image={require('~/assets/images/login.jpg')}>
            <div className={styles.container}>
                <h1>Log in</h1>
                <LoginForm
                    phone={phone}
                    setPhone={setPhone}
                    password={password}
                    setPassword={setPassword}
                    handleClick={handleClick}
                />
            </div>
        </EmptyLayout>
    );
};

export default Login;
