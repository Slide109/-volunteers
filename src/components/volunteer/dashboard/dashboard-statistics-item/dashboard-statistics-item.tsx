import * as React from 'react';

import styles from './dashboard-statistics-item.module.css';

import { DashboardStatisticsItemProps as Props } from './types';

const Label: React.FC<{ label: Props['label'] }> = ({ label }) => <label className={styles.label}>{label}</label>;

const Value: React.FC<{ value: Props['value'] }> = ({ value }) => <span>{value}</span>;

const DashboardStatisticsItem: React.FC<Props> = ({ value, label }) => (
    <div className={styles.item}>
        <Value value={value} />
        <Label label={label} />
    </div>
);

export { DashboardStatisticsItem };
