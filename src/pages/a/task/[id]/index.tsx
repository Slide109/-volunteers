import * as React from 'react';
import { NextPage } from 'next';
import styles from './task.module.css';

import { TaskRepository } from '~/features/Task/TaskRepository';

import { AppLayout } from '~/components/layout/app-layout';
import { AppContainer } from '~/components/layout/container';
import { Heading } from '~/components/common/heading';
import { TaskSummary } from '~/components/volunteer/task/task-summary';
import { TaskUserData } from '~/components/volunteer/task/task-user-data';
import { TaskMap } from '~/components/volunteer/task/task-map';
import { TaskDatails } from '~/components/volunteer/task/task-details';
import { TaskModal } from '~/components/volunteer/task/task-modal';
import { privateRoute } from '~/components/privateRoute';
import { GQLTask, GQLTaskStatus, GQLUser, GQLUserRole } from '~/types/gql';
import { CallRepository } from '~/features/Call/CallRepository';
import { UserControls } from '~/components/volunteer/task/user-controls';
import { VolunteerControls } from '~/components/volunteer/task/volunteer-controls';
import { LngLatLike } from 'mapbox-gl';

const repository = new TaskRepository();
const callRepository = new CallRepository();

const getCoordinates = (input?: string): LngLatLike | undefined => {
    if (!input) return;
    const regexp = /{.*lng.*lat.*}/;
    if (regexp.test(input)) {
        const { lng, lat } = JSON.parse(input);
        if (lng && lat) return { lng, lat };
    }
};

const TaskPage: NextPage<{ user: GQLUser; query }> = ({ user, query }) => {
    const [task, setTask] = React.useState<GQLTask | null>(null);
    const [modal, setModal] = React.useState<boolean>(false);
    const [coordinates, setCoordinates] = React.useState(null);

    React.useEffect(() => {
        const getTask = async () => {
            const taskResponse = await repository.getTaskById(query.id as string);
            setTask(taskResponse);
            setCoordinates(getCoordinates(taskResponse.coordinates));
        };
        query?.id && getTask();
    }, [query]);

    const handleCallToAssignee = async () => {
        try {
            const success = await callRepository.callAssignee({
                userPhone: user.phone,
                userName: user.firstName,
                assigneePhone: task.assignee.phone,
                assigneeName: task.assignee.firstName,
            });
            success && setModal(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <AppLayout user={user}>
            <AppContainer className={styles.container}>
                <Heading title={task?.title || ''} />
                <TaskSummary date={task?.created_at} status={task?.status || GQLTaskStatus.New} />
                <TaskMap coordinates={coordinates} />
                <TaskUserData role={user.role} user={user.role === GQLUserRole.User ? task?.assignee : task?.user} />
                <TaskDatails description={task?.description || 'no description'} />
                {user.role === GQLUserRole.Volunteer && <VolunteerControls status={task?.status} taskID={task?.id} />}
                {user.role === GQLUserRole.User && (
                    <UserControls status={task?.status} taskID={task?.id} openModal={() => setModal(true)} />
                )}
                {modal && <TaskModal closeModal={() => setModal(false)} handleCallToAssignee={handleCallToAssignee} />}
            </AppContainer>
        </AppLayout>
    );
};

export default privateRoute(TaskPage);
