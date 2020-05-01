import * as React from 'react';
import { useRouter } from 'next/router';

import styles from './heading.module.css';

import { HeadingProps as Props } from './types';

const Heading: React.FC<Props> = ({ title }) => {
    const router = useRouter();

    return (
        <div className={styles.heading}>
            <h1>{title}</h1>
            <button className="btn btn-link" onClick={() => router.back()}>
                &larr; Return to previous
            </button>
        </div>
    );
};

export { Heading };
