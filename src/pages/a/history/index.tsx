import * as React from 'react';
import { NextPage } from 'next';

import { TaskRepository } from '~/features/Task/TaskRepository';

import { AppLayout } from '~/components/layout/app-layout';
import { AppContainer } from '~/components/layout/container';
import { privateRoute } from '~/components/privateRoute';
import { GQLUser, GQLUserRole } from '~/types/gql';
import { HistoryTasks } from '~/components/history/history-tasks';

const repository = new TaskRepository();

const HistoryPage: NextPage<{ user: GQLUser }> = ({ user }) => {
    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        const getData = async () => {
            try {
                const tasks =
                    user.role === GQLUserRole.Volunteer
                        ? await repository.volunteerHistoryTasks(user.id)
                        : await repository.userHistoryTasks(user.id);
                setTasks(tasks);
            } catch (e) {
                console.error(e);
            }
        };
        getData();
    }, []);

    return (
        <AppLayout user={user}>
            <AppContainer>
                <HistoryTasks tasks={tasks} />
            </AppContainer>
        </AppLayout>
    );
};

export default privateRoute(HistoryPage);
