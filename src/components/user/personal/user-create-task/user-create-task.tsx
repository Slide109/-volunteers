import * as React from 'react';

import styles from './user-create-task.module.css';
import Link from 'next/link';

export const UserCreateTask: React.FC = () => (
    <div className={styles.container}>
        <Link href="/a/create" shallow>
            <div className={styles.createBtn}>
                <i className="icon icon-plus" />
                Create new task
            </div>
        </Link>
    </div>
);
