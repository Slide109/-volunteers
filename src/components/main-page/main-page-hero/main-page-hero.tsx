import * as React from 'react';
import Link from 'next/link';

import styles from './main-page-hero.module.css';

const MainPageHero: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>We&apos;re better together</h1>
                    <div>Join our community of volunteers and help Make the World a Better Place!</div>
                    <Link href="/signup">
                        <button className="btn btn-primary btn-lg">Join</button>
                    </Link>
                </div>
                <div className={styles.image}>
                    <img
                        src="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                        alt=""
                    />
                </div>
            </div>
        </section>
    );
};

export { MainPageHero };
