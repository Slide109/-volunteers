import * as React from 'react';

import styles from './main-layout.module.css';

import { MainHeader } from './main-header';

const MainLayout: React.FC = ({ children }) => (
    <div className={styles.container}>
        <MainHeader />
        <main>{children}</main>
    </div>
);

export { MainLayout };
