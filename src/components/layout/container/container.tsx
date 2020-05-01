import * as React from 'react';

import styles from './container.module.css';

import { ContainerProps as Props } from './types';

const AppContainer: React.FC<Props> = ({ children, className }) => {
    let cssClass = styles.container;

    if (className) {
        cssClass += ` ${className}`;
    }

    return <div className={cssClass}>{children}</div>;
};

export { AppContainer };
