import * as React from 'react';
import Link from 'next/link';

import styles from './main-header.module.css';

const MainHeader: React.FC = () => (
    <header className={styles.header}>
        <div className={styles.logo}>
            <span className={styles.logoText}>Volunteers project</span>
            <span> 🚀</span>
        </div>
        <nav className={styles.navigation}>
            <ul>
                <a href="#about">
                    <li>About</li>
                </a>
                <a href="#how-it-works">
                    <li>How it works</li>
                </a>
            </ul>
        </nav>
        <div className={styles.controls}>
            <Link href="/signup">
                <button className="btn btn-primary btn-sm">Join</button>
            </Link>
            <Link href="/login">
                <button className="btn btn-sm">Log in</button>
            </Link>
        </div>
    </header>
);

export { MainHeader };
