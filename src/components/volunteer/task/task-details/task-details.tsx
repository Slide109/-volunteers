import * as React from 'react';

// import styles from './task-summary.module.css'

import { TaskDatailsProps as Props } from './types';
import { Card } from '~/components/common/card';

const TaskDatails: React.FC<Props> = ({ description }) => {
    return (
        <Card>
            <h3>Task description</h3>
            <div>{description}</div>
        </Card>
    );
};

export { TaskDatails };
