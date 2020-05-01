import * as React from 'react';

import styles from './tasks-list.module.css';

import { TasksListItem } from './tasks-list-item';
import { GQLTask } from '~/types/gql';

interface TasksListProps {
    tasks: GQLTask[];
}

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
    return (
        <div className={styles.wrapper}>
            {tasks.map((task) => (
                <TasksListItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    created={task.created_at || new Date()}
                    status={task.status}
                />
            ))}
        </div>
    );
};

export { TasksList };
