import * as React from 'react';

import styles from './main-page-how-it-works.module.css';

import FormIllustration from '../../../assets/images/form.svg';
import MessageIllustration from '../../../assets/images/message.svg';
import CallIllustration from '../../../assets/images/call.svg';

const MainPageHowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className={styles.section}>
            <h2>How it works?</h2>
            <div className={`container ${styles.container}`}>
                <div className={styles.item}>
                    <FormIllustration />
                    <div className={styles.content}>
                        <h3>Create a task</h3>
                        <div>
                            Tell as if you need any assistance - place a task and describe shortly what should be done
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.content}>
                        <h3>Get informed</h3>
                        <div>We will sent you a message as soon someone is ready to help.</div>
                    </div>
                    <MessageIllustration />
                </div>
                <div className={styles.item}>
                    <CallIllustration />
                    <div className={styles.content}>
                        <h3>Make a call</h3>
                        <div>
                            You can easily make a phone call with your volunteer using out service. Have a private
                            conversation without revealing your phone number.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { MainPageHowItWorks };
