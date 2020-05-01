import * as React from 'react';

import styles from './task-summary.module.css';

import { TaskSummaryProps as Props } from './types';
import { Card } from '~/components/common/card';

const TaskSummary: React.FC<Props> = ({ date, status }) => {
    return (
        <Card>
            <div className={styles.container}>
                <div className={styles.row}>
                    <label>Date</label>
                    <span>{date && new Intl.DateTimeFormat().format(new Date(date))}</span>
                </div>
                <div className={styles.row}>
                    <label>Status</label>
                    <span>{status}</span>
                </div>
            </div>
        </Card>
    );
};

export { TaskSummary };
