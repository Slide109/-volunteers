import * as React from 'react';
import { NextPage } from 'next';

import styles from './dashboard.module.css';

import { TaskRepository } from '~/features/Task/TaskRepository';

import { AppLayout } from '~/components/layout/app-layout';
import { AppContainer } from '~/components/layout/container';
import { DashboardStatistics } from '~/components/volunteer/dashboard/dashboard-statistics';
import { DashboardTasksList } from '~/components/volunteer/dashboard/dasboard-tasks-list';
import { privateRoute } from '~/components/privateRoute';
import { GQLUser } from '~/types/gql';

const repository = new TaskRepository();

const VolunteerDashboardPage: NextPage<{ user: GQLUser }> = ({ user }) => {
    const [assignedTasks, setAssignedTasks] = React.useState([]);
    const [availableTasks, setAvailableTasks] = React.useState([]);

    React.useEffect(() => {
        const getData = async () => {
            try {
                setAvailableTasks(await repository.getAvailableTasks());
                setAssignedTasks(await repository.getAllAssignedTasks());
            } catch (e) {
                console.error(e);
            }
        };
        getData();
    }, []);

    return (
        <AppLayout user={user}>
            <AppContainer className={styles.container}>
                <DashboardStatistics assigned={assignedTasks.length} finished={0} people={0} />
                <DashboardTasksList header="Active tasks" tasks={assignedTasks} />
                <DashboardTasksList header="Available tasks" tasks={availableTasks} />
            </AppContainer>
        </AppLayout>
    );
};

export default privateRoute(VolunteerDashboardPage);
