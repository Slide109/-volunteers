import * as React from 'react';
import { NextPage } from 'next';

import styles from './completed.module.css';

import { TaskRepository } from '~/features/Task/TaskRepository';

import { AppLayout } from '~/components/layout/app-layout';
import { AppContainer } from '~/components/layout/container';
import { privateRoute } from '~/components/privateRoute';
import { GQLUser } from '~/types/gql';

const repository = new TaskRepository();

const VolunteerCompletedPage: NextPage<{ user: GQLUser }> = ({ user }) => {
    const [completedTasks, setCompletedTasks] = React.useState([]);

    React.useEffect(() => {
        const getData = async () => {
            const data = await repository.getAvailableTasks();
            console.log(data);
        };
        getData();
    }, []);

    return (
        <AppLayout user={user}>
            <AppContainer className={styles.container}>
                completed
                {/*<DashboardStatistics*/}
                {/*    assigned={assignedTasks.length}*/}
                {/*    finished={0}*/}
                {/*    people={0}*/}
                {/*/>*/}
                {/*<DashboardTasksList*/}
                {/*    tasks={availableTasks}*/}
                {/*/>*/}
            </AppContainer>
        </AppLayout>
    );
};

export default privateRoute(VolunteerCompletedPage);
