import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { store } from 'react-notifications-component';

import styles from './create.module.css';

import { TaskRepository } from '~/features/Task/TaskRepository';

import { AppLayout } from '~/components/layout/app-layout';
import { AppContainer } from '~/components/layout/container';
import { privateRoute } from '~/components/privateRoute';
import { CreateForm } from '~/components/user/create/create-form';
import { CreateTaskMap } from '~/components/user/create/create-map';

import { GQLUser } from '~/types/gql';
import { LngLatLike } from 'mapbox-gl';
import { Heading } from '~/components/common/heading';

const repository = new TaskRepository();

const CreateTaskPage: NextPage<{ user: GQLUser }> = ({ user }) => {
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [coordinates, setCoordinates] = React.useState<LngLatLike>(null);

    const router = useRouter();

    const createTask = async (): Promise<void> => {
        if (!title.length) return;

        try {
            const inputCoordinates = coordinates ? JSON.stringify(coordinates) : undefined;
            const success = await repository.createTask({ title, description, coordinates: inputCoordinates });
            if (success) {
                await router.push('/a/personal');
            }
        } catch (e) {
            store.addNotification({
                type: 'danger',
                title: 'Error',
                message: e.message,
                container: 'top-right',
                dismiss: {
                    duration: 2000,
                },
            });
        }
    };

    return (
        <AppLayout user={user}>
            <AppContainer className={styles.container}>
                <Heading title="Crate new task" />
                <CreateForm
                    title={title}
                    description={description}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    createTask={createTask}
                />
                <CreateTaskMap setCoordinates={setCoordinates} />
                <div className={`${styles.tips} text-gray`}>You can pin a point on a map</div>
            </AppContainer>
        </AppLayout>
    );
};

export default privateRoute(CreateTaskPage);
