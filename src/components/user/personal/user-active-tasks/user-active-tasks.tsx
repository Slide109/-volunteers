import * as React from 'react';

import { Card } from '~/components/common/card';
import { TasksList } from '~/components/tasks-list';
import { GQLTask } from '~/types/gql';

interface UserActiveTasksProps {
    tasks: GQLTask[];
}

const UserActiveTasks: React.FC<UserActiveTasksProps> = ({ tasks }) => {
    return (
        <Card>
            <h2>Active tasks</h2>
            {tasks.length ? <TasksList tasks={tasks} /> : <div>no tasks available</div>}
        </Card>
    );
};

export { UserActiveTasks };
