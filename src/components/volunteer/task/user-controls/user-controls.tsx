import * as React from 'react';
import { useRouter } from 'next/router';
import { GQLTaskStatus } from '~/types/gql';
import { TaskRepository } from '~/features/Task/TaskRepository';
import { store } from 'react-notifications-component';

interface UserControlsProps {
    status?: GQLTaskStatus;
    taskID?: string;
    openModal: () => void;
}

const repository = new TaskRepository();

export const UserControls: React.FC<UserControlsProps> = ({ status, taskID, openModal }) => {
    const router = useRouter();

    const handleCancelClick = async () => {
        try {
            await repository.cancelTask(taskID);
            await router.push('/a/personal');
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

    const handleCompleteClick = async () => {
        try {
            await repository.completeTask(taskID);
            await router.push('/a/personal');
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
        <div>
            {status === GQLTaskStatus.New && (
                <button className="btn" onClick={() => handleCancelClick()}>
                    ❌ Cancel task
                </button>
            )}
            {status === GQLTaskStatus.Assigned && (
                <>
                    <button className="btn mr-2" onClick={() => openModal()}>
                        📞 Make a call
                    </button>
                    <button className="btn btn-success" onClick={() => handleCompleteClick}>
                        🎉 Mask as completed
                    </button>
                </>
            )}
        </div>
    );
};
