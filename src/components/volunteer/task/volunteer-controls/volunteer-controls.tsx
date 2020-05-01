import * as React from 'react';
import { useRouter } from 'next/router';
import { GQLTaskStatus } from '~/types/gql';
import { TaskRepository } from '~/features/Task/TaskRepository';

interface VolunteerControlsProps {
    status?: GQLTaskStatus;
    taskID?: string;
}

const repository = new TaskRepository();

export const VolunteerControls: React.FC<VolunteerControlsProps> = ({ status, taskID }) => {
    const router = useRouter();

    const handleAssignClick = async () => {
        await repository.assignTask(taskID);
        await router.push('/a/dashboard');
    };

    return (
        <div>
            {status === GQLTaskStatus.New && (
                <button className="btn btn-success" onClick={() => handleAssignClick()}>
                    🦸‍♀Ready to help
                </button>
            )}
        </div>
    );
};
