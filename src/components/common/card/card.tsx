import * as React from 'react';

import styles from './card.module.css';

import { CardProps as Props } from './types';

const Card: React.FC<Props> = ({ children, padding }) => {
    const card = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        padding && card.current.style.setProperty('--padding', padding);
    }, []);

    return (
        <div ref={card} className={styles.card}>
            {children}
        </div>
    );
};

export { Card };
