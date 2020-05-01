import * as React from 'react';

import styles from './left-aside.module.css';

import { AppNavigation } from '../navigation';
import { GQLUserRole } from '~/types/gql';

interface Props {
    role: GQLUserRole;
}

const LeftAside: React.FC<Props> = ({ role }) => (
    <aside className={styles.aside}>
        <div className={styles.logo}>Volunteers project 🚀</div>
        <AppNavigation role={role} />
        <div className={`${styles.copyright} text-gray`}>© 2020</div>
    </aside>
);

export { LeftAside };
