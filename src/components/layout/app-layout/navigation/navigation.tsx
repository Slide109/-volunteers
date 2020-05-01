import * as React from 'react';
import Link from 'next/link';

import styles from './navigation.module.css';

import { VOLUNTEER_NAVIGATION_ITEMS, USER_NAVIGATION_ITEMS } from '~/consts/navigation';
import { GQLUserRole } from '~/types/gql';

interface Props {
    role: GQLUserRole;
}

const IconComponent: React.FC<any> = ({ icon }) => {
    const Icon = icon;
    return <Icon height="20" width="20" fill="currentColor" />;
};

const AppNavigation: React.FC<Props> = ({ role }) => {
    const navItems =
        role === GQLUserRole.Volunteer
            ? VOLUNTEER_NAVIGATION_ITEMS
            : role === GQLUserRole.User
            ? USER_NAVIGATION_ITEMS
            : [];

    return (
        <nav>
            <ul className={styles.list}>
                {navItems.map((item) => (
                    <li key={item.uri} className={styles.listItem}>
                        <Link href={item.uri} shallow>
                            <a className={styles.itemLink}>
                                {item.icon && <IconComponent icon={item.icon} />}
                                {item.name}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export { AppNavigation };
