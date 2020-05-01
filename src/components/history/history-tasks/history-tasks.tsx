import * as React from 'react';

import { Card } from '~/components/common/card';
import { TasksList } from '~/components/tasks-list';
import { GQLTask } from '~/types/gql';

interface HistoryTasksProps {
    tasks: GQLTask[];
}

const HistoryTasks: React.FC<HistoryTasksProps> = ({ tasks }) => {
    return (
        <Card>
            <h2>Tasks history</h2>
            {tasks.length ? <TasksList tasks={tasks} /> : <div>no tasks available</div>}
        </Card>
    );
};

export { HistoryTasks };
