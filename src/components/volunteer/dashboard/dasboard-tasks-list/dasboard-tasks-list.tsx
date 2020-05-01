import * as React from 'react';

import { DashboardTasksListProps as Props } from './types';
import { Card } from '~/components/common/card';
import { TasksList } from '~/components/tasks-list';

const DashboardTasksList: React.FC<Props> = ({ tasks, header }) => {
    return (
        <Card>
            <h2>{header}</h2>
            {tasks.length ? <TasksList tasks={tasks} /> : <div>no tasks available</div>}
        </Card>
    );
};

export { DashboardTasksList };
