import * as React from 'react';

import styles from './empty-layout.module.css';

import { BaseLayout } from '../base-layout';
import { EmptyLayoutProps as Props } from './types';
import { DEFAULT_IMAGE } from './consts';

const EmptyLayout: React.FC<Props> = ({ children, image = DEFAULT_IMAGE }) => (
    <BaseLayout className={styles.layout}>
        <div className={styles.content}>{children}</div>
        <div className={styles.image}>
            <img src={image} alt="" />
        </div>
    </BaseLayout>
);

export { EmptyLayout };
