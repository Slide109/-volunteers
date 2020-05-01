import * as React from 'react';

import styles from './header.module.css';
import { GQLUser } from '~/types/gql';
import Cookies from 'js-cookie';
import { KEYS } from '~/consts/localStorageKeys';
import { useRouter } from 'next/router';

const Header: React.FC<{ user: GQLUser }> = ({ user }) => {
    const router = useRouter();
    const handleLogout = async (e: React.MouseEvent): Promise<void> => {
        e.preventDefault();
        Cookies.remove(KEYS.authToken);
        await router.push('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.userInfo}>
                <div className={styles.avatar}>
                    <img src="http://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" />
                </div>
                <div>{user.firstName}</div>
                <button className="btn btn-link" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export { Header };
