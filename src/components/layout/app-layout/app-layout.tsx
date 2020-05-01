import * as React from 'react';

import styles from './app-layout.module.css';

import { BaseLayout } from '../base-layout';
import { Header } from './header';
import { LeftAside } from './left-aside';
import { GQLUser } from '~/types/gql';

const AppLayout: React.FC<{ user: GQLUser }> = ({ children, user }) => {
    return (
        <BaseLayout className={styles.pageWrapper}>
            <LeftAside role={user.role} />
            <div className={styles.content}>
                <Header user={user} />
                <main>{children}</main>
            </div>
        </BaseLayout>
    );
};

export { AppLayout };
