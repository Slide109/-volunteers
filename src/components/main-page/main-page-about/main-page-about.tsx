import * as React from 'react';

import styles from './main-page-about.module.css';

import aboutImage from '../../../assets/images/about.jpg';
import aboutSecondaryImage from '../../../assets/images/aboutSecondary.jpg';

const MainPageAbout: React.FC = () => {
    return (
        <section id="about" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.images}>
                    <img className={styles.image} src={aboutImage} alt="" />
                    <img className={styles.imageSecondary} src={aboutSecondaryImage} alt="" />
                </div>
                <div className={styles.content}>
                    <h2>About</h2>
                    <div>
                        We are building a community of people ready to make the difference. Join our service as a user
                        if you need any assistance or as a volunteer if you are willing to help others.
                    </div>
                </div>
            </div>
        </section>
    );
};

export { MainPageAbout };
