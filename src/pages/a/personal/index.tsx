import * as React from 'react';
import { NextPage } from 'next';

import styles from './personal.module.css';

import { TaskRepository } from '~/features/Task/TaskRepository';

import { AppLayout } from '~/components/layout/app-layout';
import { AppContainer } from '~/components/layout/container';
import { privateRoute } from '~/components/privateRoute';
import { UserCreateTask } from '~/components/user/personal/user-create-task';
import { UserActiveTasks } from '~/components/user/personal/user-active-tasks';

import { GQLUser } from '~/types/gql';

const repository = new TaskRepository();

const PersonalPage: NextPage<{ user: GQLUser }> = ({ user }) => {
    const [activeTasks, setActiveTasks] = React.useState([]);

    React.useEffect(() => {
        const getData = async () => {
            setActiveTasks(await repository.userActiveTasks(user.id));
        };
        getData();
    }, []);

    return (
        <AppLayout user={user}>
            <AppContainer className={styles.container}>
                <UserCreateTask />
                <UserActiveTasks tasks={activeTasks} />
            </AppContainer>
        </AppLayout>
    );
};

export default privateRoute(PersonalPage);
