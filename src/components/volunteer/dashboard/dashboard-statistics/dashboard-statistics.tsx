import * as React from 'react';

import styles from './dashboard-statistics.module.css';

import { DashboardStatisticsProps as Props } from './types';
import { Card } from '~/components/common/card';
import { DashboardStatisticsItem } from '../dashboard-statistics-item';

const DashboardStatistics: React.FC<Props> = ({ assigned, finished, people }) => {
    return (
        <Card>
            <div className={styles.container}>
                <DashboardStatisticsItem label="Accepted tasks" value={assigned ? String(assigned) : '-'} />
                <DashboardStatisticsItem label="Completed tasks" value={finished ? String(finished) : '-'} />
                <DashboardStatisticsItem label="People helped" value={people ? String(people) : '-'} />
            </div>
        </Card>
    );
};

export { DashboardStatistics };
